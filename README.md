一 项目需求:
编写接口文档:为前端提供登录,注册,购书,上架书籍等功能的接口
暂时还没做到购书,登录注册的功能,目前实现的功能是用户以及书籍的crud

二 数据库设计

实体:书籍

    var bookschema = new mongoose.Schema({
        book_id:String,
        book_name:String,
        author:String,
         price:String,
         number:Number,
         state:String,
        describe:String,
        tel:Number,
         user_id:String,
        create_date:{type:Date,dafault:Date.now}
        //类型为DATE,默认值是now
    });

 用户:

    var  userschema=new mongoose.Schema({
        username:String,
        password:String
    });
