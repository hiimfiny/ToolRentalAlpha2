const mongoose = require('mongoose')

const ToolSchema = new mongoose.Schema({
    toolName:{
        type: String,
        required: true,
    },
    toolCount:{
        type: Number,
        required: true,
    },
    toolMaxCount:{
        type: Number,
        required: true,
    },
    toolRentCount:{
        type: Number,
        required: true,
    },
    toolDesc:{
        type: String,
    },
    toolImg:{
        type: String,
    }
})

const Tool = mongoose.model("Tool", ToolSchema)
module.exports = Tool