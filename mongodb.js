const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/BabyUser';

const findOne = (req, res) => {
    const userInfo = {name: req.body.name};

    MongoClient.connect(DB_CONN_STR,(err, db)=> {
        const collection = db.collection('user');
        collection.find(userInfo).toArray(function (err, docs) {
            const user = docs.find(doc => doc.password === req.body.password);

            if(user) {
                req.session.name = user.name;
                req.session.userInfo = user;
                res.send(true);
            } else {
                res.send(false);
            }
        });
        db.close();
    })
};

const findDiary = (req, res) => {

    MongoClient.connect(DB_CONN_STR, (err, db)=> {
        console.log("link ok");
        const collection = db.collection('user');
        collection.find().toArray(function (err, docs) {
            res.send(docs);
        });
        db.close();
    })
}

const saveUserInfo=(req,res)=>{
    const userInfo=req.body;

    MongoClient.connect(DB_CONN_STR,(err,db)=>{
        const collection=db.collection('user');
        userInfo.diaries = [];
        const result=collection.insertOne(userInfo);
        req.session.name = req.body.name;
        req.session.userInfo = userInfo;
        console.log(result);
        res.json(result);
        db.close();
    })

};

const findUserExist = (req, res) => {
    const userName = {name: req.body.userName};

    MongoClient.connect(DB_CONN_STR,(err, db)=> {
        const collection = db.collection('user');
        collection.find(userName).toArray(function (err, docs) {
            if(docs.length === 0) {
                res.send(false);
            } else {
                res.send(true);
            }
        });
        db.close();
    })
};


const insertOne = function (req,res) {
    const userInfo = req.body;

    MongoClient.connect(DB_CONN_STR,(err, db)=> {
        console.log("link ok");
        const collection = db.collection('user');
        const result = collection.insertOne(userInfo);
        res.json(result);
        db.close();
    })
};

const deleteOne = function (req,res) {
    const userName = req.body;

    MongoClient.connect(DB_CONN_STR,(err, db)=> {
        console.log("link ok");
        const collection = db.collection('user');
        const result = collection.removeOne(userName);
        res.json(result);
        db.close();
    })
};

const updateOne = function (req,res) {
    const userInfo = req.body;
    const oldInfo = {user:userInfo.user,pwd:userInfo.pwd};

    MongoClient.connect(DB_CONN_STR,(err, db)=> {
        console.log("link ok");
        const collection = db.collection('user');
        const result = collection.updateOne(oldInfo,{$set:{pwd:userInfo.newPwd}});
        res.json(result);
        db.close();
    })
};

module.exports = {
    findOne,
    findDiary,
    insertOne,
    deleteOne,
    updateOne,
    findUserExist,
    saveUserInfo
};