import { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';
import UserTool from './components/UserTool';

function User() {

  const [toolList, setToolList] = useState([])

  const refreshList = () => {
    Axios.get("http://localhost:3001/read").then((response)=>{
      setToolList(response.data)
    }) 
  }

  useEffect(()=>{
    refreshList()
  }, [])

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
    <div className="App">
      <h1>Tool Rental</h1>

      <h1>List</h1>
      {toolList.map((value,key)=>{
        return <div>
          <UserTool name={value.toolName} count={value.toolCount} maxcount={value.toolMaxCount}
                rentcount={value.toolRentCount} desc={value.toolDesc} img={value.toolImg} id={value._id} 
                onRent={placeRent}/>
        </div>

      })}
    </div>
  );
}

export default User;