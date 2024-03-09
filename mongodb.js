const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/admin")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log("error");
    })

const regschema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    cemail: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },


})
const collection = new mongoose.model("details", regschema)
module.exports = collection;