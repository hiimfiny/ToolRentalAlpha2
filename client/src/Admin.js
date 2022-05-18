import { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';
import Tool from './components/Tool';

function Admin() {
  const [toolName, setToolName] = useState('')
  const [toolCount, setToolCount] = useState(0)
  const [toolMaxCount, setMaxToolCount] = useState(0)
  const [toolRentCount, setRentToolCount] = useState(0)
  const [toolDesc, setToolDesc] = useState('')
  const [toolImg, setToolImg] = useState("https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640")

  const [toolList, setToolList] = useState([])

  const refreshList = () => {
    Axios.get("http://localhost:3001/read").then((response)=>{
      setToolList(response.data)
    }) 
  }

  useEffect(()=>{
    refreshList()
  }, [])

  const getTool = (id) => {
    Axios.get(`http://localhost:3001/${id}`).then((response)=>{
      console.log(response.data)
    })
    console.log('getting: ' + id)
  }

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {toolName: toolName, toolCount: toolCount, toolMaxCount: toolMaxCount,
    toolRentCount: toolRentCount, toolDesc: toolDesc, toolImg: toolImg})
    //TODO rendes refresh
    window.location.reload(false);
  }

  const updateTool = (tool) => {
      console.log(tool)
      Axios.put("http://localhost:3001/update", {
        id: tool.id,
        toolName: tool.name,
        toolCount: tool.count,
        toolMaxCount: tool.maxcount,
        toolRentCount: tool.rentcount,
        toolDesc: tool.desc,
        toolImg: tool.img
      })
      //TODO rendes refresh 
      window.location.reload(false);
    }
  

  
  
  const deleteTool = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
    console.log('delete:' + id)
    //TODO rendes refresh 
    window.location.reload(false);
  }


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
    //TODO rendes refresh 
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
      //TODO rendes refresh 
      window.location.reload(false);
    }
  }


  return (
    <div className="App">
      <h1>Tool Rental</h1>
        <div>
            <label>Name:</label>
            <input type='text' placeholder='Enter the name of the tool'
            onChange={(event) => {setToolName(event.target.value)}} />
        </div>
        <div>
            <label>Max Count:</label>
            <input type='number' placeholder='Enter the number of tool(s)'
            onChange={(event) => {
                setMaxToolCount(event.target.value)
                setToolCount(event.target.value)
                setRentToolCount(0)}} />
        </div>
        
        <div>
            <label>Descripton:</label>
            <input type='text' placeholder='Enter the description of the tool'
            onChange={(event) => {setToolDesc(event.target.value)}} />
        </div>
        <div>
            <label>Image:</label>
            <input type='text' placeholder='Enter the url of the image'
            onChange={(event) => {setToolImg(event.target.value)}} />
        </div>
      <button onClick={addToList}>Add</button>

      <h1>List</h1>
      {toolList.map((value,key)=>{
        return <div>
          <Tool name={value.toolName} count={value.toolCount} maxcount={value.toolMaxCount}
                rentcount={value.toolRentCount} desc={value.toolDesc} img={value.toolImg} id={value._id} 
                onUpdate={updateTool} onDelete={deleteTool} onLendOut={lendTool} onReturn={returnTool} onGet={getTool} />
        </div>

      })}
    </div>
  );
}

export default Admin;