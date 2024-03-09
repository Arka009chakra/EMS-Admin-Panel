const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/admin")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log("error");
    })

const regschema = new mongoose.Schema({
    cemail: {
        type: String,
        required: true
    },
    date1:
    {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    }


})
const collection = new mongoose.model("leave", regschema)
module.exports = collection;