/*
* @Author: binxchen
* @Date:   2017-01-17 15:35:36
* @Last Modified by:   binxchen
* @Last Modified time: 2017-01-17 17:53:38
*/

var User = require('../controller/index');

//路由控制
module.exports = function (app) {
    //获取所有用户
    app.get('/users',User.getUsers);
    //获取某个用户
    app.get('/user/:id', User.getUser);
    //删除某个用户
    app.post('/userdel/:id', User.delUser);
    //添加一个用户
    app.post('/user', User.addUser);
    //更新一个用户
    app.put('/user/:id', User.updateUser);

    //分页获取书
    app.post('/book/get_books',User.getBooks);
    //获取某一本书
    app.post('/book/:id',User.getBook);
    //添加一本书
    app.post('/book/add_book', User.addBook);
    //删除一本书
    app.post('/book/del_book', User.delBook);
    //更新一本书
    // app.put('/book/:id',Book.updateBook);

};
