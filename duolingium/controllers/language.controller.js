const { nanoid } = require('nanoid');
const _ = require('lodash');

const controller = (languageRepository, errorRepository) => {
    const getLanguages = async (req,res) => {
      try {
        let cachedResults = await languageRepository.getCachedLanguages();
        
        if (!_.isEmpty(cachedResults)) {
          console.log("returning cached results")
          res.status(200).json(JSON.parse(cachedResults));
          return;
        }

        let results = await languageRepository.getLanguages();
        await languageRepository.setCachedLanguages(JSON.stringify(results));

        let languageList = [];
        await results.forEach(row=>{
          languageList.push(row.englishName + '/' + row.nativeName)
        })
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.status(200);
        res.send(JSON.stringify(results));
      } catch (err) {
        console.error(err);
        res.status(400);
        res.send(errorRepository(4000));
      }
    }

    const getModules = async (req,res) => {
      try {
        let cachedResults = await languageRepository.getCachedModules(req.params.languageId);

        if (!_.isEmpty(cachedResults)) {
          console.log("returning cached results");
          res.status(200).json(JSON.parse(cachedResults));
          return;
        }

        console.log("no cached results")
        let results = await languageRepository.getModules(req.params.languageId);
        await languageRepository.setCachedModules(req.params.languageId, JSON.stringify(results));

        res.set({ 'content-type': 'application/json; charset=utf-8' });
        if (results.length == 0) throw {errno: 1035};
        res.status(200);
        res.send(JSON.stringify({modules: results}));
      } catch (err) {
        res.status(404);
        if (err.errno) {
          res.send(errorRepository(err.errno));
          return;
        }
        res.send(errorRepository(4000));
      }
    }

    const getItems = async (req,res) => {
      try {
        let cachedResults = await languageRepository.getCachedModule(req.params.moduleId);
        console.log(cachedResults)

        if (!_.isEmpty(cachedResults)) {
          console.log("'-------------------------");
          if (cachedResults == '[]') throw {errno: 1036};
          res.status(200).json({items: JSON.parse(cachedResults)});
          return;
        }

        console.log("'-------------------------");
        let results = await languageRepository.getItems(req.params.moduleId);
        await languageRepository.setCachedModule(req.params.moduleId, JSON.stringify(results));

        res.set({ 'content-type': 'application/json; charset=utf-8' });
        if (results.length == 0) throw {errno: 1036};
        res.status(200).json({items: results});
      } catch (err) {
        res.status(404);
        if (err.errno) {
          res.send(errorRepository(err.errno));
          return;
        }
        res.send(errorRepository(4000));
      }
    }

    const createItem = async (req, res) => {
      try {
        console.log("A")
        await languageRepository.createItem([nanoid(8), req.params.moduleId, req.body.native, req.body.english]);
        console.log("B")
        let userList = await languageRepository.getUsers;
        console.log(userList);
      } catch (err) {
        console.error(err)
        res.status(400);
        res.send(errorRepository(4000));
      }
    }

    return {
      getLanguages: getLanguages,
      getModules: getModules,
      getItems: getItems,
      createItem: createItem
    }
}

module.exports = controller;  