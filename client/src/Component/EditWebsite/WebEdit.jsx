import "./webEdit.css"
import axios from "axios"
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

export default function WebEdit({website}) {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const {id} = useParams()
  const [disable, setDisable] = useState(false)
  const [validUrl, setValidUrl] = useState(false)
  useEffect(()=>{
    const getPost = async() =>{
      const {data} = await axios.get(`http://localhost:8000/api/website/${id}`)
      if(data){
        setUrl(data.url)
        setName(data.name)
        setValidUrl(true)
      }
    }
    getPost()
},[]) 
  const postData = async() =>{
    try {
      const {data} = await axios.put(`http://localhost:8000/api/update/${id}`,{name, url},{headers:{
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
      setError(error.response.data.error)
      setDisable(false)
    }
  }
  return (
    <div className="web">
      {
        validUrl ?
        <div className="websiteWrapper">
          <div className="webContainer">
              <span className="webTitle">Creat Website Url</span>
              <input placeholder="Enter Name" className="webInput" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
              <input placeholder="Enter Website Url" value={url} className="webInput"  onChange={(e)=>{setUrl(e.target.value)}} required />
              <button className="webButton" onClick={()=>{postData();setDisable(true)}} disabled={disable}>Update Website</button>
              {error && <span style={{color:"red", textAlign:"center", fontSize:"15px", marginTop:"10px"}}>Error: {error}</span>}
              {message && <span className="success">Success: {message}</span>}
          </div>
        </div>:
        <h3 style={{textAlign:"center"}}> Ooops Page Not found.... Go back to home Page</h3>
      }
      
       
    </div>
  )
}
