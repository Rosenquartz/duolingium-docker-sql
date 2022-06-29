var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')
const userRepository = require('../repositories/user.repository')
const errorRepository = require('../repositories/error.repository')
const controller = userController(userRepository, errorRepository)


router.get('/', controller.getUsers)
router.post('/create', controller.createUser)
router.post('/login', controller.checkLogin)
router.get('/:userId', controller.getProfile)
router.put('/:userId/update', controller.updateUser)

router.get('/:userId/preferred', controller.getPreferredLanguage);
router.put('/:userId/preferred', controller.setPreferredLanguage);
/*
router.get('/:userId/progress', controller.getProgress)
router.patch('/:userId/progress', controller.updateProgress)
router.get('/:userId/items', controller.getItemsForUser)
*/
module.exports = router;
