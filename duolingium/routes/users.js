var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')
const userRepository = require('../controllers/user.repository')
const errorRepository = require('../controllers/error.repository')
const controller = userController(userRepository, errorRepository)


router.get('/', controller.getUsers)
router.post('/create', controller.createUser)
router.get('/:userId', controller.getProfile)
router.put('/:userId/update', controller.updateUser)
router.get('/:userId/progress', controller.getProgress)
router.patch('/:userId/progress', controller.updateProgress)

module.exports = router;
