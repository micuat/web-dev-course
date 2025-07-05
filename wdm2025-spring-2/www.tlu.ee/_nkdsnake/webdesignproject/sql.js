var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "marirjab",
  password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});