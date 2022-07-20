var express = require('express');
var router = express.Router();

const contestController = require('../controllers/contest.controller');
const contestRepository = require('../repositories/contest.repository');
const errorRepository = require('../repositories/error.repository');
const controller = contestController(contestRepository, errorRepository);

router.post('/create', controller.createContest);
router.put('/start', controller.startContest);
router.put('/end', controller.endContest);
router.post('/join', controller.joinContest);
router.post('/startItem', controller.startItem);
router.post('/answerItem', controller.answerItem);
router.get('/rankings', controller.getRankings)

module.exports = router;