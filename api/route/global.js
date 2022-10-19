var express = require("express");
const router = express.Router();
const response = require("../../helpers/HttpResponse");
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.originalname.split(".")[1]);
    }
  })
  
const upload = multer({ storage: storage });

router.post("/file-upload", upload.array('file'),  (req,res)=>{
    try{
        let uploadFiles = [];
        req.files.map(f=>{

             uploadFiles.push(f.path);
        })
        return response.success(res, "files uploaded", uploadFiles);
    }catch(err){
        console.log(err);
        return response.errorResponse(res, err.message, err.stack);
    }
});

module.exports = router;