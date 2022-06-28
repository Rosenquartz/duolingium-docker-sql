const { nanoid } = require('nanoid');

const controller = (languageRepository, errorRepository) => {
    const getLanguages = async (req,res) => {
      try {
        let results = await languageRepository.getLanguages();
        let languageList = [];
        await results.forEach(row=>{
          languageList.push(row.englishName + '/' + row.nativeName)
        })
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.status(200);
        res.send(JSON.stringify({languages: languageList}));
      } catch (err) {
        res.status(400);
        req.send(errorRepository(4000));
      }
    }

    const getModules = async (req,res) => {
      try {
        let results = await languageRepository.getModules(req.params.languageId);
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
        let results = await languageRepository.getItems(req.params.moduleId);
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        if (results.length == 0) throw {errno: 1036};
        res.status(200);
        res.send(JSON.stringify({items: results}));
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