import "./webCre.css"
import { useState } from "react"
import axios from "axios"


export default function WebCre() {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [disable, setDisable] = useState(false)

  const postData = async() =>{
    try {
      const {data} = await axios.post("http://localhost:8000/api/create",{name, url},{headers:{
        "authorization":"Bearer " + localStorage.getItem("token")
      }})
      if(data){
        if(!/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm.test(url)){
          setError("Make sure your url start with www.")
          return
        }
        if(data.message){
          setMessage(data.message)
          setDisable(false)
          window.location.replace("/website")
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
       <div className="websiteWrapper">
           <div className="userContainer">
               <span className="userTitle">Creat Website Url</span>
               <input placeholder="Enter Name" className="userInput" onChange={(e)=>{setName(e.target.value)}} required/>
               <input placeholder="Enter Website Url" className="userInput" onChange={(e)=>{setUrl(e.target.value)}} required/>
               <button className="userButton" onClick={()=>{postData(); setDisable(true)}} disabled={disable} >Create Website</button>
               {error && <span style={{color:"red", textAlign:"center", fontSize:"15px", marginTop:"10px"}}>Error: {error}</span>}
               {message && <span className="success">Success: {message}</span>}
           </div>
       </div>
    </div>
  )
}
