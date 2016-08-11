"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/BabyUser';
const mdb = require('./mongodb');
const fs = require('fs');
const app = new express();
const session = require('express-session');

app.use(bodyParser.urlencoded());

app.use(express.static('./views'));

app.use(express.static('./public'));
app.use(express.static('./dist'));
app.use(session({
    secret: 'a',
    cookie: { maxAge: 60 * 1000 }
}));

app.get('/logIn', (req, res) => {
    if(req.session.name) {
        res.send(req.session.name);
    } else {
        req.session.name = '';
        res.send(req.session.name)
    }
});

app.post('/logout',(req,res) => {
    req.session.name = '';
    res.send(req.session.name);
    console.log(req.session.name)
})

app.post('/logIn', mdb.findOne);

// app.post('/logIn', (req, res) => {
//
//     req.session.name = req.body.name;
//     res.send(true)
// });

app.listen(3000, () => {
    console.log('Server start');
});
