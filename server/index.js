const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const ToolModel = require('./models/Tool')
const PORT = 3001

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://vuk9dm:vuk9dm@toolrental.q30ut.mongodb.net/tools?retryWrites=true&w=majority", {
    useNewUrlParser: true,
})

app.post("/insert", async (req, res) => {
    const toolName = req.body.toolName
    const toolCount = req.body.toolCount

    const tool = new ToolModel({toolName: toolName, toolCount: toolCount})

    try {
        await tool.save()
        res.send("inserted data")
    } catch(err) {console.log(err)}

})
//$where: {toolName: "HDMI"}
app.get("/read", async (req, res) => {
    ToolModel.find({}, (err, result) =>{
        if(err){res.send(err)}

        res.send(result)

    })
})

app.put("/update", async (req,res) => {
    const id = req.body.id
    
    try {
        await ToolModel.findById(id, (err,updatedTool) => {
            updatedTool.toolName = req.body.toolName
            updatedTool.toolCount = req.body.toolCount

            updatedTool.save()
            res.send("updated")
        })
    } catch(err) {console.log(err)}
})

app.put("/lend", async (req,res)=>{
    const id = req.body.id

    try{
        await ToolModel.findById(id, (err,updatedTool) =>{
            updatedTool.toolCount=req.body.toolCount

            updatedTool.save()
            res.send("updated")
        })

    } catch(err) {console.log(err)}
})

app.put("/return", async (req,res)=>{
    const id = req.body.id

    try{
        await ToolModel.findById(id, (err,updatedTool) =>{
            updatedTool.toolCount=req.body.toolCount

            updatedTool.save()
            res.send("updated")
        })

    } catch(err) {console.log(err)}
})

app.delete("/delete/:id", async (req, res) =>{
    const id = req.params.id

    await ToolModel.findByIdAndRemove(id)
})

app.listen(PORT, ()=>{
    console.log('Server running on port ' + PORT)
})