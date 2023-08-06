const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

module.exports = {
  login: async (req, res) => {
    const { phone, username, password } = req.body;
    try {
      const isUser = await User.findOne({
        $or: [{ phone }, { username }],
      });

      if (!isUser)
        return res.status(400).json({
          errors: [
            phone
              ? {
                  path: "phone",
                  msg: "Số điện thoại không đúng",
                }
              : {
                  path: "username",
                  msg: "Tài khoản không đúng",
                },
          ],
        });

      const desPass = CryptoJS.AES.decrypt(
        isUser.password,
        process.env.PASSWORD_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);

      if (desPass !== password)
        return res.status(400).json({
          errors: [
            {
              path: "password",
              msg: "Mật khẩu không hợp lệ",
            },
          ],
        });
      return res.status(200).json({
        token: createToken(isUser._id),
        user: await User.findById(isUser._id).select("-password").exec(),
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  register: async (req, res) => {
    const { password } = req.body;
    try {
      req.body.password = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
      ).toString();
      const user = await User.create(req.body);
      const token = createToken(user._id);
      return res.status(201).json({ token, user });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
