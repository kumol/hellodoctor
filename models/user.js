const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: { type: String, default: ""},
    id: { type: String},
    number: { type: String , default: ""},
    accountType: { type:Number , default: 1, enum: [1,2,3]},
    email: { type: String , default: ""},
    appointment: String
});

module.exports = mongoose.model("User",userSchema);
