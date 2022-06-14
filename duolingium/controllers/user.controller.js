var path = require('path');
var errorMessages = require(path.resolve( __dirname, "./error.messages.js" ) );
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
  createUser: async function(req,res) {
    // First check if any of the fields are missing
    if (!req.body.username) {res.status(200).send(errorMessages.error1000); return;}
    if (!req.body.password) {res.status(200).send(errorMessages.error1001); return;}
    if (!req.body.firstname) {res.status(200).send(errorMessages.error1002); return;}
    if (!req.body.lastname) {res.status(200).send(errorMessages.error1003); return;}
    if (!req.body.email) {res.status(200).send(errorMessages.error1004); return;}

    // Then check if either the username or the email has already been taken.
    /*var isError = await connection.query(sql, function(error, results, fields) {
      if (error) {res.status(400).send(errorMessages.error4000); return;}
      let userIds = [];
      let userEmails = [];
      results.forEach((row)=>{userIds.push(row.id); userEmails.push(row.email);})
      console.log("1")
      if (userIds.includes(req.body.username)) {res.status(400).send(errorMessages.error1010); return true;}
      console.log("2")
      if (userEmails.includes(req.body.email)) {res.status(400).send(errorMessages.error1011); return true;}
      console.log("3")
      return false;
    })/*
    //let ret = await connection.query(sql)
    //console.log(ret.RowDataPacket);
    //for (const i in ret) {await console.log(i.id)}
    sql = 'INSERT INTO `user` VALUES (?, ?, ?, ?, ?, NULL)';
    let values = [req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.password]
    connection.query(sql, values, function(error, results, fields) {
      if (error) {res.status(400).send(errorMessages.error4000); return;}
      delete req.body.password;
      res.status(200);
      res.send(req.body);
    })*/
    
    let sql = 'SELECT id, email FROM user';
    connection.query(sql, function(error, results, fields) {
      if (error) {res.status(400).send(errorMessages.error4000); return;}
      let userIds = [];
      let userEmails = [];
      results.forEach((row)=>{userIds.push(row.id); userEmails.push(row.email);})
      if (userIds.includes(req.body.username)) {res.status(400).send(errorMessages.error1010); return;}
      if (userEmails.includes(req.body.email)) {res.status(400).send(errorMessages.error1011); return;}

      // Else insert
      sql = 'INSERT INTO `user` VALUES (?, ?, ?, ?, ?, NULL)';
      let values = [req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.password]
      connection.query(sql, values, function(error, results, fields) {
        if (error) {res.status(400).send(errorMessages.error4000); return;}
        delete req.body.password;
        res.status(200);
        res.send(req.body);
      })
    })
  },
  updateUser: function(req, res) {
    let updateObject = {}
    checkUsername(req.params.userId, function(err, data) {
      console.log(data)
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
    let userIds = []
    results.forEach((row)=>{userIds.push(row.id)})
    if (userIds.includes(username)) callback(null, true)
    else callback(null, false)
  })
}

module.exports = controller;