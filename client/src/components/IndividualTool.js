import React from 'react'
import Axios from 'axios'
import { useState } from 'react';
import { HiUpload, HiDownload } from "react-icons/hi"


const IndividualTool = () => {
    const id = window.location.href.substring(27)
    const [toolName, setToolName] = useState('')
    const [toolCount, setToolCount] = useState(0)
    const [toolMaxCount, setMaxToolCount] = useState(0)
    const [toolRentCount, setRentToolCount] = useState(0)
    const [toolDesc, setToolDesc] = useState('')
    const [toolImg, setToolImg] = useState('')
    const btnsize = 15

    const getTool = (id) => {
        Axios.get(`http://localhost:3001/${id}`).then((response)=>{
            console.log(response.data)
            setToolName(response.data.toolName)
            setToolCount(response.data.toolCount)
            setMaxToolCount(response.data.toolMaxCount)
            setRentToolCount(response.data.toolRentCount)
            setToolDesc(response.data.toolDesc)
            setToolImg(response.data.toolImg)
        })
      }

      getTool(id)
  
      const lendTool = (count, rentcount, id) =>{
        if(count===0){
          alert("No tools remaining!")
        }
        else if(rentcount ===0){
          alert("No rent placed")
        }
        else{
        Axios.put("http://localhost:3001/lend", {
          id: id,
          toolCount: count-1,
          toolRentCount: rentcount-1
        })
      }
        window.location.reload(false);
      }
    
      const returnTool = (count, maxcount, id) =>{
        if(count===maxcount){
          alert("Tool already maxed out")
        }
        else{
          Axios.put("http://localhost:3001/return", {
            id: id,
            toolCount: count+1
          })

          window.location.reload(false);
        }
      }

    return (
    <div className="list">
      <img src={toolImg}></img>
      <h2>{toolName}</h2>
      
      <div>
          <p>Max number of tools - {toolMaxCount}</p>
          <p>Available number of tools - {toolCount}</p>
          <p>Number of requested rents - {toolRentCount}</p>
      </div>

      <HiUpload title="Lend out" size={btnsize} onClick={()=>{lendTool(toolCount, toolRentCount, id)}}></HiUpload>
      <HiDownload title="Return" size={btnsize} onClick={()=>{returnTool(toolCount, toolMaxCount, id)}}></HiDownload>
    </div>
  )
}

export default IndividualTool