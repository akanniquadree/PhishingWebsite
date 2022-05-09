import UserCre from "../../Component/CreateUser/UserCre"
import UserEdit from "../../Component/EditUser/UserEdit"
import SideBar from "../../Component/Sidebar/SideBar"
import Topbar from "../../Component/Topbar/Topbar"
import "./editCreate.css"

export default function EditCreate() {
  return (
    <>
        <Topbar/>
        <div className="create">
            <SideBar/>
            <UserEdit/>
        </div>
    </>
  )
}
