const express = require('express');
const ejs = require('ejs');


const sellerMainRouter = require('./routers/seller/mainRouter');
const sellerApiRouter = require('./routers/seller/apiRouter');

//创建服务器
const server = express();

//处理静态资源
server.use('/public',express.static('./static'))
server.use('/static',express.static('./static'))

//处理ajax
server.use('/seller/api',sellerApiRouter);

//配置模板引擎
server.set('view engine','html');
server.engine('html',ejs.__express);

//处理页面
server.use('/seller',sellerMainRouter);

server.listen(7080,(error)=>{
    if(error){
        console.log('服务器启动失败')
    }else{
        console.log('服务器启动成功')
    }
})

