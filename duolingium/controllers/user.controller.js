const { nanoid } = require('nanoid');
const { bcrypt } = require('bcrypt')

const controller = (userRepository, errorRepository) => {
    const getUsers = async (req, res) => {
        try {
            let results = await userRepository.getUsers();
            let users = [];
            results.forEach(user=>{
                users.push(user.userId);
            })
            res.status(200);
            res.send(JSON.stringify({users: users}));
        } catch (err) {
            console.error(err)
            res.status(400);
            res.send(errorRepository(4000));
        }
    };

    const getProfile = async (req, res) => {
        try {
            let results = await userRepository.getProfile(req.params.userId);
            if (!results[0]) throw {errno: 1012};
            res.status(200);
            res.send(results[0]);
        } catch (err) {
            if (err.errno) {
                res.status(400);
                res.send(errorRepository(err.errno));
            } else {
                res.status(400);
                res.send(errorRepository(4000));
            }
        }
    };

    const createUser = async (req, res) => {
        try {
            if (!req.body.username) throw {errno: 1000};
            if (!req.body.password) throw {errno: 1001};
            if (!req.body.firstname) throw {errno: 1002};
            if (!req.body.lastname) throw {errno: 1003};
            if (!req.body.email) throw {errno:1004};

            var regexp = /\S+@\S+\.\S+/;
            if (!regexp.test(req.body.email)) throw {errno: 1005};

            await userRepository.createUser(req.body);
            let results = await userRepository.getAllItems();
            //console.log(a);
            //await userRepository.createProgress(req.body.username);
            for (let item of results) {
                let inputList = [nanoid(8), item.languageId, item.moduleId, item.itemId, req.body.username]
                await userRepository.createProgressItem(inputList);
            }
            delete req.body.password;
            res.status(201);
            res.send(req.body);
        } catch (err) {
            console.error(err);
            if (err.errno == 1062) {
                if (err.sqlMessage.includes("'email'")) {
                    res.status(409).send(errorRepository(1011));
                } else {
                    res.status(409).send(errorRepository(1010));
                }
            } else if (err.errno) {
                res.status(400).send(errorRepository(err.errno));
            } else {
                res.status(400).send(errorRepository(4000));
            }            
        }
    };

    const updateUser = async (req, res) => {
        try {
            if (req.body.username) throw {errno: 1020};
            if (req.body.email) {
                var regexp = /\S+@\S+\.\S+/;
                if (!regexp.test(req.body.email)) throw {errno: 1005};
            }
            let results = await userRepository.getProfile(req.params.userId);
            if (!results[0]) throw {errno: 1012};
            results = await userRepository.updateUser(req.body, req.params.userId);
            console.log("SHEE")
            delete req.body.password;
            res.status(200);
            res.send(req.body);
        } catch (err) {
            if (err.errno) {
                if (err.errno == 1062) {
                    res.status(400);
                    res.send(errorRepository(1011));
                } else {
                    res.status(404);
                    res.send(errorRepository(err.errno))
                }
            } else {
                res.status(400);
                res.send(errorRepository(err.errno));
            }
        }
    }

    const checkLogin = async(req, res) => {
        try {
            console.log("Logging in")
            if (!req.body.username) throw errorRepository(1000);
            if (!req.body.password) throw errorRepository(1000);
            
            let userPassword = await userRepository.checkLogin(req.body.username);
            console.log(bcrypt.compare(req.body.password, userPassword));
        } catch (err) {
            res.status(400).json(errorRepository(err.errno))
        }
    }

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

    return {
        getUsers: getUsers,
        getProfile: getProfile,
        createUser: createUser,
        updateUser: updateUser,
        checkLogin: checkLogin,
        getProgress: getProgress,
        updateProgress: updateProgress,
        getItemsForUser: getItemsForUser
    }
}

module.exports = controller;