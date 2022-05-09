import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useReducer , useEffect, useContext  } from "react";
import { UserContext} from "./Context/Action";
import Create from "./Pages/AddUser/Create";
import Website from "./Pages/Addwebsite/Website";
import EditCreate from "./Pages/EditUser/EditCreate";
import WebsiteEdit from "./Pages/Editwebsite/WebsiteEdit";
import Login from "./Pages/Login/Login";
import Search from "./Pages/Search/Search";
import ViewUser from "./Pages/ViewUsers/ViewUser";
import ViewWebsite from "./Pages/ViewWebsite/ViewWebsite";
import { initialState, Reducer} from "./Context/Reducer";
import Dashboard from "./Pages/Dashboard/Dashboard";
import NotFound from "./NotFound";

const Routing = ()=>{
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    try{
      const user = JSON.parse(localStorage.getItem("user"))
        if(user){
          dispatch({type:"USER", payload:user})
        }
    }catch(error){
        console.log(error)
    }
    
  },[])
  return(
    <Routes>
      <Route path="/" exact element={<Search/>}/>
      <Route path="/login" element={<Login/>}/>
      {
        state ?
        <>
            <Route path="/admin" element={<Dashboard/>}/>
            <Route path="/create/user" element={<Create/>}/>
            <Route path="/create/website" element={<Website/>}/>
            <Route path="/website" exact element={<ViewWebsite/>}/>
            <Route path="/website/:id" exact element={<WebsiteEdit/>}/>
            <Route path="/users" exact element={<ViewUser/>}/>
            <Route path="/users/:id" exact element={<EditCreate/>}/>
        </>:
        <Route path="*"  element={<NotFound/>}/>
      }
     <Route path="*"  element={<NotFound/>}/>
  </Routes>
  )
}



function App() {
  const [state, dispatch] = useReducer(Reducer, initialState)
 
  return (
    <div className="App">
      <UserContext.Provider value={{state, dispatch}}>
        <BrowserRouter>
          <Routing/>
        </BrowserRouter>
      </UserContext.Provider>
      
    </div>
  );
}

export default App;
