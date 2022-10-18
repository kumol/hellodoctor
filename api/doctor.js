var express = require("express");
const response = require("../helpers/HttpResponse");
const Doctor = require("../models/doctor"); 
const chamberController = require("./controller/chamberController"); 
const doctorsHelper = require("./controller/doctorController");
var router = express.Router(); 
router.get("/all", async (req, res) => {
    try {         
        let limit = req.query.limit && Number(req.query.limit) > 0 ? Number(req.query.limit) : 10;
        let page = req.query.page && Number(req.query.page) >= 0 ? Number(req.query.page) : 1;
        let doctor = page == 0 || limit == 0 ? [] : await Doctor.find({}).skip(limit * (page - 1)).limit(limit); 
        let total = await Doctor.countDocuments();
        return response.success(res, "Request Successful", doctor, {
            total: total,
            page: page,
            limit: limit
        });
    } catch (error) {
        return response.errorResponse(res, error.message, error)     
    }
});  
router.post("/save", async (req, res, next) => {
    try {
        let newDoctor = { ...req.body };
        newDoctor.experience = newDoctor.experience ? newDoctor.experience.length ? newDoctor.experience : [newDoctor.experience] : [];
        newDoctor.degrees = newDoctor.degrees ? newDoctor.degrees.length ? newDoctor.degrees : [newDoctor.degrees] : []; 
        let doctor = new Doctor(newDoctor);
        doctor.fullName = doctor.prefix + doctor.firstName + " " + doctor.lastName;
        doctor.bFullName = doctor.bPrefix + doctor.bFirstName + " " + doctor.bLastName;
        doctor.id = doctor._id;
        doctor = await Doctor.create(doctor);
        return response.created(res, "Request Successful", doctor);
    } catch (error) {
        return response.errorResponse(res, error.message, error)
    } 
});
router.get("/single/:id", doctorsHelper.getDoctorById);
router.put("/update/:id", async (req, res, next) => {
    try { 
        let { degree, experience, chamber, isDegreeUpdate, isExperienceUpdate, isDegreeRemove, isExperienceRemove, isChamberRemove, degreeId, experienceId, ...restData } = req.body;
        let query = {}, updateQuery = {}, pullObj = {}, pushObj = {};
        query.id = req.params.id;
        degreeId && isDegreeUpdate && !isExperienceUpdate ? query["degrees"] = { $elemMatch: { "_id": degreeId } } : null;
        experienceId && isExperienceUpdate && !isDegreeUpdate ? query["experience"] = { $elemMatch: { _id: experienceId } } : null;
        // Generating $set, $pull, $push query         
        chamber ? isChamberRemove ? pullObj["chamber"] = chamber : pushObj["chamber"] = chamber : null;
        degree ? isDegreeRemove && degreeId ? pullObj["degrees"] = { "_id": degreeId } : !degreeId && !isDegreeRemove ? pushObj["degrees"] = degree : null : null; 
        experience ? isExperienceRemove && experienceId ? pullObj["experience"] = { "_id": experienceId } : !experienceId && !isExperienceRemove ? pushObj["experience"] = experience : null : null;  
        updateQuery["$pull"] = pullObj,
        updateQuery["$push"] = pushObj 
        isDegreeUpdate && degreeId && degree ? Object.entries(degree).map(([k, v]) => {
            
            data[`degrees.$.${k}`] = v;
        }) : null;
        isExperienceUpdate && experienceId && experience ? Object.entries(experience).map(([k, v]) => {
            data[`experience.$.${k}`] = v;
        }) : null;
        updateQuery["$set"] = data;
        let modified = await Doctor.updateOne(query, updateQuery),
        updatedObj = modified.n ? await Doctor.findOne(query, { _id: 0 }).lean() : {}; 
        return modified.n ? modified.nModified ? response.success(res, "Successfully Updated", updatedObj) : response.notModified(res, "Not modified", {}) : response.notFound(res, "No Record Found", {});
    } catch (error) {
        return response.errorResponse(res, error.message, error);
    } 
})  
router.delete("/delete/:id", async (req, res, next) => {
    try {
        let deleteOne = await Doctor.deleteOne({ id: req.params.id })
        return response.success(res, "Request Successful", { "msg": "Object deleted" });
    } catch (error) {         return response.errorResponse(res, error.message, error);
    }
})  
router.get("/organization/:id", doctorsHelper.getDoctorByOrganizationId);
router.post("/chamber/", chamberController.addNewChamber);
router.get("/chamber/",)
module.exports = router; 
router.post("/organization/chamber/", chamberController.addNewChamber);
router.put("/organization/chamber/:id", chamberController.updateChamber); 
router.delete("/organization/chamber/:id", chamberController.deleteChamber); 
module.exports = router;