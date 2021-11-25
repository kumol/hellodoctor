const mongoose = require("mongoose");

let districtSchema = mongoose.Schema({
    name: String,
    city: {type: String}
});

module.exports = mongoose.model("Town", districtSchema);