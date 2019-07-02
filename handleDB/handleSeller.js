const db = require('../db')

//判断商家是否存在,是否可以注册
module.exports.canRegister = function(user){
    // user = JSON.parse(user)
    //数据库查询是异步的,必须查到结果之后才进行then或者catch的操作,所以要用promise
    return new Promise((resolve,reject)=>{
        db.query(`select * from seller WHERE sellername=${user}`,[],result=>{
            if(result.length){
                //存在商家,不可以注册
                reject();
            }else{
                //不存在,可以注册
                resolve()
            }
        })
    })
}

//保存商家信息,注册
module.exports.saveSellerInfo = function({sellername,password}){
    sellername = JSON.parse(sellername)
    password = JSON.parse(password)
    return new Promise((resolve,reject)=>{
        // db.query(`INSERT INTO seller(sellername,password,logo,banner) VALUES(?,?,?,?)`,[sellername,password,logo,banner],result=>{
        db.query(`INSERT INTO seller(sellername,password) VALUES(?,?)`,[sellername,password],result=>{
            if(result){
                resolve(); //注册成功
            }else{
                reject(); //注册失败
            }
        })
    })
}

//查询商家是否存在,能否登陆
module.exports.canLogin = function(name,psd){
    return new Promise((resolve,reject)=>{
        db.query(`select * from seller WHERE sellername=${name} AND password=${psd}`,[],result=>{
            // console.log(result)
            if(result.length){
                resolve(result[0]);
            }else{
                reject();
            }
        })
    })
}

//查询cookies找到的id是否有效
module.exports.findSellerById = function(id){
    return new Promise((resolve,reject)=>{
        db.query(`select * from seller WHERE _id=${id}`,[],result=>{
            if(result.length){
                // id有效
                resolve()
            }else{
                reject()
            }
        })
    })
}