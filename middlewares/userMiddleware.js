const { tokenDecode } = require("../handlers/tokenHandler");
const User = require("../models/User");

const userMiddleware = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    const user = await User.findById(tokenDecoded.id)
      .select("-password")
      .populate("permissions");
    if (!user) return res.status(401).json("Unathorization");
    req.user = user;
    next();
  } else {
    return res.status(401).json("Unathorization");
  }
};

module.exports = userMiddleware;
