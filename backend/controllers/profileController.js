const Profile = require('../models/Profile');

// Get all
exports.getAllProfiles = async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
};

// Get one
exports.getProfile = async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (!profile) return res.status(404).send('Profile not found');
  res.json(profile);
};

// Create
exports.createProfile = async (req, res) => {
  const profile = new Profile(req.body);
  await profile.save();
  res.status(201).json(profile);
};

// Update
exports.updateProfile = async (req, res) => {
  const updated = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).send('Profile not found');
  res.json(updated);
};

// Delete
exports.deleteProfile = async (req, res) => {
  const deleted = await Profile.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).send('Profile not found');
  res.json(deleted);
};
