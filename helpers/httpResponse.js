module.exports.Ok = (res,message,body)=>{
    return res.status(200).json({
        "statusCode": 200,
        "success": true,
        "message": message,
        "body": body
    });
}

module.exports.ErrorResponse = (res,message,body)=>{
    return res.status(500).json({
        "statusCode": 500,
        "success": false,
        "message": message,
        "body": body
    });
}

module.exports.notModified = (res, message, body) =>{
    return res.status(200).json({
        "statusCode": 304,
        "success": true,
        "message": message,
        "body": body
    });
}
module.exports.notFound = (res, message, body)=>{
    return res.status(200).json({
        "statusCode": 204,
        "success": true,
        "message": message,
        "body": body
    });
}