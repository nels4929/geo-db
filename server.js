var express = require('express');
var app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'me',
    password    : '',
    database    : 'test'
});

connection.connect();


app.get('/', function(req, res){
    queryByName('Zach').then( results => {
        console.log('Got results!');
        console.log(results);
        res.send(results);
    });
    //res.send("Hello world"); 
});

function queryByName(name, callback){
    return new Promise(function (resolve, reject){
        connection.query('SELECT * FROM test_table WHERE name = "' + name + '"', function (error, results) {
            if (error) return reject(error);
            else {
                console.log('fulfilled query promise');
                resolve(results);
            }
        });
    });
};

app.listen(3000);
