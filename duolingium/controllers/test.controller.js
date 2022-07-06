const { nanoid } = require('nanoid');

const controller = (testRepository, errorRepository) => {

    const createTestResults = async (req, res) => {
        try {
            console.log("yea")
            const testId = nanoid(8);
            let results = await testRepository.createTestResults(
                testId,
                req.body.languageId,
                req.body.moduleId,
                req.body.userId,
                req.body.total,
                req.body.correct,
                req.body.time
            );
            res.status(200).json(results)
        } catch (err) {
            res.status(400).json(errorRepository(4000));
        }
    }

    const getTestResults = async (req, res) => {
        try {
            console.log("mom", req.params.moduleId);
            let results = await testRepository.getTestResults(req.params.moduleId);
            res.status(200).json(results)
        } catch (err) {
            res.status(400).json(errorRepository(4000));
        }
    }

    return {
        createTestResults: createTestResults,
        getTestResults: getTestResults
      }

}

module.exports = controller;
