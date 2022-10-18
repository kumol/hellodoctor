const mongoose = require("mongoose"); 
const doctorSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    fullName: { type: String },
    prefix: { type: String, default: "DR. " },
    bPrefix: { type: String, default: "ডাঃ " },
    bFirstName: String,
    bLastName: String,
    bFullName: String,
    id: { type: String },
    college: { type: String },
    email: { type: String },
    personalNumber: { type: String },
    contactNumber: { type: String },
    degrees: {
        type: [
            { 
                title: String,
                details: String,
                institute: String,
                country: String,
                subject: String 
            }
        ],
        default: []
    },
    chamber: [{ type: String }],
    image: { type: String },
    details: { type: String },
    experience: {
        type: [
            { 
                position: String,
                organization: String,
                organizationId: String,
                startDate: Date,
                endDate: Date,
                days: Number,
                workingPeriod: String,
                running: Boolean,
            }
        ],
        default: []
    },
    organizationId: {
        type: String
    },
    chamberOrg: {
        type: [{ type: String }],
        default: []
    },
    otp: {
        type: {
            createdAt: String, 
            otp: String,
            isUsed: Boolean
        },
        default: {
            createdAt: "",
            otp: "",
            isUsed: false 
        }
    },
    visitingCard: String,
    isAvailable: Boolean,
    city: { type: String },
    address: { type: String },
    roleId: { type: String } 
});
module.exports = mongoose.model("Doctor", doctorSchema);