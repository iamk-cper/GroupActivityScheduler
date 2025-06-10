const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const auth = require('../middlewares/authMiddleware');

router.post('/create', auth, calendarController.createSlot);
router.post('/set-activity', auth, calendarController.setActivity);
router.post('/available', auth, calendarController.addAvailableUser);
router.post('/join', auth, calendarController.joinSlot);
router.post('/leave', auth, calendarController.leaveSlot);
router.get('/group/:groupId', auth, calendarController.getSlotsByGroup);

module.exports = router; 