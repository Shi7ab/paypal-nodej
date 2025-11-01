 
const express = require('express');
const  NotificatService = require('../services/notificationService');
 

const router = express.Router();
const notificationService = new NotificatService()

// map routes to methods
router.post('/notifcation',notificationService.createNotefcate)
router.get('/notifcation',notificationService.getNotification)


module.exports = router;
