import UserCre from "../../Component/CreateUser/UserCre"
import SideBar from "../../Component/Sidebar/SideBar"
import Topbar from "../../Component/Topbar/Topbar"
import "./Create.css"

export default function Create() {
  return (
    <>
        <Topbar/>
        <div className="create">
            <SideBar/>
            <UserCre/>
        </div>
    </>
  )
}
