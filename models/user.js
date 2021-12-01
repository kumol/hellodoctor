const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: { type: String, default: "", required: true},
    id: { type: String},
    password: { type: String, required: true},
    city: String,
    location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true,
          default: 'Point'
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    number: { type: String , default: ""},
    accountType: { type:Number , default: 1, enum: [1,2,3]},
    email: { type: String , default: ""},
    appointment: String
});

module.exports = mongoose.model("User",userSchema);
