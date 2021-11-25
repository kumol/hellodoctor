const mongoose = require("mongoose");

let chamberSchema = mongoose.Schema({
    title: { type: String },
    organizationId: { type: String },
    details: { type: String },
    startDay: String,
    endDay: String,
    dayRange: [{ type: String }],
    startTime: Date,
    endTime: Date,
    numberOfAppointment: Number,
    maxAppointment: Number,
    town: { type: String },
    city: { type: String },
    appointment: [{ type: String }],
    doctor: String,
});

module.exports = mongoose.model("Chamber", chamberSchema);
