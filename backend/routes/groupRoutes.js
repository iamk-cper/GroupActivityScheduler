const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const auth = require('../middlewares/authMiddleware');
const mongoose = require('mongoose');

router.post('/create', auth, groupController.createGroup);
router.post('/invite', auth, groupController.inviteUser);
router.get('/all', auth, groupController.getAllGroups);
router.get('/invitations', auth, groupController.getInvitations);
router.post('/accept-invitation', auth, groupController.acceptInvitation);
router.post('/reject-invitation', auth, groupController.rejectInvitation);
router.get('/mine', auth, groupController.getMyGroups);

module.exports = router; 