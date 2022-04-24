const mongoose = require('mongoose')

const ToolSchema = new mongoose.Schema({
    toolName:{
        type: String,
        required: true,
    },
    toolCount:{
        type: Number,
        required: true,
    }
})

const Tool = mongoose.model("Tool", ToolSchema)
module.exports = Tool