const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/BabyUser';

const findOne = (req, res) => {
    const userInfo = {name: req.body.name};

    MongoClient.connect(DB_CONN_STR, (err, db)=> {
        const collection = db.collection('user');
        collection.find(userInfo).toArray(function (err, docs) {
            const user = docs.find(doc => doc.password === req.body.password);

            if (user) {
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
};

const saveUserInfo = (req, res)=> {
    const userInfo = req.body;

    MongoClient.connect(DB_CONN_STR, (err, db)=> {
        const collection = db.collection('user');
        userInfo.diaries = [];
        const result = collection.insertOne(userInfo);
        req.session.name = req.body.name;
        req.session.userInfo = userInfo;
        console.log(result);
        res.json(result);
        db.close();
    })

};

const findUserExist = (req, res) => {
    const userName = {name: req.body.userName};

    MongoClient.connect(DB_CONN_STR, (err, db)=> {
        const collection = db.collection('user');
        collection.find(userName).toArray(function (err, docs) {
            if (docs.length === 0) {
                res.send(false);
            } else {
                res.send(true);
            }
        });
        db.close();
    })
};

const insertDairyMessage = (req, res)=> {
    const userInfo = req.body
    const info = {
        date: userInfo.date, age: userInfo.age, title: userInfo.title, content: userInfo.content,
        babyScore: userInfo.babyscore, parentScore: userInfo.parentscore, public: userInfo.public, likeNumber: 0,
        picture: userInfo.picture
    };
    MongoClient.connect(DB_CONN_STR, (err, db)=> {
        const collection = db.collection('user');
        const result = collection.updateOne({name: userInfo.name}, {$push: {"diaries": info}});
        req.session.userInfo.diaries.push(info);
        res.json(result);
        db.close();
    })
};

const insertOne = function (req, res) {
    const userInfo = req.body;

    MongoClient.connect(DB_CONN_STR, (err, db)=> {
        const collection = db.collection('user');
        const result = collection.insertOne(userInfo);
        res.json(result);
        db.close();
    })
};

const deleteOne = function (req, res) {
    const userName = req.body;

    MongoClient.connect(DB_CONN_STR, (err, db)=> {
        const collection = db.collection('user');
        const result = collection.removeOne(userName);
        res.json(result);
        db.close();
    })
};

const updateOne = function (req, res) {
    const userInfo = req.body;
    const oldInfo = {user: userInfo.user, pwd: userInfo.pwd};

    MongoClient.connect(DB_CONN_STR, (err, db)=> {
        const collection = db.collection('user');
        const result = collection.updateOne(oldInfo, {$set: {pwd: userInfo.newPwd}});
        res.json(result);
        db.close();
    })
};
const modifyPassword = (req, res)=> {

    const userInfo = req.body;
    const userName = {name: req.session.name};

    MongoClient.connect(DB_CONN_STR, (err, db)=> {
        const collection = db.collection('user');
        const result = collection.updateOne(userName, {$set: {password: userInfo.password}});
        req.session.userInfo.password = userInfo.password;
        res.json(true);
        db.close();
    })
}
const modifyUserInfo = (req, res) => {
    const userInfo = req.body;

    MongoClient.connect(DB_CONN_STR, (err, db)=> {
        const collection = db.collection('user');
        const result = collection.updateOne({name: userInfo.name}, {
            $set: {
                babyBir: userInfo.babyBir,
                sex: userInfo.sex
            }
        });
        req.session.userInfo.babyBir = userInfo.babyBir;
        req.session.userInfo.sex = userInfo.sex;
        res.send(true);
        db.close();
    })
}

const addLikeNum = function (req, res) {
    const userInfo = req.body.info;
    MongoClient.connect(DB_CONN_STR, (err, db) => {
        const collection = db.collection('user');
        const result = collection.updateOne({"name": userInfo.name, "diaries.title": userInfo.title},
            {$set: {"diaries.$.likeNumber": userInfo.likeNumber}});
        if(req.session.userInfo){
            for (let j = 0; j < req.session.userInfo.diaries.length; j++) {
                if (req.session.userInfo.name === userInfo.name && req.session.userInfo.diaries[j].title === userInfo.title) {
                    req.session.userInfo.diaries[j].likeNumber = userInfo.likeNumber;
                    break;
                }
            }
        }
        res.send(result);
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
    saveUserInfo,
    modifyUserInfo,
    modifyPassword,
    insertDairyMessage,
    addLikeNum
};