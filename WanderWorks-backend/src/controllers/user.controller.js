import userService from "../services/user.service.js";

const registerUser = async (req, res) => {
  try {
    const newUser = await userService.register(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export default {
  registerUser,
  loginUser,
};
