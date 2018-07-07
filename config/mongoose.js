/*
* @Author: binxchen
* @Date:   2017-01-17 17:08:42
* @Last Modified by:   binxchen
* @Last Modified time: 2017-01-17 17:44:54
*/

var config = require('./db.js');
var mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.mongodb,{useMongoClient:true});
    require('../models/user.js');
    require('../models/books.js');
    return db;
}
