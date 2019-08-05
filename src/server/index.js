const express = require("express");
const path = require( 'path');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const session = require("express-session");
import api from './routes';

const connection  = mysql.createConnection({
    host: 'localhost',
    user: 'min9604',
    password: '!zpdlxl9604',
    database: 'kt_intern',
    port: '6002'
});

connection.connect();

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static("public"));
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api', api);

app.use('/', express.static(path.join(__dirname, './../public')));

app.get('*', function (request, response){
    response.sendFile(path.resolve('public', 'index.html'));
});
 
app.listen(5000, function(){
    console.log("Started listening on port", 5000);
});