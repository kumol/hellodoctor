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
    town: { type: mongoose.Schema.Types.ObjectId, ref: "Town" },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
    appointment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    doctor: { ref: "Doctor", type: mongoose.Schema.Types.ObjectId },
});

module.exports = mongoose.model("Chamber", chamberSchema);
