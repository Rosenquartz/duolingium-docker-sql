const { resolveSoa } = require('dns');
const path = require('path');
const errors = require(path.resolve( __dirname, "./error.messages.js" ) );
const db = require(path.resolve( __dirname, "./db.connection.js" ) );

const controller = {
  getUsers: async function(req,res) {
    db.getUsers().then(results=>{
      let users = [];
      results.forEach(user=>{
        users.push(user.id);
      })
      res.status(200);
      res.send(JSON.stringify({users: users}));
    }).catch(err=>{
      res.status(400);
      res.send(errors(4000));
    })
  },

  createUser: function(req,res) {
    // First check if any of the fields are missing, and return the appropriate error
    if (!req.body.username) {
      res.status(200).send(errors(1000));
      return;
    } else if (!req.body.password) {
      res.status(200).send(errors(1001));
      return;
    } if (!req.body.firstname) {
      res.status(200).send(errors(1002));
      return;
    } if (!req.body.lastname) {
      res.status(200).send(errors(1003));
      return;
    } else if (!req.body.email) {
      res.status(200).send(errors(1004)); 
      return;
    }

    db.createUser(req.body).then(results=>{
      delete results.password;
      res.status(200);
      res.send(results)
    }).catch(err=>{
      if (err.errno == 1062) {
        if (err.sqlMessage.includes("'email'")) {
          res.status(400).send(errors(1011));
        } else {
          res.status(400).send(errors(1010));
        }
      } else {
        res.status(400).send(errors(4000));
      }
    })
  },

  updateUser: function(req, res) {
    if (req.body.username) {
      res.status(400).send(errors(1020)); 
      return;
    }
    let sql = 'UPDATE `user` SET ? WHERE id = ?';
    connection.query(sql, [req.body, req.params.userId], function(error, results, fields) {
      if (error) {
        if (error.errno==1054) {res.status(400).send(errors(1021)); return;} 
        else if (error.errno==1062){res.status(400).send(errors(1011)); return;}
        else {res.status(400).send(errors(4000)); return;}
      } else {
        res.status(200).send(req.body)
      }
    })
  },

  getProfile: function(req, res) {
    // First check if user is specified
    if (!req.params.userId) {res.status(400).send(errors(1000)); return;}

    // Then check if user is in the database
    db.getProfile(req.params.userId).then(results=>{
      if (!results[0]) {
        res.status(400);
        res.send(errors(1012));
        return;
      }
      res.status(200);
      res.send(JSON.stringify({
        user: results
      }));
    }).catch(err=>{
      res.status(400);
      res.send(errors(4000));
    })
  }
}

const checkUsername = (username, callback) => {
  let sql = 'SELECT id FROM user';
  connection.query(sql, function(error, results, fields) {
    if (error) {
      callback(err, null);
      return;
    } 
    let userIds = []
    results.forEach((row)=>{userIds.push(row.id)})
    if (userIds.includes(username)) callback(null, true)
    else callback(null, false)
  })
}

const checkEmail = (email, callback) => {
  // First check email validity (regexp):
  
  // Then check if email is existing:
  let sql = 'SELECT email FROM user';
  connection.query(sql, function(error, results, fields) {
    if (error) {
      callback(err, null);
      return;
    } 
    let userEmails = []
    results.forEach((row)=>{userEmails.push(row.email)})
    if (userEmails.includes(email)) callback(null, true)
    else callback(null, false)
  })
}

module.exports = controller;