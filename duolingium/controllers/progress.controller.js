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

    /*
    
    const getProgress = async (req, res) => {
        try {
            if (!req.query.lang) throw {errno: 1032}
            let results = await userRepository.getModules(req.query.lang);
            let modules = [];
            console.log(modules);
            for (let mod of results) {
                let total = 0; let correct = 0;
                let neww = await userRepository.getItemsForUser(req.params.userId, mod.moduleId);
                console.log('------------')
                neww.forEach(item=>{
                    total += 1;
                    correct += item.correctAttempts > 0 ? 1 : 0;
                })
                console.log(total, correct)
                modules.push({
                    moduleId: mod.moduleId,
                    total: total,
                    correct: correct
                })
                console.log(modules)
            }
            if (modules.length == 0) throw {errno: 1035};
            res.status(200);
            res.send({modules: modules});
        } catch (err) {
            if (err.errno) {
                res.status(404);
                res.send(errorRepository(err.errno))
            }
            res.status(400);
            res.send(errorRepository(4000));
        }
    }

    const updateProgress = async (req, res) => {
        try {
            console.log(req.params.userId, req.body)
            let results = await userRepository.updateProgress(req.params.userId, req.body);
            res.status(200);
            res.send(results);
        } catch (err) {
            res.status(400);
            res.send(errorRepository(4000));
        }
    }

    const getItemsForUser = async(req, res) => {
        try {
            if (!req.query.moduleId) throw {errno: 1034}
            console.log(req.params.userId, req.query.moduleId)
            let results = await userRepository.getItemsForUser(req.params.userId, req.query.moduleId);

            res.status(200);
            console.log(results)
            if (req.query.new == 'true' && req.query.review == 'true') {
                throw {errno: 1033};
            } else if (req.query.new == 'true') {
                results = results.filter(item=>{
                    return item.correctAttempts == 0
                });
            } else if (req.query.review == 'true') {
                results = results.filter(item=>{
                    return item.correctAttempts > 0
                });
                results = results.sort((a,b)=>{
                    return (a.correctAttempts/a.totalAttempts - b.correctAttempts/b.totalAttempts)
                })
                console.log(results);
            }
            results.forEach(row=>{
                delete row.correctAttempts;
                delete row.totalAttempts;
            })
            delete results.correctAttempts;
            delete results.totalAttempts;
            console.log(results)
            let ret = []
            if (req.query.number) {
                let temp = 0;
                for (let i = 0; i < results.length; i++) {
                    if (i==req.query.number) break;
                    ret.push(results[i])
                    console.log("yea")
                }
                res.send(ret);
                return;
            }
            res.send(results);
        } catch (err) {
            console.error(err);
            res.status(400);
            res.send(err.errno ? errorRepository(err.errno) : errorRepository(4000));
        }
    }
    */
}

module.exports = controller;