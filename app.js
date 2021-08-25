let config = require('./config/config.json');
require('./models/db');
const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require('body-parser');
let userRouter = require("./api/user");
let organizationRouter = require("./api/organization");
let doctorRouter = require("./api/doctor");
let appointmentRouter = require("./api/appointment");
const port = process.env.PORT|| config.development.PORT;
app.listen(port,(err)=>{
    if(!err){
        console.log(`app is running on port ${config.development.PORT}`);
    }else{
        console.log("Return error");
    }
});

app.get("/",(req,res)=>{
    res.send("hello ")
})
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use("/api/user",userRouter);
app.use("/api/organization",organizationRouter);
app.use("/api/doctor",doctorRouter);
app.use("/api/appointment",appointmentRouter);