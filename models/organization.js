const mongoose = require("mongoose");

let organizationSchema = mongoose.Schema({
    name: { type: String },
    organization_Id: { type: Number },
    details: { type: String },
    accountType: { type: Number },
    contactNumber: { type: String },
    email: { type: String },
    website: { type: String },
    address: { type: String },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true,
          default: 'Point'
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    town: { type: mongoose.Schema.Types.ObjectId, ref: "Town" },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
    logo: { type: String },
    appointment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    startTime:Date,
    endTime:Date,
    doctor: [{ ref: "Doctor", type: mongoose.Schema.Types.ObjectId }],
    chamber: [{ type: mongoose.Schema.Types.ObjectId , ref: "Chamber"}]
});

module.exports = mongoose.model("Organization", organizationSchema);
