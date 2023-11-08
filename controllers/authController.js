const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
const Settings = require("../models/Settings");

const generateTemporaryPassword = () => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let temporaryPassword = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    temporaryPassword += characters[randomIndex];
  }

  return temporaryPassword;
};

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const isUser = await User.findOne({
        $or: [{ phone: username }, { username }, { email: username }],
      });

      if (!isUser)
        return res.status(400).json({
          errors: [
            {
              path: "username",
              msg: "Tên đăng nhập hoặc mật khẩu không đúng",
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
              msg: "Tên đăng nhập hoặc mật khẩu không đúng",
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
  google: async (req, res) => {
    const user = req.body;
    try {
      const existingUser = await User.findOne({ googleId: user.googleId });

      if (existingUser) {
        const token = createToken(existingUser._id);
        return res.status(200).json({ user: existingUser, token });
      }

      const userWithSameEmail = await User.findOne({ email: user.email });
      if (userWithSameEmail) {
        return res.status(400).json({
          type: "email_existed",
          message:
            "Tài khoản Google đã được liên kết với một tài khoản khác. Vui lòng đăng nhập bằng mật khẩu.",
        });
      }

      const userWithSameUsername = await User.findOne({
        username: user.username,
      });
      if (userWithSameUsername) {
        return res.status(400).json({
          type: "username_existed",
          message:
            "Tên đăng nhập này đã được sử dụng. Vui lòng đăng nhập bằng mật khẩu.",
        });
      }

      user.password = CryptoJS.AES.encrypt(
        user.password,
        process.env.PASSWORD_SECRET_KEY
      ).toString();

      const newUser = await User.create(user);
      const token = createToken(newUser._id);
      return res.status(200).json({ user: newUser, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },

  facebook: async (req, res) => {
    const user = req.body;
    try {
      const existingUser = await User.findOne({ facebookId: user.facebookId });

      if (existingUser) {
        const token = createToken(existingUser._id);
        return res.status(200).json({ user: existingUser, token });
      }

      const userWithSameEmail = await User.findOne({ email: user.email });
      if (userWithSameEmail) {
        return res.status(400).json({
          type: "email_existed",
          message:
            "Tài khoản Facebook đã được liên kết với một tài khoản khác. Vui lòng đăng nhập bằng mật khẩu.",
        });
      }

      const userWithSameUsername = await User.findOne({
        username: user.username,
      });
      if (userWithSameUsername) {
        return res.status(400).json({
          type: "username_existed",
          message:
            "Tên đăng nhập này đã được sử dụng. Vui lòng đăng nhập bằng mật khẩu.",
        });
      }

      user.password = CryptoJS.AES.encrypt(
        user.password,
        process.env.PASSWORD_SECRET_KEY
      ).toString();

      const newUser = await User.create(user);
      const token = createToken(newUser._id);
      return res.status(200).json({ user: newUser, token });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  sms: async (req, res) => {
    const phone = req.body.phone;
    try {
      const user = await User.findOne({ phone });
      if (!user)
        return res
          .status(404)
          .json({ message: "Số điện thoại chưa được dùng để đăng kí" });
      const token = createToken(user._id);
      return res.status(200).json({ token, user });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  resetPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(404)
          .json({ message: "Email không đúng hoặc chưa được sử dụng" });

      const emailPort = await Settings.findOne().select("emailSendPort");

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailPort.emailSendPort.email,
          pass: CryptoJS.AES.decrypt(
            emailPort.emailSendPort.password,
            process.env.PASSWORD_SECRET_KEY
          ).toString(CryptoJS.enc.Utf8),
        },
      });

      const newPassword = generateTemporaryPassword();

      const mailOptions = {
        from: emailPort.emailSendPort.email,
        to: email,
        subject: "Password Reset",
        text: `Mật khẩu mới của bạn là: ${newPassword}. Hãy đổi lại mật khẩu này sau khi đăng nhập.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send("Internal Server Error");
        }
      });
      user.password = CryptoJS.AES.encrypt(
        newPassword,
        process.env.PASSWORD_SECRET_KEY
      ).toString();

      await user.save();
      return res.status(200).send("Email sent successfully");
    } catch (error) {}
  },
};
