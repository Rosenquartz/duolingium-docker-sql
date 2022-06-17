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

getUsers = () => {
    return getConnection().then((connection)=>{
        let sql = 'CALL GetUserList()'
        return connection.query(sql).then((results)=>{
            return (results[0][0])
        }).catch((error)=>{
            console.error("ERR1")
            throw error
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        console.error("ERR2")
        throw error
    })
}

getUsers2 = () => {
    return getConnection().then((connection)=>{
        let sql = 'SELECT id FROM user'
        return connection.query(sql).then((results)=>{
            return (results[0])
        }).catch((error)=>{
            console.error("ERR1")
            throw error
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        console.error("ERR2")
        throw error
    })
}

getProfile = (userId) => {
    return getConnection().then((connection)=>{
        let sql = 'CALL GetProfile(?)'
        return connection.query(sql, [userId]).then((results)=>{
            return (results[0][0])
        }).catch((error)=>{
            throw error
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        throw(error)
    })
}

createUser = (fields) => {
    return getConnection().then((connection)=>{
        let sql = 'CALL CreateUser(?, ?, ?, ?, ?)';
        let values = [fields.username, fields.firstname, fields.lastname, fields.email, fields.password];
        return connection.query(sql, values).then((results)=>{
            return (fields);
        }).catch((error)=>{
            console.log("SHEEEs")
            console.log(error)
            throw error
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        throw(error)
    })
}

updateUser = (fields, userId) => {
    return getConnection().then((connection)=>{
        let sql = 'UPDATE `user` SET ? WHERE id = ?';
        return connection.query(sql, [fields, userId]).then((results)=>{
            console.log("CHANGED ", userId)
            return (fields);
        }).catch((error)=>{
            throw error
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        throw(error)
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

createProgress = (userId) => {
    return getConnection().then((connection)=>{
        let sql = 'SELECT * FROM item INNER JOIN module on item.moduleId = module.moduleId'
        return connection.query(sql).then((results)=>{
            var promises = []
            results[0].forEach(row=>{
                sql = 'INSERT INTO `progressItem` VALUES (?, ?, ?, ?, ?, 0, 0)'
                let insertValues = []
                insertValues.push(uuidv4().toString().replace("-","").substring(0,8));
                insertValues.push(row.languageId);
                insertValues.push(row.moduleId);
                insertValues.push(row.itemId);
                insertValues.push(userId);
                promises.push(connection.query(sql, insertValues)
                .catch(err=>{
                    throw err;
                }))
            })
            return Promise.all(promises).then(()=>{
                return("Finished creating progress items for user")
            })
        }).catch((error)=>{
            throw error
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        throw error
    })
}

getProgress = (userId, languageId) => {
    return getConnection().then((connection)=>{
        let returnObject = {}
        let sql = 'CALL GetModuleList(?)'
        return connection.query(sql, [languageId]).then((results)=>{
            returnObject.language = languageId;
            returnObject.modules = []
            let promises = []
            results[0][0].forEach(mod=>{
                console.log(userId, mod.moduleId)
                let total; let correct;
                sql = 'CALL GetModuleProgress(?, ?)'
                promises.push(connection.query(sql, [mod.moduleId, userId]).then(results=>{
                    console.log(results[0][0][0], results[0][1][0])
                    console.log("TOTAL: ", total, " CORRECT: ", correct);
                    returnObject.modules.push({
                        moduleId: mod.moduleId,
                        correct: results[0][1][0].correct,
                        total: results[0][0][0].total
                    })
                }))
            })
            return Promise.all(promises).then((result)=>{
                return(returnObject)
            })
        }).catch((error)=>{
            console.error("ERR1")
            throw error
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        console.error("ERR2")
        throw error
    })
}

updateProgress = (userId, request) => {
    return getConnection().then((connection)=>{
        // First part: check the 'correctness' of the answer
        // If both native and english fields are in the return, discard.
        // Or if both are empty, discard.
        console.log("REQUEST ", request);
        if (request.english && request.native) {
            let err = {errno:1030}
            throw err;
        } else if (!request.english && !request.native) {
            let err = {errno:1031}
            throw err;
        }

        // Else, get item information and compare to provided answer:
        let sql = "CALL GetItem(?)"
        return connection.query(sql, request.itemId).then(results=>{
            let correct = 0;
            console.log(request, results[0][0])
            if (request.english) {
                if (request.english == results[0][0][0].english) {
                    correct = 1;
                }
            }
            else {
                if (request.native == results[0][0][0].native) {
                    correct = 1;
                }
            }
            
            // Now, update the fields in SQL
            let values = {
                totalAttempts:11,
                correctAttempts:7
            }
            sql = 'CALL UpdateProgress(?, ?, ?)'
            return connection.query(sql, [userId, request.itemId, correct]).then(()=>{
                return {correct: correct};
            }).catch((err)=>{
                console.error(err);
                throw err;
            })
        })
    })
}

module.exports = {
    getUsers: getUsers,
    getProfile: getProfile,
    createUser: createUser,
    updateUser: updateUser,
    getLanguages: getLanguages,
    getModules: getModules,
    getItems: getItems,
    createProgress: createProgress,
    getProgress:getProgress,
    updateProgress:updateProgress
}