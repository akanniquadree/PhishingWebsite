import WebEdit from "../../Component/EditWebsite/WebEdit"
import SideBar from "../../Component/Sidebar/SideBar"
import Topbar from "../../Component/Topbar/Topbar"
import "./websiteEdit.css"


export default function WebsiteEdit() {
  
  return (
      <>
        <Topbar/>
        <div className="website" >
          <SideBar/>
          <WebEdit />  
        </div>
      </>
    
  )
}
