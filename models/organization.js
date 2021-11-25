const mongoose = require("mongoose");

let organizationSchema = mongoose.Schema({
    name: { type: String },
    id: { type: Number },
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
    town: String,
    city: String,
    logo: { type: String },
    appointment: [{ type: String }],
    startTime:Date,
    endTime:Date,
    doctor: [{ type: String }],
    chamber: [{ type: String }]
});

module.exports = mongoose.model("Organization", organizationSchema);
