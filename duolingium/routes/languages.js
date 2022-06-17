var express = require('express');
var router = express.Router();

const languageController = require('../controllers/language.controller')
const languageRepository = require('../controllers/language.repository')
const errorRepository = require('../controllers/error.repository')
const controller = languageController(languageRepository, errorRepository)

router.get('/', controller.getLanguages)
router.get('/:languageId', controller.getModules)
router.get('/:languageId/:moduleId', controller.getItems)

router.put('/')
module.exports = router;
