const mysql = require('mysql');

// Create connection to MySQL database
const db = mysql.createPool({
    host: 'localhost', // Change this to your MySQL host
    user: 'root', // Change this to your MySQL username
    password: 'Databaseconnection', // Change this to your MySQL password
    database: 'reactauthentication' // Change this to your MySQL database name
  });

  module.exports = db;