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

//Eszköz hozzáadása az adatbázishoz
app.post("/insert", async (req, res) => {
    
    const toolName = req.body.toolName
    const toolCount = req.body.toolCount
    const toolMaxCount = req.body.toolMaxCount
    const toolRentCount = req.body.toolRentCount
    const toolDesc = req.body.toolDesc
    const toolImg = req.body.toolImg

    const tool = new ToolModel({toolName: toolName, toolCount: toolCount, toolMaxCount: toolMaxCount,
        toolRentCount: toolRentCount, toolDesc: toolDesc, toolImg: toolImg})

    try {
        await tool.save()
        res.send("inserted data")
    } catch(err) {console.log(err)}

})


//Összes eszköz kilistázása
app.get("/read", async (req, res) => {
    ToolModel.find({}, (err, result) =>{
        if(err){res.send(err)}

        res.send(result)
    })
})

//Egy eszköz kiírása
app.get("/:id", async (req,res)=>{
    const id = req.params.id

    console.log(id)
    try{
        await ToolModel.findById(id,(err,result) =>{
            res.send(result)
        })

    }catch(err) {console.log(err)}
})

//Egy tool módosítása
app.put("/update", async (req,res) => {
    const id = req.body.id
    
    try {
        await ToolModel.findById(id, (err,updatedTool) => {
            updatedTool.toolName = req.body.toolName
            updatedTool.toolCount = req.body.toolCount
            updatedTool.toolMaxCount = req.body.toolMaxCount
            updatedTool.toolRentCount = req.body.toolRentCount
            updatedTool.toolDesc = req.body.toolDesc
            updatedTool.toolImg = req.body.toolImg
            updatedTool.save()
            res.send("updated")
        })
    } catch(err) {console.log(err)}
})

app.put("/rent", async (req,res)=>{
    const id = req.body.id

    try{
        await ToolModel.findById(id, (err,updatedTool) =>{
            updatedTool.toolRentCount=req.body.toolRentCount

            updatedTool.save()
            res.send("updated")
        })

    } catch(err) {console.log(err)}
})

//Eszköz kiadása
app.put("/lend", async (req,res)=>{
    const id = req.body.id

    try{
        await ToolModel.findById(id, (err,updatedTool) =>{
            updatedTool.toolCount=req.body.toolCount
            updatedTool.toolRentCount=req.body.toolRentCount

            updatedTool.save()
            res.send("updated")
        })

    } catch(err) {console.log(err)}
})

//Eszköz visszavétele
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

//Eszköz törlése
app.delete("/delete/:id", async (req, res) =>{
    const id = req.params.id

    await ToolModel.findByIdAndRemove(id)
})

app.listen(PORT, ()=>{
    console.log('Server running on port ' + PORT)
})