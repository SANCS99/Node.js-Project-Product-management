const mysql = require('mysql2');

// Connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'assignment',
  connectTimeout: 10000,
  waitForConnections: true,
  connectionLimit: 10
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      console.log('Retrying connection in 2 seconds...');
      setTimeout(handleDisconnect, 2000);
      return;
    }
    console.log('Connected to MySQL database');
  });

  connection.on('error', (err) => {
    console.error('MySQL error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;
