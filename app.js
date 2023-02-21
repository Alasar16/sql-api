const express = require('express')
const mySql = require('mysql')
const app = express()

app.use(express.json())

const port = 3000||process.env.port

const db = mySql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'user',
    port:'3306'
})

app.get('/user',(req,res)=>{
    const q = 'SELECT * FROM `registration`'
    db.query(q,(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
})

app.post('/user',(req,res)=>{
    const{first_name ,last_name , email,password}=req.body
    const q ='INSERT INTO registration (first_name ,last_name , email,password) VALUES (?,?,?,?)'
    db.query(q,[first_name ,last_name , email,password],(err,data)=>{

        if(err) return res.json({msg:'db error'})

        if(data){
            const newQ = 'SELECT * FROM `registration` where id=?'
    db.query(newQ,[data.insertId],(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
        }
    })
})



app.listen(port,()=>{
    console.log('server is running......')
})