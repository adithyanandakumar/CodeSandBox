const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Sandbox = require('./models/Sandbox');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const secretKey = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNjg2MDA3OCwiaWF0IjoxNzA2ODYwMDc4fQ.diIl8LCmKd_anZU1MjHUNOZS_uSgZrOGDT8OfPV4LFc';

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.qiriojy.mongodb.net/')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// usr model
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);


// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    res.status(400).json({ message: 'Username already exists' });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: 'User created successfully' });
  }
});


function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Token is required' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    req.userId = decoded.userId;
    next();
  });
}

app.post('/api/sandbox', async (req, res) => {
  const { userId, code, output } = req.body;
  console.log('Request Payload:', req.body);

  try {
    const newSandbox = new Sandbox({
      userId: userId,
      code: code,
      output: output || ''
    });

    await newSandbox.save();
    // Log success message
    console.log('Sandbox data saved successfully:', newSandbox);
    res.status(201).json({ message: 'Sandbox data saved successfully', sandbox: newSandbox });
  } catch (error) {
   
    console.error('Error saving sandbox data:', error);
    res.status(500).json({ message: 'Failed to save sandbox data', error: error.message });
  }
});


app.get('/api/sandbox/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the sandbox by userId in the database
    const sandboxes = await Sandbox.find({ userId });
    res.json(sandboxes);
  } catch (error) {

    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
