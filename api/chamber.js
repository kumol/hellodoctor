var express = require("express");
const { ErrorResponse, Ok } = require("../helpers/httpResponse");
const Doctor = require("../models/doctor");
const doctorsHelper = require("./controller/doctorController");
var router = express.Router();

router.get("/chamber/")