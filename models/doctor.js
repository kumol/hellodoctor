const mongoose = require("mongoose");
const doctorSchema = mongoose.Schema({
        name: { type: String },
    bname: { type: String },
    doctorId: { type: String },
    address: { type: String },
    college: { type: String },
    email: { type: String },
    contactNumber: { type: String },
    degrees: [
        {
            title: String,
            details: String,
            institute: String,
            country: String,
            topic: String,
        }
    ],
    chamber: [{ 
        startDay: String,
        endDay: String,
        dayRange: [{ type: String }],
        timeRange: String,
        chamberId: {type: mongoose.Schema.Types.ObjectId, ref: "Chamber"},
        numberOfAppointment: Number,
        appointment: [{type: mongoose.Schema.Types.ObjectId, ref: "Appointment"}]
    }],
    image: { type: String },
    details: { type: String },
    experience:[
        {
            position: String,
            organization: String,
            startDate: Date,
            endDate: Date,
            days: Number,
            workingPeriod: String,
            running: Boolean,
        }
    ]
});

module.exports = mongoose.model("Doctor", doctorSchema);
