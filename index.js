const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()

const mysql =require('mysql2')

app.use(cors())
app.use(bodyParser.json())



const db=mysql.createConnection({

    host :"localhost",
    user:"root",
    password: "MyNewPass",
    database:"simpledb",
    port:3306,
    multipleStatements:true
})

// checkdatabase connection
db.connect(err=>{
if(err){
    console.log(err,'dberr')
}
console.log('database is connected')
})

// get all data

app.get('/user',(req,res)=>{
    console.log("get all users")

    let qr='SELECT * FROM simpledb.user'
    db.query(qr,(err,result)=>{
        if(err){
            console.log("err",err)
        }
        if(result.length>0){
            res.send({
                message:'all user data',
                data:result
            })
        }
    })

})
// for single data
app.get('/user/:id',(req,res)=>{
    console.log(req.params.id,'getid')
    let gID=req.params.id;
    let qr=`SELECT * FROM simpledb.user where id=${gID}`
    db.query(qr,(err,result)=>{
        if(err){
            console.log("err",err)
        }
        if(result.length>0){
            res.send({
                message:'all single user data',
                data:result
            })
        }else{
            res.send({
                message:'data is not found'
            })
        }
    })
});
// create data

app.get('/user',(req,res)=>{
    console.log(req.body,'post data')
let id=req.body.id; 
let fullname=req.body.fullname;
let email=req.body.email;
let mobile=req.body.mobile;

let qr=`insert into user(id,fullname,email,mobile)
       values( "${id}","${fullname}","${email}","${mobile}")`
       db.query(qr,(err,result)=>{
        if(err){
            console.log("err",err)
            console.log(result,'result')

        }
        res.send({
            message:'data is inserted'
        })
       
    })

})


// update  data

app.put('/user/:id',(req,res)=>{
    console.log(req.body,'updatebody')

    let id=req.body.id; 
let fullname=req.body.fullname;
let email=req.body.email;
let mobile=req.body.mobile;
let qr=`update  user set id= '${id}',fullname="${fullname}",email='${email}',mobile='${mobile}'
where id=${id}`
db.query(qr,(err,result)=>{
    if(err){
        console.log("err",err)
        console.log(result,'result')

    }
    res.send({
        message:'data is updated'
    })
   
})

})



// delete dqta
app.delete('/user/:id',(req,res)=>{

    let id=req.params.id;
    let qr=`delete from  user where id='${id}'`
    db.query(qr,(err,result)=>{
        if(err){
            console.log("err",err)
            console.log(result,'result')
    
        }
        res.send({
            message:'data is deleted'
        })
       
    })
})


app.listen(3000,()=>{
    console.log('server is running..')
})
