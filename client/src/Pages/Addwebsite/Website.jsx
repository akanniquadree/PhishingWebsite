import WebCre from "../../Component/CreateWebsite/WebCre"
import SideBar from "../../Component/Sidebar/SideBar"
import Topbar from "../../Component/Topbar/Topbar"
import "./website.css"

export default function Website() {
  return (
      <>
        <Topbar/>
        <div className="website">
          <SideBar/>
          <WebCre/>  
        </div>
      </>
    
  )
}
