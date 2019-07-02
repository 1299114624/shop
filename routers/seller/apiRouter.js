const express = require('express');
const multiparty = require('multiparty');
const bodyParser = require('body-parser');
const seller = require('../../handleDB/handleSeller');
const goods = require('../../handleDB/handleGoods');
const Cookies = require('cookies');

//创建路由对象
const router = new express.Router();
router.use(bodyParser.urlencoded({extended: false}));

//注册请求处理
router.post('/register',(req,res)=>{
    //获得请求的参数
    let form = new multiparty.Form({
        uploadDir: 'static/images'
    });
    form.parse(req,(error,fields,files)=>{
        let user = fields.user.length>0 ? fields.user[0] : '';
        let psd = fields.psd.length>0 ? fields.psd[0] : '';
        let repsd = fields.repsd.length>0 ? fields.repsd[0] : '';

        // let logoPath = files.logo.length>0 ? ('/'+files.logo[0].path) : '';
        // let bannerPath = files.banner.length>0 ? ('/'+files.banner[0].path) : '';
        user = JSON.stringify(user)
        psd = JSON.stringify(psd)
        repsd = JSON.stringify(repsd)
        // if(!user || !psd || !repsd || !logoPath || !bannerPath){
        if(!user || !psd || !repsd){
            res.json({
                status:1,
                message: '输入不能为空'
            })
            return;
        }else if(psd !== repsd){
            res.json({
                status:2,
                message: '两次输入密码不一致'
            })
            return;
        }
        // 查询数据库中是否存在这个商家
        seller.canRegister(user)
        .then(()=>{
            //不存在,注册
            seller.saveSellerInfo({
                sellername: user,
                password: psd
                // logo: logoPath,
                // banner: bannerPath
            })
            .then(()=>{
                res.json({
                    status:0,
                    message:'注册成功'
                })
            })
            .catch(()=>{
                res.json({
                    status:3,
                    message:'数据库错误,注册失败'
                })
            })
        })
        .catch(()=>{
            res.json({
                status:4,
                message:'该商家已存在'
            })
        })
    })
})

//登陆请求处理
router.post('/login',(req,res)=>{
    //取得请求参数
    let {username,password} = req.body;
    username = JSON.stringify(username)
    password = JSON.stringify(password)
    //判断
    if(!username || !password){
        res.json({
            status:1,
            message:'输入不能为空'
        })
        return
    }
    //查询数据库,这个商家是否存在,密码是否正确
    seller.canLogin(username,password)
    .then(result=>{
        //保存登陆状态,cookies要传入login请求的req和res
        let cookies = new Cookies(req,res);
        cookies.set('SELLERID',result._id);
        // console.log(222,result)
        res.json({
            status:0,
            message:'登陆成功'
        })
    })
    .catch(()=>{
        res.json({
            status:2,
            message:'登陆失败,用户名或密码错误'
        })
    })
})

//添加商品
router.post('/add/goods',(req,res)=>{
    //解析请求的参数
    let form = new multiparty.Form({
        uploadDir:'static/images'
    });
    form.parse(req,(error,fields,files)=>{
        // console.log(fields,files)
        let name = fields.name.length>0? fields.name[0]:'';
        let price = fields.name.length>0? fields.price[0]:'';
        let description = fields.name.length>0? fields.description[0]:'';
        let count = fields.name.length>0? fields.count[0]:'';

        let images = files.images.length>0?files.images.map(item=>('/'+item.path)):'';
        let id = new Cookies(req,res).get('SELLERID');
        console.log(111,name,description,price,count,images,id)
        // 判断是否为空
        if(!name || !price || !description || !count || !images){
            res.json({
                status:1,
                message: '输入不能为空'
            })
        }
        // 保存商品数据
        goods.saveGoodsInfo({
            goodsname:name,
            description,
            price,
            count,
            images,
            seller:id
        })
        .then(()=>{
            res.json({
                status:0,
                message:'保存成功'
            })
        })
        .catch(()=>{
            res.json({
                status:2,
                message:'数据库问题,保存失败'
            })
        })
    })
})


module.exports = router;