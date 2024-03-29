const mysql = require('mysql')


module.exports = {
    query: function(sql, params, callback) {
        const conn = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'root',
            database: 'test'
        })
        conn.connect(()=>{
            conn.query(sql,params,(err,results,fields)=>{
                callback && callback(results, fields)
                conn.end()
            })
        })
    }
}
