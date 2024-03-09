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
    task: {
        type: String,
        required: true
    },


})
const collection = new mongoose.model("task", regschema)
module.exports = collection;