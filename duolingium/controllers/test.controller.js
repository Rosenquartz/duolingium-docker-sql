const { nanoid } = require('nanoid');
const { getTestResults } = require('../repositories/test.repository');

const controller = (testRepository, errorRepository) => {

    const createTestResults = async (req, res) => {
        try {
            const testId = nanoid(8);
            let results = await testRepository.createTestResults(
                testId,
                req.body.languageId,
                req.body.englishName,
                req.body.moduleId,
                req.body.displayName,
                req.body.userId,
                req.body.total,
                req.body.correct,
                req.body.time,
                req.body.date
            );
            res.status(200).json(results)
        } catch (err) {
            res.status(400).json(errorRepository(4000));
        }
    }

    /* NEW FUNCTIONS */

    const loadTest = async(req, res) => {
        try {
            let results;
            if (req.query.previousKey) {
                let previousKey = JSON.parse(req.query.previousKey);
                let date = previousKey.date;
                date = date.slice(0, 19).replace('T', ' ');
                let testId = previousKey.testId;
                let offset = req.query.pageDelta * req.query.pageItems;
                results = await testRepository.loadTestPrev(req.query.pageItems, offset, date, testId);
            } else if (req.query.nextKey) {
                let nextKey = JSON.parse(req.query.nextKey);
                let date =  nextKey.date;
                date = date.slice(0, 19).replace('T', ' ');
                let testId = nextKey.testId;
                let offset = req.query.pageDelta * req.query.pageItems;
                results = await testRepository.loadTestNext(req.query.pageItems, offset, date, testId);
            } else {
                results = await testRepository.loadTest(req.query.pageItems);
            }
            let previousKey = JSON.stringify({
                date: results[0][0]['date'],
                testId: results[0][0]['testId']
            })
            let nextKey = JSON.stringify({
                date: results[0][results[0].length-1]['date'],
                testId: results[0][results[0].length-1]['testId']
            })
            res.status(200).json({
                tests: results[0], 
                total: results[1][0]['COUNT(*)'],
                previousKey: previousKey,
                nextKey: nextKey
            });
        } catch (err) {
            res.status(400).json(err)
        }
    }

    const loadFilters = async (req, res) => {
        try {
            let results;
            if (req.query.previousKey) {
                let previousKey = JSON.parse(req.query.previousKey);
                let date = previousKey.date;
                date = date.slice(0, 19).replace('T', ' ');
                let testId = previousKey.testId;
                let offset = req.query.pageDelta * req.query.pageItems;
                results = await testRepository.loadPrevResultsPage(req.query, req.query.pageItems, offset, date, testId);
            } else if (req.query.nextKey) {
                let nextKey = JSON.parse(req.query.nextKey);
                let date =  nextKey.date;
                date = date.slice(0, 19).replace('T', ' ');
                let testId = nextKey.testId;
                let offset = req.query.pageDelta * req.query.pageItems;
                results = await testRepository.loadNextResultsPage(req.query, req.query.pageItems, offset, date, testId);
            } else {
                results = await testRepository.loadInitialResultsPage(req.query, req.query.pageItems);
            }
            let previousKey = JSON.stringify({
                date: results[0][0]['date'],
                testId: results[0][0]['testId']
            })
            let nextKey = JSON.stringify({
                date: results[0][results[0].length-1]['date'],
                testId: results[0][results[0].length-1]['testId']
            })
            res.status(200).json({
                tests: results[0], 
                total: results[1][0]['COUNT(*)'],
                previousKey: previousKey,
                nextKey: nextKey
            });
        } catch (err) {
            res.status(400).json(err)
        }
    }

    /* DEMO FUNCTIONS */

    const getAllTestResults = async (req, res) => {
        try {
            let offset = (req.query.pageItems) * (req.query.pageIndex - 1);
            let results = await testRepository.getAllTestResults(req.query.pageItems, offset);
            res.status(200).json({tests: results[0], total: results[1][0]['COUNT(*)']});
        } catch (err) {
            res.status(400).json(errorRepository(4000))
        }
    }

    const filterTestResults = async (req, res) => {
        try {
            let results;
            let offset = (req.query.pageItems) * (req.query.pageIndex - 1);
            if (req.query.languageId && req.query.moduleId && req.query.userId) {
                results = await testRepository.filterByModuleAndUser(req.query.languageId, req.query.moduleId, req.query.userId, req.query.pageItems, offset);
            } else if (req.query.languageId && req.query.userId) {
                results = await testRepository.filterByLanguageAndUser(req.query.languageId, req.query.userId, req.query.pageItems, offset);
            } else if (req.query.userId) {
                results = await testRepository.filterByUser(req.query.userId, req.query.pageItems, offset);
            } else if (req.query.languageId && req.query.moduleId) {
                results = await testRepository.filterByModule(req.query.languageId, req.query.moduleId, req.query.pageItems, offset);
            } else if (req.query.languageId) {
                results = await testRepository.filterByLanguage(req.query.languageId, req.query.pageItems, offset);
            } else {
                // Request query is empty or contains incorrect parameters
                throw errorRepository(4000);
            }
            res.status(200).json({tests: results[0], total: results[1][0]['COUNT(*)']});
        } catch (err) {
            res.status(400).json(err);
        }
    }

    return {
        createTestResults: createTestResults,
        getAllTestResults: getAllTestResults,
        filterTestResults: filterTestResults,

        /* NEW FUNCTIONS */
        loadTest: loadTest,
        loadFilters: loadFilters
    }

}

module.exports = controller;
