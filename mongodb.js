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
                res.send(true);
            } else {
                res.send(false);
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
    insertOne,
    deleteOne,
    updateOne
};