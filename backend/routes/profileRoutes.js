const express = require('express');
const router = express.Router();
const {
  getAllProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} = require('../controllers/profileController');

router.get('/', getAllProfiles);
router.get('/:id', getProfile);
router.post('/', createProfile);
router.post('/:id', updateProfile);
router.delete('/:id', deleteProfile);

module.exports = router;
