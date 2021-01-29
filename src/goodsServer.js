let express = require("express")()
let mysql = require("mysql")

// Node解决跨域问题
express.all("/*", function (req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})
let sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "quwanwang",
    timezone: "08:00"
})
//尝试连接
sql.connect()
//监听来自前端的get请求
express.get("/login", (req, res) => {
    let username = req.query.username
    let password = req.query.password
    sql.query(`select * from user where username="${username}" and password="${password}"`, (error, data) => {
        if (error) {
            console.log(error)
            console.log("登录第一层错误")
            res.send("error")
        }
        else {
            if (!data.length) {
                console.log("登录第二层错误")
                res.send("error")
            }
            else {
                res.send("success")
            }
        }
    })
})
express.get("/addUser", (req, res) => {
    let username = req.query.username
    let password = req.query.password
    let email = req.query.email
    sql.query(`select * from user where username="${username}"`, (error, data) => {
        if (error) {
            console.log("注册的第一层错误")
            console.log(error)
            res.send("error")
        }
        else {
            if (data.length) {
                res.send("chongfu")
            }
            else {
                sql.query(`INSERT INTO user (username,password,email) VALUES ("${username}","${password}","${email}")`, (error) => {
                    if (error) {
                        console.log("注册的第二层错误")
                        console.log(error)
                        res.send("error")
                    }
                    else {
                        res.send("success")
                    }
                })
            }
        }
    })
})

//监听来自前端的get请求
express.get("/fashiongoods", (req, res) => {
    sql.query(`select name,price,id from hkgoldgoods`, (error, data) => {
        if (error) {
            console.log(error)
            res.send("error")
        }
        else {
            res.send(data)
        }
    })
})

//监听搜索页的关键词判断
express.get("/hasGoods", (req, res) => {
    let keyword = req.query.keyword
    console.log(keyword)
    sql.query(`select * from hkgoldgoods where keyword1="${keyword}" or keyword2="${keyword}"`, (error, data) => {
        if (error) {
            console.log(error)
            console.log("搜索第一层错误")
            res.send("error")
        }
        else {
            console.log(data)
            if (!data.length) {
                console.log("搜索第二层错误")
                res.send("error")
            }
            else {
                res.send(data)
            }
        }
    })
})

//要添加的商品先存到数据库里
express.get("/insertShopcart", (req, res) => {
    let id = req.query.id
    let goodsname = req.query.goodsname
    let price = req.query.price
    let counts = req.query.counts
    sql.query(`insert into shopcart (id,name,price,counts) values ("${id}","${goodsname}","${price}","${counts}")`, (error) => {
        if (error) {
            console.log(error)
            res.send("error")
        }
        else {
            res.send("success")
        }
    })
})

//获取购物车里的内容
express.get("/getshopcart", (req, res) => {
    sql.query(`select id,name,price,counts from shopcart`, (error, data) => {
        if (error) {
            console.log(error)
            res.send("error")
        }
        else {
            res.send(data)
        }
    })
})

////根据商品名查找商品id值
express.get("/getgoodsID", (req, res) => {
    let goodsname=req.query.goodsname
    console.log(goodsname)
    sql.query(`select * from hkgoldgoods where name="${goodsname}"`, (error, data) => {
        if (error) {
            console.log(error)
            res.send("error")
        }
        else {
            res.send(data)
        }
    })
})

// //更新数据库中的商品数量
// express.get("/updataCount", (req, res) => {
//     let counts = req.query.counts
//     sql.query(`update shopcart set counts="${counts}" where id="${id}"`, (error, data) => {
//         if (error) {
//             console.log(error)
//             res.send("error")
//         }
//         else {
//             res.send("success")
//         }
//     })
// })

//删除
express.get("/deleteCart", (req, res) => {
    let id = req.query.id
    sql.query(`delete from shopcart where id="${id}"`, (error) => {
        if (error) {
            console.log(error)
            res.send("error")
        }
        else {
            res.send("success")
        }
    })
})

//清楚购物车
express.get("/deleteCartAll", (req, res) => {
    sql.query(`delete from shopcart`, (error) => {
        if (error) {
            console.log(error)
            res.send("error")
        }
        else {
            res.send("success")
        }
    })
})

express.listen(8080)