const mongoose = require("mongoose");

let chamberSchema = mongoose.Schema({
    name: { type: String },
    organizationId: { type: Number },
    details: { type: String },
    accountType: { type: Number },
    contactNumber: { type: String },
    email: { type: String },
    website: { type: String },
    address: { type: String },
    district: { type: mongoose.Schema.Types.ObjectId, ref: "District" },
    division: { type: mongoose.Schema.Types.ObjectId, ref: "Division" },
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
    logo: { type: String },
    appointment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    startTime:Date,
    endTime:Date,
    totalPatient:Number,
    doctor: { ref: "Doctor", type: mongoose.Schema.Types.ObjectId }
});

module.exports = mongoose.model("Chamber", chamberSchema);