const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Dummy database for storing users
const users = [];

// Function to generate JWT token
const generateToken = (username) => {
  return jwt.sign({ username }, 'secret', { expiresIn: '1h' });
};

// Signup route handler
exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Signin route handler
exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = generateToken(username);
    res.status(200).json({ message: 'Sign in successful', token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
