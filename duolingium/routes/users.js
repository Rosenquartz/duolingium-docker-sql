var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller')
const progressController = require('../controllers/progress.controller')

router.get('/', userController.getUsers)
router.post('/create', userController.createUser)
router.get('/:userId', userController.getProfile)
router.put('/:userId/update', userController.updateUser)
router.get('/:userId/getProgress', progressController.getProgress)
router.put('/:userId/updateProgress', progressController.updateProgress)
module.exports = router;
