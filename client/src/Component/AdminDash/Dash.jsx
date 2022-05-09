import "./Dash.css"
import axios from "axios"
import {useState, useEffect} from "react"
import TableDash from "../TableDash/TableDash"
import { Link } from "react-router-dom"

export default function Dash() {
    const [website, setWebsite] = useState([])
    const [user, setUser] = useState([])
  useEffect(()=>{
      const getPost = async() =>{
        const {data} = await axios.get("http://localhost:8000/api/website")
        if(data){
          setWebsite(data)
        }
      }
      const getUser = async() =>{
        const {data} = await axios.get("http://localhost:8000/api/user")
        if(data){
          setUser(data)
        }
      }
      getUser()
      getPost()
  },[website])
  return (
    <div className="dash">
        <div className="dashWrapper">
            <div className="dashTop">
                <Link to="/users" className="dashTopRight">
                        <h6 className="dashTopRightTitle">Number of Admin</h6>
                        <span className="dashTopRightTitle2"> {user.length}</span>
                </Link>
                <Link to="/website" className="dashTopLeft">
                        <h6 className="dashTopRightTitle">Number of Webiste Url</h6>
                        <span className="dashTopRightTitle2"> {website.length}</span>
                </Link>
                
            </div>
            <div className="dashBottom">
                <div className="dashBottomWrapper">
                    <h6 className="dashTopRightTitle3">Recent Website</h6>
                    <TableDash setWebsite={setWebsite} website={website}/>
                </div>
            </div>
        </div>
    </div>
  )
}
