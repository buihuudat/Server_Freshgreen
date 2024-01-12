const { tokenDecode } = require("../handlers/tokenHandler");
const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  const permissions = ["staff", "producer", "admin", "superadmin"];
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    const user = await User.findById(tokenDecoded.id)
      .populate("permissions")
      .select("-password");
    if (!user || !permissions.includes(user.permissions.name))
      return res.status(401).json("Unathorization");
    req.user = user;
    next();
  } else {
    return res.status(401).json("Unathorization");
  }
};

module.exports = adminMiddleware;
