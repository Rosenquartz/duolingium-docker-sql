const controller = (userDB, errorDB) => {
  const getUsers = (req, res) => {
    console.log("Getting users")
    userDB.getUsers().then(results=>{
      let users = [];
      results.forEach(user=>{
        users.push(user.id);
      })
      res.status(200);
      res.send(JSON.stringify({users: users}));
    }).catch(err=>{
      console.log(err)
      res.status(400);
      res.send(errorDB(4000));
    })
  };

  const getProfile = (req, res) => {
    console.log("Getting profile")
    userDB.getProfile(req.params.userId).then(results=>{
      if (!results[0]) throw {errno: 1012};
      res.status(200);
      res.send(results[0]);
    }).catch(err=>{
      if (err.errno) {
        res.status(400);
        res.send(errorDB(err.errno));
      } else {
        res.status(400);
        res.send(errorDB(4000));
      }
    })
  };

  const createUser = (req, res) => {
    console.log("Creating user")
    // First check if any of the fields are missing, and return the appropriate error
    if (!req.body.username) {
      res.status(200).send(errorDB(1000));
      return;
    } else if (!req.body.password) {
      res.status(200).send(errorDB(1001));
      return;
    } if (!req.body.firstname) {
      res.status(200).send(errorDB(1002));
      return;
    } if (!req.body.lastname) {
      res.status(200).send(errorDB(1003));
      return;
    } else if (!req.body.email) {
      res.status(200).send(errorDB(1004)); 
      return;
    }
    
    userDB.createUser(req.body).then(results=>{
      return userDB.createProgress(req.body.username)
    }).then(results=>{
      delete req.body.password;
      res.status(200);
      res.send(req.body)
    }).catch(err=>{
      if (err.errno == 1062) {
        if (err.sqlMessage.includes("'email'")) {
          res.status(400).send(errorDB(1011));
        } else {
          res.status(400).send(errorDB(1010));
        }
      } else {
        res.status(400).send(errorDB(4000));
      }
    })
  };

  const updateUser = (req, res) => {
    console.log("Updating user")
    if (req.body.username) {
      res.status(400).send(errors(1020)); 
      return;
    }
    userDB.getProfile(req.params.userId).then(results=>{
      if (!results[0]) throw {errno: 1012}
      return userDB.updateUser(req.body, req.params.userId)
    }).then(results=>{
      console.log("HEY")
      delete results.password;
      res.status(200);
      res.send(results)
    }).catch(err=>{
      if (err.errno) {
        if (err.errno == 1062) {
          res.status(400);
          res.send(errorDB(1011));
        } else {
          res.status(400);
          res.send(errorDB(4000))
        }
      } else {
      res.status(400);
      res.send(errorDB(4000));
      }
    })
  }

  const getProgress = (req, res) => {
    userDB.getProgress(req.params.userId, req.query.lang).then(results=>{
      res.status(200);
      res.send(results);
    }).catch(err=>{
      res.status(400);
      res.send(err);
    })
  }

  const updateProgress = (req, res) => {
    userDB.updateProgress(req.params.userId, req.body).then(results=>{
      res.status(200);
      res.send(results);
    }).catch(err=>{
      res.status(400);
      res.send(err);
    })
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