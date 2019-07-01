const db = require('../db')

//根据商家查询商品
module.exports.findAllGoodsBySeller = function(sellerid){
    return new Promise((resolve,reject)=>{
        db.query(`select * from goods WHERE seller=${sellerid}`,[],result=>{
            if(result){
                resolve(result)
            }else{
                reject()
            }
        })
    })
}

//保存商品,新增商品
module.exports.saveGoodsInfo = function({goodsname,description,price,count,images,seller}){
    return new Promise((resolve,reject)=>{
        db.query(`INSERT INTO goods(goodsname,description,price,count,images,seller) VALUES(?,?,?,?,?,?)`,[goodsname,description,price,count,images,seller],result=>{
            if(result){
                resolve(); //注册成功
            }else{
                reject(); //注册失败
            }
        })
    })
}

//根据id删除商品
module.exports.deleteGoodsByid = function(id){
    return new Promise((resolve,reject)=>{
        // Goods.findOneAndDelete({_id:id}).then(()=>{
        //     resolve();
        // })
        db.query(`DELETE FROM goods WHERE _id=${id}`,[],()=>{
            resolve()
        })
    })
}