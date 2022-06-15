const mysql = require('mysql2/promise');

sample = () => {
    return getConnection().then((connection)=>{
        let sql = 'SELECT id FROM user'
        return connection.query(sql).then((results)=>{
            return (results[0])
        }).catch((error)=>{
            console.error(error)
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        console.log(error)
    })
}

getConnection = () => {
    return mysql.createConnection({
        host     : 'db_server',
        user     : 'root',
        password : 'password',
        database : 'mydb'
    })
}

//sample().then((res)=>{
//    console.log(res)
//}).catch((error)=>{
//   console.error(error)
//})
//console.log(db)
//db.query(sql, (err, results, fields)=>{
//    console.log(results)
//})

module.exports = {
    getUser:sample
}