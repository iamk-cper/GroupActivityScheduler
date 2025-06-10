const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const auth = require('../middlewares/authMiddleware');

router.post('/create', auth, activityController.createActivity);
router.post('/like', auth, activityController.likeActivity);
router.post('/dislike', auth, activityController.dislikeActivity);
router.get('/group/:groupId', auth, activityController.getActivitiesByGroup);
router.delete('/:activityId', auth, activityController.deleteActivity);

module.exports = router; 