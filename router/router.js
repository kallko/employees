/**
 * Created by kalko on 20.02.17.
 */


var express = require('express'),
    router = express.Router(),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    ObjectId = require('mongodb').ObjectID,
    url = 'mongodb://localhost:27017/test';

router.route('/')
    .get(function (req, res) {
        //console.log("req.session.login", req);
        try {
            res.sendFile('index.html', {root: './public/'});
        } catch (e) {
            console.log( "Error "+ e + e.stack);
        }
    });


router.route('/load')
    .post(function (req, res) {
        try {
            var data=[];
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                var cursor = db.collection('emploeyees').find();
                cursor.each(function (err, doc) {
                    assert.equal(err, null);
                    if (doc != null) {
                         data.push(doc)
                    } else {
                       res.status(200).json(data)
                    }
                });
            })
        } catch (e) {
            console.log( "Error "+ e + e.stack);
        }
    });

router.route('/delete')
    .post(function (req, res) {
        try {
            MongoClient.connect(url, function (err, db) {
                assert.equal(null, err);
                db.collection('emploeyees').remove(
                    {"_id": ObjectId(req.body.id)}).then(function(){
                    res.status(200).json("ok");
                });
                db.close();
            });
        } catch (e) {
        console.log( "Error "+ e + e.stack);
        }
    });


router.route('/saveData')
    .post(function (req, res) {
       try {
           var nObj = req.body;
           MongoClient.connect(url, function(err, db) {
               if (err) {
                   return console.dir(err);
               }
               db.collection('emploeyees').insertOne(nObj, function(err, result) {
                   assert.equal(err, null);
                   res.status(200).json("ok");
               });
           });

       } catch (e) {
           console.log( "Error "+ e + e.stack);
       }

    });


module.exports = router;