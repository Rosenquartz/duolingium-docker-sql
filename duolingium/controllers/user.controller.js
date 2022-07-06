const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt')

const controller = (userRepository, errorRepository) => {

    const getUsers = async (req, res) => {
        try {
            let results = await userRepository.getUsers();
            let users = [];
            results.forEach(user=>{
                users.push(user.userId);
            })
            res.status(200).json({users: users});
        } catch (err) {
            console.log(err);
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

            let regexp = /\S+@\S+\.\S+/;
            if (!regexp.test(req.body.email)) throw {errno: 1005};

            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);

            await userRepository.createUser(req.body);
            delete req.body.password;
            res.status(201).json(req.body);
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
                let regexp = /\S+@\S+\.\S+/;
                if (!regexp.test(req.body.email)) throw {errno: 1005};
            }

            let results = await userRepository.getProfile(req.params.userId);
            if (!results[0]) throw {errno: 1012};

            await userRepository.updateUser(req.body, req.params.userId);
            delete req.body.password;
            res.status(200).json(req.body);
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
    };

    const checkLogin = async(req, res) => {
        try {
            console.log("Logging in")
            console.log(req.body)
            if (!req.body.userId) throw errorRepository(1000);
            if (!req.body.password) throw errorRepository(1000);
            
            let results = await userRepository.checkLogin(req.body.userId);
            let auth = await bcrypt.compare(req.body.password, results[0].password);
            let returnObject = {auth: auth, userId: req.body.userId};
            if (auth) returnObject.languageId = results[0].preferredLanguage;
            res.status(200).json(returnObject);
        } catch (err) {
            console.log(err)
            res.status(400).json(errorRepository(1002))
        }
    }
    
    const setPreferredLanguage = async(req, res) => {
        try {
            if (!req.body.userId) throw errorRepository(4000)
            if (!req.body.preferredLanguage) throw errorRepository(4000)

            await userRepository.setPreferredLanguage(req.body)
            res.status(200).json(req.body)
        } catch (err) {
            res.status(400).json(errorRepository(4000))
        }
    }

    const getPreferredLanguage = async(req, res) => {
        try {
            if (!req.params.userId) throw errorRepository(4000)
            console.log(req.params.userId)
            let results = {}
            let userInfo = await userRepository.getProfile(req.params.userId);
            console.log("userInfo:", userInfo)
            results.preferredLanguage = userInfo[0].preferredLanguage
            let modules = await userRepository.getPreferredLanguage(req.params.userId)
            results.modules = modules[0][0]
            console.log("resutls are ", results)
            res.status(200).json(results)
        } catch (err) {
            res.status(400).json(errorRepository(4000))
        }
    }
    
    return {
        getUsers: getUsers,
        getProfile: getProfile,
        createUser: createUser,
        updateUser: updateUser,
        checkLogin: checkLogin,
        setPreferredLanguage: setPreferredLanguage,
        getPreferredLanguage: getPreferredLanguage
    }
}

module.exports = controller;