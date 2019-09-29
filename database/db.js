const mysql = require('mysql');
const util = require('util');

let db = 'dating_app';
const conn = mysql.createPool({
    host : "18.225.6.171",
    user : "root",
    password : "golu511996",
    database: db
});
conn.getConnection(function(err,connection) {
    if (err) throw err;
    console.log(`Connected to ${db} database !`);
    if (connection) connection.release();
    return
});
const exe_qry = util.promisify(conn.query).bind(conn);

module.exports = {
	exe_qry
}
