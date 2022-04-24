import { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';
import Tool from './components/Tool';

function App() {
  const [toolName, setToolName] = useState('')
  const [toolCount, setToolCount] = useState(0)

  const [toolList, setToolList] = useState([])

  useEffect(()=>{
    Axios.get("http://localhost:3001/read").then((response)=>{
      setToolList(response.data)
    }) 
  }, [])

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {toolName: toolName, toolCount: toolCount})
    //TODO rendes refresh
    window.location.reload(false);
  }

  const updateTool = (name, count, id) => {
      Axios.put("http://localhost:3001/update", {
        id: id,
        toolName: name,
        toolCount: count
      })
      //TODO rendes refresh 
      window.location.reload(false);
    }
  

  const deleteTool = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
    console.log('delete:' + id)
    //TODO rendes refresh window.location.reload(false);
  }


  const lendTool = (count, id) =>{
    if(count===0){
      alert("No tools remaining!")
    }
    else{
    Axios.put("http://localhost:3001/lend", {
      id: id,
      toolCount: count-1
    })
  }
    //TODO rendes refresh 
    window.location.reload(false);
  }

  const returnTool = (count, id) =>{
    console.log(count)
    Axios.put("http://localhost:3001/return", {
      id: id,
      toolCount: count+1
    })
    //TODO rendes refresh 
    window.location.reload(false);
  }


  return (
    <div className="App">
      <h1>Tool Rental</h1>

      <label>Name:</label>
      <input type='text' placeholder='Enter the name of the tool'
        onChange={(event) => {setToolName(event.target.value)}} />
      <label>Count:</label>
      <input type='number' placeholder='Enter the number of tool(s)'
        onChange={(event) => {setToolCount(event.target.value)}} />
      <button onClick={addToList}>Add</button>

      <h1>List</h1>
      {toolList.map((value,key)=>{
        return <div>
          <Tool name={value.toolName} count={value.toolCount} id={value._id} 
                onUpdate={updateTool} onDelete={deleteTool} onLendOut={lendTool} onReturn={returnTool} />
        </div>

      })}
    </div>
  );
}

export default App;
