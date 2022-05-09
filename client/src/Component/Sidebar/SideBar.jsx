import "./sidebar.css"
import {Group,Dashboard, PersonAdd, Language, Public} from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../Context/Action"

function SideBar() {
  const history = useLocation()
  const {state, dispatch} = useContext(UserContext)
  return (
    <div className="sidebar">
      <div className="sidebarContainer">
        <ul className="sidebarList">
          <Link to="/admin">
            <li className={`sidebarListItem ${history.pathname === "/admin" ? "active" : ""}`}>
              <Dashboard className="sidebarIcon"/>
              <span className="sidebarListItemText">Dashboard</span>
            </li>
          </Link>
          {
            state && state.isAdmin === 1 &&
          <Link to="/create/user">
            <li className={`sidebarListItem ${history.pathname === "/create/user" ? "active" : ""}`}>
              <PersonAdd className="sidebarIcon"/>
              <span className="sidebarListItemText">Create User</span>
            </li>
          </Link>
          }
            <Link to="/create/website">
            <li className={`sidebarListItem ${history.pathname === "/create/website" ? "active" : ""}`}>
              <Language className="sidebarIcon"/>
              <span className="sidebarListItemText">Add Website</span>
            </li>
          </Link>
          
          {
            state && state.isAdmin === 1 &&
          <Link to="/users">
            <li className={`sidebarListItem ${history.pathname.startsWith("/users") ? "active" : ""}`}>
              <Group className="sidebarIcon"/>
              <span className="sidebarListItemText">View User</span>
            </li>
          </Link>
          }
          <Link to="/website">
            <li className={`sidebarListItem ${history.pathname.startsWith("/website") ? "active" : ""}`}>
              <Public className="sidebarIcon"/>
              <span className="sidebarListItemText">View Websites</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default SideBar