import SideBar from "../../Component/Sidebar/SideBar"

import Topbar from "../../Component/Topbar/Topbar"
import "./viewUser.css"
import {useState, useEffect} from "react"
import axios from "axios"
import Table from "../../Component/TableUser/Table"

export default function ViewUser() {
  const [user, setUser] = useState([])
  useEffect(()=>{
      const getPost = async() =>{
        const {data} = await axios.get("http://localhost:8000/api/user")
        if(data){
          setUser(data)
        }
      }
      getPost()
  },[user])
  return (
      <>
        <Topbar/>
        <div className="view">
            <SideBar/>
            <Table user={user} setUser={setUser}/>
        </div>
      </>
    
  )
}
