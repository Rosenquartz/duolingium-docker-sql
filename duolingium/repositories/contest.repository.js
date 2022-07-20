const { update } = require('lodash');
const mysql = require('mysql2/promise');

getConnection = async () => {
    return mysql.createConnection({
        host     : 'db_server',
        user     : 'root',
        password : 'password',
        database : 'mydb',
        charset : 'utf8mb4'
    })
}

createContest = async (contestId, languageId, moduleId, timer) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL CreateContest(?, ?, ?, ?)';
        let results = await connection.query(sql, [contestId, languageId, moduleId, timer]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

startContest = async (contestId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL StartContest(?)';
        let results = await connection.query(sql, [contestId]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

endContest = async (contestId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL EndContest(?)';
        let results = await connection.query(sql, [contestId]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

joinContest = async (contestId, userId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL JoinContest(?, ?)';
        let results = await connection.query(sql, [contestId, userId]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

getContestants = async (contestId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetContestants(?)';
        let results = await connection.query(sql, [contestId]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

startItem = async(contestItemId, contestId, moduleId, itemId, date) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL StartItem(?, ?, ?, ?, ?)';
        let results = await connection.query(sql, [contestItemId, contestId, moduleId, itemId, date])
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

checkItem = async(itemId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetItem(?)';
        let results = await connection.query(sql, [itemId]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

getContestItemInfo = async(contestId, contestItemId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL getContestItemInfo(?, ?)';
        let results = await connection.query(sql, [contestId, contestItemId]);
        await connection.end();
        return results[0];
    } catch (err) {
        throw err;
    }
}

answerItem = async(contestItemId, userId, moduleId, itemId, date, score) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL AnswerItem(?, ?, ?, ?, ?, ?)';
        let results = await connection.query(sql, [contestItemId, userId, moduleId, itemId, date, score]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

updateScore = async(contestId, userId, score) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL UpdateScore(?, ?, ?)';
        let results = await connection.query(sql, [contestId, userId, score]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createContest: createContest,
    startContest: startContest,
    endContest: endContest,
    joinContest: joinContest,
    getContestants: getContestants,
    startItem: startItem,
    checkItem: checkItem,
    answerItem: answerItem,
    getContestItemInfo: getContestItemInfo,
    updateScore: updateScore
}