import {useState, useEffect} from "react"
import SideBar from "../../Component/Sidebar/SideBar"
import Table from "../../Component/Table/Table"
import Topbar from "../../Component/Topbar/Topbar"
import "./viewWeb.css"
import axios from "axios"
export default function ViewWebsite() {
  const [website, setWebsite] = useState([])
  useEffect(()=>{
      const getPost = async() =>{
        const {data} = await axios.get("http://localhost:8000/api/website")
        if(data){
          setWebsite(data)
        }
      }
      getPost()
  },[website])
  return (
      <>
        <Topbar/>
        <div className="view">
            <SideBar/>
            <Table setWebsite={setWebsite} website={website}/>
        </div>
      </>
    
  )
}
