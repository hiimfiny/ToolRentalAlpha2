import { useState, useEffect } from "react"
import { HiUpload, HiQrcode } from "react-icons/hi"

import QRCode from 'qrcode'


const UserTool = ({name, count, maxcount, rentcount, desc, img, id, onRent}) => {

    const [showQR, setShowQR]= useState(false)
    const btnsize = 15
    const [src, setSrc] = useState('')
    useEffect(() => {
        const url="http://localhost:3000/usertool/"+id
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
            <p>Available number of tools - {count}</p>
            <p>{desc}</p>
        </div>
        <HiQrcode title="Show QR" size={btnsize} onClick={()=>{
            setShowQR(!showQR)
            }  } ></HiQrcode>    
        <HiUpload title="Lend out" size={btnsize} onClick={()=>{onRent(count, rentcount, id)}}></HiUpload>

            
    </div>
    {showQR && <div>
        <img src={src}></img>
    </div>}

    </div>
  )
}

export default UserTool