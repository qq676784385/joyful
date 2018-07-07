// /*
// * @Author: binxchen
// * @Date:   2017-01-17 17:11:30
// * @Last Modified by:   binxchen
// * @Last Modified time: 2017-01-17 17:54:55
// */

var mongoose = require('mongoose');

var User = mongoose.model('User');
var Book = mongoose.model('Books');

//获取所有用户
exports.getUsers= function(req, res) {
    User.find({}, function (err, docs) {
        if(err){
            res.json({"status":"error","msg":"查找用户失败"});
        }
        res.json({"status":"success","data":docs});
    })
};

//获取某一个用户
exports.getUser= function(req, res) {

    var id=req.params.id;

    User.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","data":doc})
        }
    });
};

//删除某一个用户
exports.delUser= function(req, res) {

    var id=req.params.id;

    User.remove({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success"})
        }
    });
};

//添加一个用户
exports.addUser= function(req, res) {
    var username=req.body.username;
    var password=req.body.password;

    var newUser=new User(
        {
            username:username,
            password:password
        }
    );
    newUser.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            res.json({"status":"success"});
        }
    });

};

//更新某个用户
exports.updateUser= function(req, res) {
    var id=req.params.id;

    var username=req.body.username;
    console.log(username);
    var password=req.body.password;
    console.log(password);

    // 修改记录
    var conditions ={_id : id};
    var update     ={$set : {username:username, password : password}};
    var options    = {upsert : true};
    User.update(conditions, update, options, function(error){
        if(error) {
            res.json({"status":"error"});
        } else {
            res.json({"status":"success"});
        }
    });
};

// 添加书籍
exports.getBooks = function(req, res) {
    var book_pid=req.body.book_pid;
    var book_name=req.body.book_name;
    var author=req.body.author;
    var price=req.body.price;
    var num=req.body.num;
    var state=req.body.state;
    var describe=req.body.describe;
    var tel=req.body.tel;
    var create_date=req.body.create_date;

    var data=new Books(
        {
          book_pid:book_pid,
          book_name:book_name,
          author:author,
          price:price,
          num:num,
          //0在售,1下架,2预定,3展示
          state:state,
          describe:describe,
          tel:tel,
          create_date:create_date
        }
    );
    data.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            res.json({"status":"书籍已写入"});
        }
    });
};

// 分页获取书籍
exports.addBook = function(req, res) {
    var curr=req.body.curr;
    //每页大小为10
    //返回所有查询的结果
    var query=Books.find({});
    // 跳过前N个文档,返回其余的
    query.skip((curr-1)*10);
    // 限制返回结果的数量
    query.limit(10);
    //按照id添加的顺序倒序排列
    //排序 键对应文档的键名, 值代表排序方向, 1 升序, -1降序
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            Books.find(function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
};

//删除一个书籍
exports.delBook= function(req, res) {
    var id=req.body.id;
    Books.remove({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success"})
        }
    });

};

//获取书籍详情
exports.getBook = function(req, res) {

    var id=req.body.id;
    Books.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","data":doc.content})
        }
    });
};
