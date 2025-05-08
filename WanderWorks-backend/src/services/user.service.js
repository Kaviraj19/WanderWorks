import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepo from "../repositories/user.repository.js";

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

class UserService {
  async register({ username, email, password, role }) {
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepo.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async login({ email, password }) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }
}

export default new UserService();
