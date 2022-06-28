var express = require('express');
var router = express.Router();

const languageController = require('../controllers/language.controller')
const languageRepository = require('../repositories/language.repository')
const errorRepository = require('../repositories/error.repository')
const controller = languageController(languageRepository, errorRepository)

router.get('/', controller.getLanguages)
router.get('/:languageId', controller.getModules)
router.get('/:languageId/:moduleId', controller.getItems)
router.post('/:languageId/:moduleId', controller.createItem)

router.put('/')
module.exports = router;