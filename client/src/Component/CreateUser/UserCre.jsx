import "./userCre.css"
import {useState} from "react"
import axios from "axios"

export default function UserCre() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(0)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [disable, setDisable] = useState(false)
  const postData = async() =>{
    try {
      const {data} = await axios.post("http://localhost:8000/api/register",{name, email, isAdmin, password},{headers:{
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

    <div className="user">
       <div className="userWrapper">
           <div className="userContainer">
               <span className="userTitle">Add A Admin</span>
               <input placeholder="Enter Admin Name" className="userInput"  value={name} onChange={(e)=>{setName(e.target.value)}}/>
               <input placeholder="Enter Admin Email" className="userInput" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
               <input placeholder="Enter Admin Password"  type="password" className="userInput" value={password}  onChange={(e)=>{setPassword(e.target.value)}}/>
               <select className="userInput" id="isAdmin" value={isAdmin} onChange={(e)=>{setIsAdmin(e.target.value)}}>
                  <option value="" disabled>Choose a Role</option>
                 <option value={1}>Admin</option>
                 <option value={0}>User</option>
               </select>
               <button className="userButton" onClick={()=>{postData(); setDisable(true)}} disabled={disable}>Create Admin</button>
               {error && <span style={{color:"red", textAlign:"center", fontSize:"15px", marginTop:"10px"}}>Error: {error}</span>}
               {message && <span className="success">Success: {message}</span>}
           </div>
       </div>
    </div>
  )
}
