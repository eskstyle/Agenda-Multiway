const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'agenda_telefonica'
});

connection.connect((err) => {
    if(err){
        throw err;
    }

    console.log('Conectado no banco!');
});

module.exports = connection;