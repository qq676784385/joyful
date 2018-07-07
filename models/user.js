
var mongoose = require('mongoose');

var  userschema=new mongoose.Schema({
    username:String,
    password:String,
    //0管理员,1用户,2游客
    status:String
});

mongoose.model('User',userschema);
