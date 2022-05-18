import React from 'react'
import Axios from 'axios'
import { useState } from 'react';
import { HiUpload } from "react-icons/hi"


const IndividualTool = () => {
    const id = window.location.href.substring(31)
    console.log(id)
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
  
      const placeRent = (count, rentcount, id) => {
        if(count === 0 || count === rentcount ){
          alert("No tools remaining!")
        }
        else{
          Axios.put("http://localhost:3001/rent",{
            id: id,
            toolRentCount: rentcount+1
          })
        }
      }

    return (
        <div className="list">
        <img src={toolImg}></img>
        <h2>{toolName}</h2>
        
        <div>
            <p>Available number of tools - {toolCount}</p>
            <p>{toolDesc}</p>
        </div>  
        <HiUpload title="Lend out" size={btnsize} onClick={()=>{placeRent(toolCount, toolRentCount, id)}}></HiUpload>
    </div>
  )
}

export default IndividualTool