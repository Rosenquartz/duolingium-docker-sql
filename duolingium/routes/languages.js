var express = require('express');
var router = express.Router();

const languageController = require('../controllers/language.controller')
const languageRepository = require('../repositories/language.repository')
const errorRepository = require('../repositories/error.repository')
const controller = languageController(languageRepository, errorRepository)

router.get('/', controller.getLanguageList)
router.get('/list/:languageId', controller.getModuleList)
router.get('/list/:languageId/:moduleId', controller.getItemList)

router.get('/info/:languageId', controller.getLanguageInfo)
router.get('/info/:languageId/:moduleId', controller.getModuleInfo)

router.put('/')
module.exports = router;