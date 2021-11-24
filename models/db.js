let config = require("../config/config.json");
const mongoose = require("mongoose");
console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(!err){
        console.log("Database connected");
    }else{
        console.log(err);
    }
});