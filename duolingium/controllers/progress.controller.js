const { resolveSoa } = require('dns');
const path = require('path');
const errors = require(path.resolve( __dirname, "./error.messages.js" ) );
const db = require(path.resolve( __dirname, "./db.connection.js" ) );

const controller = {
    getProgress: async function(req,res) {
        db.getProgress(req.params.userId, req.query.lang).then(results=>{
          res.status(200).send(results)
        })
      },
    updateProgress: async function(req, res) {
        db.updateProgress(req.params.userId, req.body).then(results=>{
            console.log(results)
            res.status(200).send(results);
        }).catch(err=>{
            console.log(err);
            res.status(400).send(err);
        });
    },
    getNewItems: async function(req, res) {
        ;
    }
}

module.exports = controller;