const authModel = require("../models/auth.models");

const capitalize = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

module.exports.getUser = async (req, res) => {
  const user = req.cookies.userData;
  if (!user) return res.status(401).json({ message: "Please login first" });

  try {
    const userModel = await authModel.findById(user._id);
    const { username, email, firstname, lastname, birthdate } = userModel;
    console.log(`${capitalize(username)}'s profiled showed`);

    return res.status(201).json({
      message: "User found !",
      user: { username, email, firstname, lastname, birthdate },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Fectching error", error });
  }
};
