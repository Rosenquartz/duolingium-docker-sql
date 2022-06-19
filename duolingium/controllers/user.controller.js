const controller = (userDB, errorDB) => {
    const getUsers = async (req, res) => {
        try {
            let results = await userDB.getUsers();
            let users = [];
            results.forEach(user=>{
                users.push(user.id);
            })
            res.status(200);
            res.send(JSON.stringify({users: users}));
        } catch (err) {
            res.status(400);
            res.send(errorDB(4000));
        }
    };

    const getProfile = async (req, res) => {
        try {
            let results = await userDB.getProfile(req.params.userId);
            if (!results[0]) throw {errno: 1012};
            res.status(200);
            res.send(results[0]);
        } catch (err) {
            if (err.errno) {
                res.status(400);
                res.send(errorDB(err.errno));
            } else {
                res.status(400);
                res.send(errorDB(4000));
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

            await userDB.createUser(req.body);
            await userDB.createProgress(req.body.username);
            delete req.body.password;
            res.status(200);
            res.send(req.body);
        } catch (err) {
            if (err.errno == 1062) {
                if (err.sqlMessage.includes("'email'")) {
                    res.status(400).send(errorDB(1011));
                } else {
                    res.status(400).send(errorDB(1010));
                }
            } else if (err.errno) {
                res.status(400).send(errorDB(err.errno));
            } else {
                res.status(400).send(errorDB(4000));
            }            
        }
    };

    const updateUser = async (req, res) => {
        try {
            if (req.body.username) throw {errno: 1020};
            let results = await userDB.getProfile(req.params.userId);
            if (!results[0]) throw {errno: 1012};
            results = await userDB.updateUser(req.body, req.params.userId);
            delete results.password;
            res.status(200);
            res.send(results);
        } catch (err) {
            if (err.errno) {
                if (err.errno == 1062) {
                    res.status(400);
                    res.send(errorDB(1011));
                } else {
                    res.status(400);
                    res.send(errorDB(err.errno))
                }
            } else {
                res.status(400);
                res.send(errorDB(err.errno));
            }
        }
    }

    const getProgress = async (req, res) => {
        try {
            let results = await userDB.getProgress(req.params.userId, req.query.lang);
            res.status(200);
            res.send(results);
        } catch (err) {
            res.status(400);
            res.send(err);
        }
    }

    const updateProgress = async (req, res) => {
        try {
            let results = await userDB.updateProgress(req.params.userId, req.body);
            res.status(200);
            res.send(results);
        } catch (err) {
            res.status(400);
            res.send(err);
        }
    }

    return {
        getUsers: getUsers,
        getProfile: getProfile,
        createUser: createUser,
        updateUser: updateUser,
        getProgress: getProgress,
        updateProgress: updateProgress
    }
}

module.exports = controller;