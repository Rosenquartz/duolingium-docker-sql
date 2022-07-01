var express = require('express');
var router = express.Router();

const progressController = require('../controllers/progress.controller')
const progressRepository = require('../repositories/progress.repository')
const errorRepository = require('../repositories/error.repository')
const controller = progressController(progressRepository, errorRepository)

//router.get('/', controller.getLanguages)
router.get('/:userId/:lang', controller.getProgressModules);
router.get('/:userId/:lang/:moduleId', controller.getProgressModule);
router.put('/:userId', controller.updateProgressItem);

//router.put('/')
module.exports = router;