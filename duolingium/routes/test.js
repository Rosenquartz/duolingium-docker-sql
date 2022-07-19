var express = require('express');
var router = express.Router();

const testController = require('../controllers/test.controller');
const testRepository = require('../repositories/test.repository');
const errorRepository = require('../repositories/error.repository');
const controller = testController(testRepository, errorRepository);

router.post('/', controller.createTestResults);
router.get('/all', controller.getAllTestResults);
router.get('/filter', controller.filterTestResults);
router.get('/history', controller.loadFilters);

module.exports = router;