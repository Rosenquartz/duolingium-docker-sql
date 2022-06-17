const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');

getConnection = () => {
    return mysql.createConnection({
        host     : 'db_server',
        user     : 'root',
        password : 'password',
        database : 'mydb'
    })
}

getLanguages = () => {
    return getConnection().then((connection)=>{
        let sql = 'CALL GetLanguageList()'
        return connection.query(sql).then((results)=>{
            return (results[0][0])
        }).catch((error)=>{
            throw error
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        throw error
    })
}

getItems = (moduleId) => {
    return getConnection().then((connection)=>{
        let sql = 'CALL GetItemList(?)'
        return connection.query(sql, [moduleId]).then((results)=>{
            return (results[0][0])
        }).catch((error)=>{
            throw error
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        throw error
    })
}

getModules = (languageId) => {
    return getConnection().then((connection)=>{
        let sql = 'CALL GetModuleList(?)'
        return connection.query(sql, [languageId]).then((results)=>{
            return results[0][0]
        }).catch((error)=>{
            throw error
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        throw error
    })
}