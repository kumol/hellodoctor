const mongoose = require("mongoose");
const appointmentSchema = mongoose.Schema({
    date: { type: String, required: true},
    time: { type: String, required: true},
    organization: String,
    doctor: { type: String, required: true},
    user: { type: String, required: true},
    chamber: { type: String, required: true},
    isActive: { type: Boolean },
    isPaid: { type: Boolean , default: false},
    status: { type: String, required: true, default: "new" , enum: ['new', 'paid', 'active', 'onpaid']}
});

module.exports = mongoose.model("Appointment", appointmentSchema);
