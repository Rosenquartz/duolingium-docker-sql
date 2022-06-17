const { resolveSoa } = require('dns');
const path = require('path');
const errors = require(path.resolve( __dirname, "./error.messages.js" ) );
const db = require(path.resolve( __dirname, "./db.connection.js" ) );

const controller = {
    getLanguages: async function(req,res) {
      db.getLanguages().then(results=>{
        let languageList = [];
        results.forEach(row=>{
            languageList.push(row.englishName+'/'+row.nativeName)
        })
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.status(200);
        res.send(JSON.stringify({languages: languageList}));
      }).catch(err=>{
        res.status(400);
        res.send(errors(4000));
      })
    },
    getModules: async function(req,res) {
      db.getModules(req.params.languageId).then(results=>{
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.status(200);
        res.send(JSON.stringify({modules: results}));
      }).catch(err=>{
        console.log(err)
        res.status(400);
        res.send(errors(4000));
      })
    },
    getItems: async function(req,res) {
      db.getItems(req.params.moduleId).then(results=>{
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.status(200);
        res.send(JSON.stringify({items: results}));
      }).catch(err=>{
        console.log(err)
        res.status(400);
        res.send(errors(4000));
      })
    }
}

module.exports = controller;  