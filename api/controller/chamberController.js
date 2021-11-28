const { ErrorResponse, Ok } = require("../../helpers/httpResponse");
const Chamber = require("../../models/chamber");

module.exports = {
    addNewChamber: async(req,res,next)=>{
        try{
            let data = {...req.body};
            let {startDay, endDay, ...newChamber} = data;
            if(startDay && endDay){
                newChamber.startDay = startDay;
                newChamber.endDay = endDay;
                newChamber.dayRange = await generateDayRange(startDay, endDay);
            }else{
                newChamber.startDay = 0;
                newChamber.endDay = 6;
                newChamber.dayRange = await generateDayRange(0, 6);
            }
            newChamber.appointment = newChamber.appointment ? newChamber.appointment.length ? newChamber.appointment : [newChamber.appointment] : [];
            newChamber.dayRange = newChamber.dayRange ? newChamber.dayRange.length ? newChamber.dayRange : [newChamber.dayRange] : [];
            let chamber = new Chamber(newChamber);
            chamber.id = chamber._id;
            chamber = await Doctor.create(chamber);
            return Ok(res, "Successfully Saved", newChamber);
        }catch(error){
          return ErrorResponse(res, error.message , {"error": error});
        }
    },
    getChamber: async(req,res)=>{
        try{
            let limit = req.query.limit && Number(req.query.limit) > 0? Number(req.query.limit) : 10;
            let page = req.query.page && Number(req.query.page)>=0 ? Number(req.query.page) : 1;
            let chamber = page == 0 || limit == 0 ? [] : await chamber.find({}).skip(limit*(page-1)).limit(limit);
            let chamber ;
            Ok(res, "Successfully Saved", chamber)
        }catch(error){
            ErrorResponse(res, "Internal server error", error.message);
        }
    },

    updateChamber: async(re,res)=>{
        try{
            let {startDay, endDay, appointment, addAppointment, ...updateObj} = req.body;
            if(startDay && endDay){
                updateObj.startDay = startDay;
                updateObj.endDay = endDay;
                updateObj.dayRange = await generateDayRange(startDay, endDay);
            }
            let pushObj = {}, pullObj= {}, updateQuery = {};
            addAppointment ? appointment ? pushObj["appointment"] : pullObj["appointment"] : null;
            updateQuery["$push"] = pushObj;
            updateQuery["$pull"] = pullObj;
            updateQuery["$set"] = updateObj;

            let modified = await Chamber.updateOne({id: req.params.id}, updateQuery),
                updatedObj = modified.n ? await Chamber.findOne(id: req.params.id, {_id: 0}).lean() : {};
            return modified.n ? modified.nModified ? ok(res, "Successfully Updated", updatedObj) : notModified(res, "Not modified", {}) : notFound(res, "No Record Found", {});
        }catch(error){
            ErrorResponse(res, "Internal server error", {"message": error.message});
        }
    }
}

const generateDayRange = async (start,end)=>{
    let dayRange = [];
    if (start <= end) {
        for (; start <= end; start++) {
            dayRange.push(days[start].name);
        }
    } else {
        for (; start <= 6; start++) {
            dayRange.push(days[start].name);
        }
        for (i = 0; i <= end; i++) {
            dayRange.push(days[i].name);
        }
    }
} 