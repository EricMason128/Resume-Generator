const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  linkedin: String,
  city: String,
  state: String,
  education: [
    {
      university: String,
      date: String,
      degree: String,
    },
  ],
  experience: [
    {
      role: String,
      company: String,
      date: String,
    },
  ],
});

module.exports = mongoose.model('Profile', profileSchema);
