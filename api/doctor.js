var express = require("express");
const { ErrorResponse, Ok } = require("../helpers/httpResponse");
const Doctor = require("../models/doctor");
const doctorsHelper = require("./controller/doctorController");
var router = express.Router();

router.get("/all",(req,res)=>{
    Doctor.find({}).then((result)=>{
        res.status(200).json({result});
    }).catch((err)=>{
        res.status(500).json({error:err});
    })
});

router.post("/save", async(req,res,next)=>{
    try{
        let newDoctor = {...req.body};
        newDoctor.experience = newDoctor.experience ? newDoctor.experience.length ? newDoctor.experience : [newDoctor.experience] : [];
        newDoctor.degrees = newDoctor.degrees ? newDoctor.degrees.length ? newDoctor.degrees : [newDoctor.degrees] : [];
        let doctor = new Doctor(newDoctor);
        doctor.fullName = doctor.firstName + doctor.lastName;
        doctor.id = doctor._id;
        let doctor = Doctor.create(doctor);

        return Ok(res, "Request Successful", doctor);
    }catch(error){
        return ErrorResponse(res,error.message,error)
    }
});

router.get("/:id",doctorsHelper.getDoctorById);

router.delete("/delete/:id",(req,res,next)=>{
    Doctor.remove({_id:req.params.id}).then((result)=>{
        res.status(200).json({result});
    }).catch((err)=>{
        res.status(500).json({
            error:err
        })
    })
})

router.get("/organization/:id",doctorsHelper.getDoctorByOrganizationId);

module.exports = router;