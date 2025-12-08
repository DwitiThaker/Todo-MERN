import bcrypt from "bcryptjs";

import { User } from "../models/user-models.js";

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to My first full stack application");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });
    const token = await userCreated.generateToken();

    return res.status(200).json({
      message: "Registration Successful",
      token,
      user: userCreated
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Email doesn't exists" });
    }

    const validatePassword = await bcrypt.compare(password, userExist.password);
    const token = await userExist.generateToken();

    const userSafe = {
      _id: userExist._id,
      username: userExist.username,
      email: userExist.email,
      phone: userExist.phone,
    };

    if (!validatePassword) {
      return res.status(400).json({ message: "Wrong password" });
    }
    
    return res.status(200).json({
      showAlert: true,
      message: "Login Successful",
      token,
      user: userSafe,    //! Here...........................................
      });
  } catch (error) {
    next(error);
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { home, register, login };
