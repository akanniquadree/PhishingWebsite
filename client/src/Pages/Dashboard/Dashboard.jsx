import "./dashboard.css"
import {useState, useEffect} from "react"
import axios from "axios"
import {useParams} from "react-router-dom"
import SideBar from "../../Component/Sidebar/SideBar"
import Topbar from "../../Component/Topbar/Topbar"
import Dash from "../../Component/AdminDash/Dash"

export default function Dashboard() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(0)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [disable, setDisable] = useState(false)
  const [url, setUrl] = useState(false)
  const {id} = useParams()
  useEffect(()=>{
    const getUser = async() =>{
      const {data} = await axios.get(`http://localhost:8000/api/users/${id}`,{headers:{"authorization":"Bearer " + localStorage.getItem("token")}} )
        if(data){
          setName(data.name)
          setEmail(data.email)
          setPassword(data.password)
          setIsAdmin(data.isAdmin)
          setUrl(true)
        }
    }
    getUser()
  },[])
  const postData = async() =>{
    try {
      const {data} = await axios.put(`http://localhost:8000/api/user/${id}`,{name, email, isAdmin, password},{headers:{
        "authorization":"Bearer " + localStorage.getItem("token")
      }})
      if(data){
        if(data.message){
          setMessage(data.message)
          setDisable(false)
          window.location.replace("/users")
        }
      }
    } catch (error) {
      console.log(error)
      setDisable(false)
      setError(error.response.data.error)
    }
  }
  return (
      <>
        <Topbar/>
        <div className="dashboard">
            <SideBar/>
            <Dash/>
        </div>
      </>
    
  )
}