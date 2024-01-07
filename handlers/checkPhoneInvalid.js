const Role = require("../models/Role");

const checkPhone = async (user) => {
  if (user.phone.includes("social")) {
    return { ...user, phone: "" };
  }

  const userPermission = await Role.findById(user.permissions);
  return { ...user, permissions: userPermission };
};

module.exports = checkPhone;
