var express = require('express');
var router = express.Router();
const controller = require('../controllers/user.controller')

router.get('/', controller.getUsers)
router.post('/create', controller.createUser)
router.put('/:userId/update', controller.updateUser)
router.get('/:userId', controller.getProfile)
module.exports = router;
