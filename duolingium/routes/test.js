var express = require('express');
var router = express.Router();

const testController = require('../controllers/test.controller')
const testRepository = require('../repositories/test.repository')
const errorRepository = require('../repositories/error.repository')
const controller = testController(testRepository, errorRepository)

//router.get('/', controller.getLanguages)
router.get('/:moduleId', controller.getTestResults);
router.post('/', controller.createTestResults);

//router.put('/')
module.exports = router;