import "./topbar.css"
import {Person, Notifications, ExitToApp} from "@material-ui/icons"
import { useContext } from "react"
import { UserContext } from "../../Context/Action"

function Topbar() {
    const {state, dispatch} = useContext(UserContext)
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <img src="" className="logo" alt=""/>
        </div>
        
        <div className="topbarRight">
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <Person className="searchIcon"/>
                </div>
                <div className="topbarIconItem">
                    <Notifications className="searchIcon"/>
                    <span className="topIconBadge">3</span>
                </div>
                <div className="topbarIconItem">
                    <ExitToApp className="searchIcon" onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        window.location.replace("/login")
                    }}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Topbar