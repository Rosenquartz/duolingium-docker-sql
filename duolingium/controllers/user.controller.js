var path = require('path');
var errors = require(path.resolve( __dirname, "./error.messages.js" ) );
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'db_server',
  user     : 'root',
  password : 'password',
  database : 'mydb'
});

const controller = {
  getUsers: function(req,res) {
    let sql = 'SELECT id FROM user';
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      let returnArray = [];
      for (let row of results) returnArray.push(row.id);
      res.status(200)
      res.send(JSON.stringify({users:returnArray}))
    });
  },
  createUser: function(req,res) {
    // First check if any of the fields are missing
    if (!req.body.username) {res.status(200).send(errors(1000)); return;}
    if (!req.body.password) {res.status(200).send(errors(1001)); return;}
    if (!req.body.firstname) {res.status(200).send(errors(1002)); return;}
    if (!req.body.lastname) {res.status(200).send(errors(1003)); return;}
    if (!req.body.email) {res.status(200).send(errors(1004)); return;}

    let sql = 'INSERT INTO `user` VALUES (?, ?, ?, ?, ?, NULL)';
    let values = [req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.password]
    connection.query(sql, values, function(error, results, fields) {
      if (error) {
        if (error.errno == 1062) {
          if (error.sqlMessage.includes("'email'")) {res.status(400).send(errors(1011))}
          else {res.status(400).send(errors(1010))}
          return;
        } else {
          res.status(400).send(errors(4000));
          return;
        }
      }
      delete req.body.password;
      res.status(200);
      res.send(req.body);
    })
  },
  updateUser: function(req, res) {
    let updateObject = {}
    checkUsername(req.params.userId, function(err, data) {
      console.log(data)
    })
  },
  getProfile: function(req, res) {
    // First check if user is specified
    if (!req.params.userId) {res.status(400).send(errors(1000)); return;}

    // Then check if user is in the database
    checkUsername(req.params.userId, function(err, data) {
      console.log(err, data)
      if (err) {res.status(400).send(errors(4000)); return;}
      //if (!data) {res.status(400).send(JSON.stringify({sd:"sdf"})); return;}
      if (!data) {res.status(400).send(errors(1012)); return;}
      
      // Else, return user data:
      console.log("getting from db")
      let sql = 'SELECT id, first_name, last_name, email FROM user WHERE id = ?'
      connection.query(sql, [req.params.userId], function(error, results, fields) {
        if (error) {res.status(400).send(errors(4000)); return;}
        res.status(200);
        res.send(results);
      })
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