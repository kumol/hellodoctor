let config = require('./config/config.json');
require('dotenv').config();
require('./models/db');
const express = require("express");
const app = express();
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
Sentry.init({ dsn: process.env.SENTRY_DSN, integrations: [
  new Sentry.Integrations.Http({ tracing: true }),
  new Tracing.Integrations.Express({
    app,
  })
],tracesSampleRate: 1.0,});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());
console.log(process.env.SENTRY_DSN)
const cors = require("cors");
var bodyParser = require('body-parser');
let userRouter = require("./api/user");
let organizationRouter = require("./api/organization");
let doctorRouter = require("./api/doctor");
let appointmentRouter = require("./api/appointment");
const superAdminRouter = require("./api/route/admin/staticDataControl/staticDataControl");

const port = process.env.PORT|| config.development.PORT;
app.listen(port,(err)=>{
    if(!err){
        console.log(`app is running on port ${config.development.PORT}`);
    }else{
        console.log("Return error");
    }
});

app.get("/",(req,res)=>{
    res.send("Eello Everyone")
})
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use("/api/user",userRouter);
app.use("/api/organization",organizationRouter);
app.use("/api/doctor",doctorRouter);
app.use("/api/appointment",appointmentRouter);

app.use("/api/admin/system",superAdminRouter);