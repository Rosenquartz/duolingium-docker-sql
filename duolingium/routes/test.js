var express = require('express');
var router = express.Router();

const testController = require('../controllers/test.controller');
const testRepository = require('../repositories/test.repository');
const errorRepository = require('../repositories/error.repository');
const controller = testController(testRepository, errorRepository);

router.get('/all', controller.getAllTestResults);
router.get('/filter', controller.filterTestResults);2
router.post('/', controller.createTestResults);
/* DEPRECATED */
// router.get('/all/:moduleId', controller.getAllTestResultsByModule);
// router.get('/:userId', controller.getUserTestResults);
// router.get('/', controller.getTestResults);

//router.put('/')
module.exports = router;