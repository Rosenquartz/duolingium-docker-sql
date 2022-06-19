const controller = (languageDB, errorDB) => {
    const getLanguages = async (req,res) => {
      try {
        let results = await languageDB.getLanguages();
        let languageList = [];
        await results.forEach(row=>{
          languageList.push(row.englishName + '/' + row.nativeName)
        })
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.status(200);
        res.send(JSON.stringify({languages: languageList}));
      } catch (err) {
        res.status(400);
        req.send(errorDB(4000));
      }
    }

    const getModules = async (req,res) => {
      try {
        let results = await languageDB.getModules(req.params.languageId);
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.status(200);
        res.send(JSON.stringify({modules: results}));
      } catch (err) {
        res.status(400);
        req.send(errorDB(4000));
      }
    }

    const getItems = async (req,res) => {
      try {
        let results = await languageDB.getItems(req.params.moduleId);
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.status(200);
        res.send(JSON.stringify({items: results}));
      } catch (err) {
        res.status(400);
        req.send(errorDB(4000));
      }
    }

    return {
      getLanguages: getLanguages,
      getModules: getModules,
      getItems: getItems
    }
}

module.exports = controller;  