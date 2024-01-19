const express=require('express');
const app=express();
// const db=require('./config/database');

require('dotenv').config();
const PORT=process.env.PORT||4000;

app.use(express.json());

require('./config/database').db();
// db();

// health api
app.get("/health",(req,res)=>{
    res.json({
        service:"Job listing server",
        status:"Active",
        time:new Date(),
    });
})


app.listen(PORT,()=>{
    console.log(`server is up and running at ${PORT}`)
})