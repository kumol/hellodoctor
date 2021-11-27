const { ErrorResponse, Ok } = require("../../helpers/httpResponse")

module.exports = {
    addNewChamber: async(req,res) => {
        try{
            let chamber ;
            Ok(res, "Successfully Saved", chamber)
        }catch(error){
            ErrorResponse(res, "Internal server error", error.message);
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
    }
    
}