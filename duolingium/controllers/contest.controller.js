const { nanoid } = require('nanoid');
const _ = require('lodash');
const { min } = require('lodash');
const e = require('express');

const controller = (contestRepository, errorRepository) => {

    const createContest = async (req, res) => {
        try {
            console.log(req.body)
            if (!req.body.languageId || !req.body.moduleId || !req.body.timer) {
                console.log(req.body.languageId, req.body.moduleId, req.body.timer)
                console.log("Not enough contest information")
                throw {errno: 4000}
            }
            /* No error handling at first */
            let contestId = nanoid(8);
            console.log(contestId, req.body.languageId, req.body.moduleId, req.body.timer)
            let results = await contestRepository.createContest(contestId, req.body.languageId, req.body.moduleId, req.body.timer);
            res.status(200).json({contestId: contestId})
        } catch (err) {
            console.error(err)
            res.status(400).json(errorRepository(4000));
        }
    }

    const startContest = async (req, res) => {
        try {
            if (!req.body.contestId) {
                throw {errno: 4000}
            }
            await contestRepository.startContest(req.body.contestId);
            req.body.status = "ongoing";
            res.status(200).json(req.body)
        } catch (err) {
            console.error(err)
            res.status(400).json(errorRepository(4000));
        }
    }

    const endContest = async (req, res) => {
        try {
            if (!req.body.contestId) {
                throw {errno: 4000}
            }
            await contestRepository.endContest(req.body.contestId);
            req.body.status = "ended";
            res.status(200).json(req.body)
        } catch (err) {
            console.error(err)
            res.status(400).json(errorRepository(4000));
        }
    }

    const checkContest = async (req, res) => {
        try {
            let results = await contestRepository.checkContest(req.query.contestId);
            if (results.length == 0) {
                res.status(200).json({exists: false});
                return;
            }
            res.status(200).json({exists: true})
        } catch (err) {
            res.status(400).json(errorRepository(4000))
        }
    }

    const joinContest = async (req, res) => {
        try {
            if (!req.body.contestId || !req.body.userId) {
                throw {errno: 4000}
            }            
            await contestRepository.joinContest(req.body.contestId, req.body.userId);
            let results = await contestRepository.getContestants(req.body.contestId);
            let users = [];
            for (let result of results) {
                users.push(result.userId)
            }
            res.status(200).json({users: users, contestId: req.body.contestId});
        } catch (err) {
            console.error(err)
            res.status(400).json(errorRepository(4000));
        }
    }

    const startItem = async(req, res) => {
        try {
            if (!req.body.contestId || !req.body.moduleId || !req.body.itemId) {
                throw {errno: 4000}
            }
            let contestItemId = nanoid(8);
            let date = new Date();
            await contestRepository.startItem(contestItemId, req.body.contestId, req.body.moduleId, req.body.itemId, date);
            res.status(200).json({contestItemId: contestItemId});
        } catch (err) {
            console.error(err)
            res.status(400).json(errorRepository(4000));
        }
    }

    const answerItem = async (req, res) => {
        try {
            console.log("NEW ANSWER ITEM REQUEST", req.body)
            let answeredDate = new Date();
            /* Check item first */
            if (!req.body.english && !req.body.native) throw {errno: 4000};
            else if (req.body.english && req.body.native) throw {errno: 4000};
            let results = await contestRepository.checkItem(req.body.itemId);
            let correct = false;
            if (results[0].english == req.body.english) correct = true;
            else if (results[0].native == req.body.native) correct = true;

            /* Get Score */
            let score = 0;
            let contestItemInfo = await contestRepository.getContestItemInfo(req.body.contestId, req.body.contestItemId);
            let startDate = contestItemInfo[0][0].startedAt;
            let timer = contestItemInfo[1][0].timer;
            if (correct) {
                score += 50;
                let seconds = parseInt ((answeredDate - startDate) / 1000);
                console.log("Seconds is", seconds, timer, parseInt(50/100 * Math.max(parseInt((timer-seconds)*100/timer),0)))
                score += parseInt(50/100 * Math.max(parseInt((timer-seconds)*100/timer),0))
            }
            
            /* Insert information into tables */
            if (score) await contestRepository.updateScore(req.body.contestId, req.body.userId, score);
            await contestRepository.answerItem(req.body.contestItemId, req.body.userId, req.body.moduleId, req.body.itemId, answeredDate, score);
            res.status(200).json({correct: correct})
        } catch (err) {
            console.error(err)
            res.status(400).json(errorRepository(4000));
        }
    }

    const getRankings = async (req, res) => {
        try {
            if (req.query.contestItemId) {
                let results = await contestRepository.getItemRankings(req.query.contestItemId);
                res.status(200).json(results);
            } else {
                let results = await contestRepository.getRankings(req.query.contestId);
                res.status(200).json(results);
            }
        } catch (err) {
            console.error(err);
            res.status(400).json(errorRepository(4000));
        }
    }

    const getItemRankings = async (req, res) => {
        try {
            let results = await contestRepository.getItemRankings(req.query.contestId, req.query.itemId);
            res.status(200).json(results);
        } catch (err) {
            res.status(400).json(errorRepository(4000));
        }
    }

    return {
        createContest: createContest,
        startContest: startContest,
        endContest: endContest,
        checkContest: checkContest,
        joinContest: joinContest,
        startItem: startItem,
        answerItem: answerItem,
        getRankings: getRankings,
        getItemRankings: getItemRankings
    }
}

module.exports = controller;  