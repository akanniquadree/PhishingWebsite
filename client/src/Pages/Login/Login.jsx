import "./login.css"
import axios from "axios"
import { useState ,useContext} from "react"
import { UserContext } from "../../Context/Action"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [disable, setDisable] = useState(false)
  const {state, dispatch} = useContext(UserContext)

  const postData = async() =>{
    try {
      const res = await axios.post("http://localhost:8000/api/signin",{password, email})
      
        if(res){
        localStorage.setItem("token", res.data.tokenHeader)
        localStorage.setItem("user", JSON.stringify(res.data.others))
        setDisable(false)
        dispatch({type:"USER", payload:res.data.others})
        window.location.replace("/admin")
      }
    } catch (error) {
      console.log(error)
      setDisable(false)
      setError(error.response.data.error)

    }console.log(error)
  }
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginRight">
              <img src="/images/bg.jpg" alt="" className="loginImage" />
            </div>
            <div className="loginLeft">
                <div className="loginBox">
                  
                    <input type="text" placeholder="Enter Your Email" value={email} className="loginInput"  onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input type="password" placeholder="Enter Your Password" value={password} className="loginInput" onChange={(e)=>{setPassword(e.target.value)}} />
                    <button className="loginButton" disabled={disable} onClick={()=>{postData(); setDisable(true)}}>Log In</button>
                     <span className="loginForgot" style={{color:"red"}}>{error}</span>
                     <span className="loginForgot">Forgot Password</span>
                </div>
            </div>
        </div>
    </div>
  )
}
