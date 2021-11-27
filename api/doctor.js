var express = require("express");
const { ErrorResponse, Ok } = require("../helpers/httpResponse");
const Doctor = require("../models/doctor");
const chamberController = require("./controller/chamberController");
const doctorsHelper = require("./controller/doctorController");
var router = express.Router();

router.get("/all",async(req,res)=>{
    try{
        let limit = req.query.limit && Number(req.query.limit) > 0? Number(req.query.limit) : 10;
        let page = req.query.page && Number(req.query.page)>=0 ? Number(req.query.page) : 1;
        let doctor = page == 0 || limit == 0 ? [] : await Doctor.find({}).skip(limit*(page-1)).limit(limit);
        let total = await Doctor.countDocuments();
        return Ok(res, "Request Successful", {
            data: doctor,
            total: total,
            page: page,
            limit: limit
        });
    }catch(error){
        return ErrorResponse(res, error.message, error)
    }
});

router.post("/save", async(req,res,next)=>{
    try{
        let newDoctor = {...req.body};
        newDoctor.experience = newDoctor.experience ? newDoctor.experience.length ? newDoctor.experience : [newDoctor.experience] : [];
        newDoctor.degrees = newDoctor.degrees ? newDoctor.degrees.length ? newDoctor.degrees : [newDoctor.degrees] : [];
        let doctor = new Doctor(newDoctor);
        doctor.fullName = doctor.firstName + " " + doctor.lastName;
        doctor.id = doctor._id;
        doctor = await Doctor.create(doctor);

        return Ok(res, "Request Successful", doctor);
    }catch(error){
        return ErrorResponse(res,error.message,error)
    }
});

router.get("/single/:id",doctorsHelper.getDoctorById);

router.delete("/delete/:id", async(req,res,next)=>{
    try{
        let deleteOne = await Doctor.deleteOne({_id:req.params.id})
        return Ok(res, "Request Successful", {"msg": "Object deleted"});
    }catch(error){
        return ErrorResponse(res, error.message, error);
    }
})

router.get("/organization/:id",doctorsHelper.getDoctorByOrganizationId);

router.post("/chamber/", chamberController.addNewChamber);
router.get("/chamber/", )
module.exports = router;