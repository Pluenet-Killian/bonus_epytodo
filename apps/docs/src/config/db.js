const mysql = require('mysql2')
const user = process.env.MYSQL_USER
const password = process.env.MYSQL_ROOT_PASSWORD
const my_database = process.env.MYSQL_DATABASE

const pool   = mysql.createPool({
    host: 'localhost',
    user: user,
    password: password,
    database: my_database
})

module.exports = pool.promise()
