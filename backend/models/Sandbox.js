const mongoose = require('mongoose');

const SandboxSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Sandbox', SandboxSchema);
