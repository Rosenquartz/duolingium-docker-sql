var express = require('express');
var router = express.Router();
const controller = require('../controllers/language.controller')

router.get('/', controller.getLanguages)
router.get('/:languageId', controller.getModules)
router.get('/:languageId/:moduleId', controller.getItems)
module.exports = router;
