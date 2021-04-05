var pool = require('./bd.js');
var md5 = require('md5');

async function getUserbyUserNameandPassword(user,password){
    try {
        var query = "select * from empleado where usuario =? and  password=? limit 1";
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = { getUserbyUserNameandPassword }