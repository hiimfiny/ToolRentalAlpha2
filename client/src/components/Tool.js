import { useState, useEffect } from "react"
import { FaPen,FaTimes } from "react-icons/fa"
import { HiUpload, HiDownload, HiQrcode } from "react-icons/hi"

import QRCode from 'qrcode'



const Food = ({name, count, id, onUpdate, onDelete, onLendOut, onReturn}) => {
    const [showEdit, setShowEdit] = useState(false)
    const [showQR, setShowQR]= useState(false)

    const [toolName, setToolName] = useState(name)
    const [toolCount, setToolCount] = useState(count)
    const btnsize = 15

    const [src, setSrc] = useState('')
    useEffect(() => {
        QRCode.toDataURL(id).then((data) => {
            setSrc(data)
        })
    }, [])

  return (
    <div>
        <div className="list">
        <h2>{name} - {count}</h2>
            <FaPen title="Edit" size={btnsize} onClick={()=>{setShowEdit(!showEdit)}}>/</FaPen>
            <FaTimes title="Delete" size={btnsize} onClick={()=>{onDelete(id)}}></FaTimes>
            <HiQrcode title="Show QR" size={btnsize} onClick={()=>{setShowQR(!showQR)}} ></HiQrcode>
            {/* 
            <HiUpload title="Lend out" size={btnsize} onClick={()=>{onLendOut(count, id)}}></HiUpload>
            <HiDownload title="Return" size={btnsize} onClick={()=>{onReturn(count, id)}}></HiDownload> 
            */}
        </div>
        
        {showQR && <div>
            <img src={src}></img>
        
        </div>}
        
        {showEdit && <div className="editTool">
            <label>Name:</label>
            <input type='text' placeholder={name}
                onChange={(event) => {setToolName((event.target.value)==='' ? name : event.target.value )}}/>
            <label>Count:</label>
            <input type='number' placeholder={count}
                onChange={(event) => {setToolCount((event.target.value)===0 ? count : event.target.value)}}/>
            <button onClick={()=>{onUpdate(toolName, toolCount, id)}}>Update</button>
        </div>}
            
        
    </div>
  )
}

export default Food