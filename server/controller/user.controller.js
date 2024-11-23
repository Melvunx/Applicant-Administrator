const authModel = require("../models/auth.models");

module.exports.getUser = async (req, res) => {
  const user = req.cookies.userData;
  if (!user) return res.status(401).json({ message: "Please login first" });

  try {
    const userModel = await authModel.findById(user.id);
    return res.status(201).json({ message: "User found !", user: userModel });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Fectching error", error });
  }
};
