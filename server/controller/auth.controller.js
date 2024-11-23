const authModel = require("../models/auth.models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { SALTROUND_NUMBER } = process.env;
const saltRound = Number(SALTROUND_NUMBER);

module.exports.userRegister = async (req, res) => {
  const { username, password, email, firstname, lastname, birthdate } =
    req.body;

  if (!username || !password || !email || !firstname || !lastname || !birthdate)
    return res.status(400).json({ message: "Please fill in all fields" });

  if (password.length < 6)
    return res.status(400).send({ message: "Password need 6 characters !" });

  const isExistingUsername = await authModel.findOne({ username });
  const isExistingEmail = await authModel.findOne({ email });

  if (isExistingUsername || isExistingEmail)
    return res
      .status(400)
      .send({ message: "This username or Email already exist !" });

  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await authModel({
      username,
      password: hashedPassword,
      email,
      firstname,
      lastname,
      birthdate,
      
    });

    const savedUser = await newUser.save();
    console.log({ message: "User created", user: savedUser });
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Caught error", error });
  }
};
