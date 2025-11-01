const jwt = require('jsonwebtoken');
const User = require('../models/User'); // import user class


class AuthService {
  constructor() {
    this.users = new Map(); // 🧠 use Map for fast lookups
  }

  createUser = (req, res) => {
    try {
      const { username, email, password } = req.body;

      // check if user exists
      for (let user of this.users.values()) {
        if (user.email === email) {
          return res.status(400).json({ message: "User already exists" });
        }
      }

      const id = Date.now().toString();
      const user = new User({ id, username, email, password });

      // save user in memory
      this.users.set(id, user);

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.status(201).json({
        message: "User created successfully",
        user,
        token
      });
    } catch (err) {
      return res.status(500).json({ message: "Failed to create user", error: err.message });
    }
  };

  verify = (req, res) => {
    try {
      const { id } = req.body;
      const user = this.users.get(id);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '10d' }
      );

      jwt.verify(token, process.env.JWT_SECRET);

      return res.status(200).json({
        message: "Login successful",
        token
      });
    } catch (err) {
      return res.status(500).json({ message: "Verification failed", error: err.message });
    }
  };
}

module.exports = AuthService;
