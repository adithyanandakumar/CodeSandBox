const express = require('express');
const router = express.Router();
const Sandbox = require('../models/Sandbox');

// Save sandbox
router.post('/', async (req, res) => {
  const { userId, code, output } = req.body;
  try {
    const sandbox = new Sandbox({ userId, code, output });
    await sandbox.save();
    res.status(201).json(sandbox);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retrieve user's saved sandboxes
router.get('/api/sandbox/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const sandboxes = await Sandbox.find({ userId });
    res.json(sandboxes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
