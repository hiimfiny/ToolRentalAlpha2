import { useState, useEffect } from "react"
import { FaPen,FaTimes } from "react-icons/fa"
import { HiUpload, HiDownload, HiQrcode } from "react-icons/hi"

import QRCode from 'qrcode'



const Tool = ({name, count, maxcount, rentcount, desc, img, id, onUpdate, onDelete, onLendOut, onReturn, onGet}) => {

    const [showEdit, setShowEdit] = useState(false)
    const [showQR, setShowQR]= useState(false)

    const [toolName, setToolName] = useState(name)
    const [toolCount, setToolCount] = useState(count)
    const [toolMaxCount, setMaxToolCount] = useState(maxcount)
    const [toolRentCount, setRentToolCount] = useState(rentcount)
    const [toolDesc, setToolDesc] = useState(desc)
    const [toolImg, setToolImg] = useState(img)
    const [src, setSrc] = useState('')
    const btnsize = 15
    const oldmax = maxcount
    
    useEffect(() => {
        const url="http://localhost:3000/tool/"+id
        QRCode.toDataURL(url).then((data) => {
            setSrc(data)
        })
    }, [])

  return (
    <div>
        <div className="list">
        <img src={img}></img>
        <h2>{name}</h2>
        
        <div>
            <p>Max number of tools - {maxcount}</p>
            <p>Available number of tools - {count}</p>
            <p>Number of requested rents - {rentcount}</p>
        </div>
        <FaPen title="Edit" size={btnsize} onClick={()=>{setShowEdit(!showEdit)}}>/</FaPen>
        <FaTimes title="Delete" size={btnsize} onClick={()=>{onDelete(id)}}></FaTimes>
        <HiQrcode title="Show QR" size={btnsize} onClick={()=>{
            setShowQR(!showQR)
            onGet(id)
            }}></HiQrcode>    
        <HiUpload title="Lend out" size={btnsize} onClick={()=>{onLendOut(count, rentcount, id)}}></HiUpload>
        <HiDownload title="Return" size={btnsize} onClick={()=>{onReturn(count, maxcount, id)}}></HiDownload> 
            
    </div>
        
        {showQR && <div>
            <img src={src}></img>
        </div>}
        
        {showEdit && <div className="editTool">
            <label>Name:</label>
            <input type='text' placeholder={name}
                onChange={(event) => {setToolName((event.target.value)==='' ? name : event.target.value )}}/>
            <label>Max Count:</label>
            <input type='number' placeholder={maxcount}
                onChange={(event) => {
                    
                    const newmax = (event.target.value)===0 ? maxcount : event.target.value
                    console.log("oldmax:" + oldmax)
                    setMaxToolCount(newmax)
                    setToolCount(newmax-oldmax+count)
                    
                }}/>
            
            <label>Description:</label>
            <input type='text' placeholder={desc}
                onChange={(event) => {setToolDesc((event.target.value)==='' ? desc : event.target.value )}}/>
            <label>Image:</label>
            <input type='text' placeholder={img}
                onChange={(event) => {setToolImg((event.target.value)==='' ? img : event.target.value )}}/>
            
            <button onClick={()=>{
                
                onUpdate({
                name: toolName, 
                count: toolCount,
                maxcount: toolMaxCount,
                rentcount: toolRentCount, 
                desc: toolDesc, 
                img: toolImg, 
                id: id
                }
            )}}>Update</button>
        </div>}
            
    </div>
  )
}

export default Tool