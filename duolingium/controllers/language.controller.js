const controller = (languageDB, errorDB) => {
    const getLanguages = (req,res) => {
      languageDB.getLanguages().then(results=>{
        let languageList = [];
        results.forEach(row=>{
            languageList.push(row.englishName+'/'+row.nativeName)
        })
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.status(200);
        res.send(JSON.stringify({languages: languageList}));
      }).catch(err=>{
        res.status(400);
        res.send(errorDB(4000));
      })
    }

    const getModules = (req,res) => {
      languageDB.getModules(req.params.languageId).then(results=>{
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.status(200);
        res.send(JSON.stringify({modules: results}));
      }).catch(err=>{
        console.log(err)
        res.status(400);
        res.send(errorDB(4000));
      })
    }

    const getItems = (req,res) => {
      languageDB.getItems(req.params.moduleId).then(results=>{
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.status(200);
        res.send(JSON.stringify({items: results}));
      }).catch(err=>{
        console.log(err)
        res.status(400);
        res.send(errorDB(4000));
      })
    }

    return {
      getLanguages: getLanguages,
      getModules: getModules,
      getItems: getItems
    }
}

module.exports = controller;  