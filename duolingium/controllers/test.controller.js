const { nanoid } = require('nanoid');

const controller = (testRepository, errorRepository) => {

    const createTestResults = async (req, res) => {
        try {
            console.log("Creating test results:")
            const testId = nanoid(8);
            console.log([
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
            ])
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

    const getAllTestResults = async (req, res) => {
        try {
            let results = await testRepository.getAllTestResults();
            res.status(200).json(results)
        } catch (err) {
            res.status(400).json(errorRepository(4000))
        }
    }

    const getAllTestResultsByModule = async (req, res) => {
        try {
            let results = await testRepository.getAllTestResultsByModule(req.params.moduleId);
            res.status(200).json(results)
        } catch (err) {
            res.status(400).json(errorRepository(4000));
        }
    }

    const getUserTestResults = async (req, res) => {
        try {
            if (req.query.languageId) {
                let results = await testRepository.getUsertResultsByLanguage(req.params.userId, req.query.languageId);
                res.status(200).json(results)
            } else if (req.query.moduleId) {
                let results = await testRepository.getUserTestResultsByModule(req.params.userId, req.query.moduleId);
                res.status(200).json(results)
            } else {
                let results = await testRepository.getUserTestResults(req.params.userId);
                res.status(200).json(results)
            }
        } catch (err) {
            res.status(400).json(errorRepository(4000))
        }
    }

    return {
        createTestResults: createTestResults,
        getAllTestResults: getAllTestResults,
        getAllTestResultsByModule: getAllTestResultsByModule,
        getUserTestResults: getUserTestResults
      }

}

module.exports = controller;
