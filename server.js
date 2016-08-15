"use strict";

function server() {
    const express = require('express');

    const bodyParser = require('body-parser');
    const MongoClient = require('mongodb').MongoClient;
    const DB_CONN_STR = 'mongodb://localhost:27017/BabyUser';
    const mdb = require('./mongodb');
    const app = new express();
    const session = require('express-session');

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static('./views'));

    app.use(express.static('./public'));
    app.use(express.static('./dist'));
    app.use(session({
        secret: 'a',
        resave: true,
        saveUninitialized: true,
    }));

    app.get('/logIn', (req, res) => {
        if (req.session.name) {
            res.send(req.session.name);
        } else {
            req.session.name = '';
            res.send(req.session.name)
        }
    });

    app.get('/session', (req, res) => {
        if (req.session.name) {
            res.send(req.session.name);
        } else {
            req.session.name = '';
            res.send(req.session.name)
        }
    });

    app.post('/logout', (req, res) => {
        req.session.name = '';
        res.send(req.session.name);
        console.log(req.session.name)
    });

    app.post('/logIn', mdb.findOne);

    app.post('/existUser', mdb.findUserExist);

    app.post('/userInfo',mdb.saveUserInfo);

    app.post('/diray-show',mdb.findDiary);

    app.post('/updateLike', mdb.addLikeNum);

    app.get('/diaries', (req,res) => {
        res.json(req.session.userInfo.diaries);
    });

    var server = app.listen(3000, function () {
        var port = server.address().port;
        console.log('listening at port %s', port);
    });

    return server;
}

module.exports = server;
