import "./search.css"
import axios from "axios"
import {useState, useEffect} from "react"

function Search() {
    const [search, setSearch] = useState("")
    const [url, setUrl] = useState("")
    const [message, setMessage] = useState("")
    const [message2, setMessage2] = useState("")
    const [error, setError] = useState("")
    useEffect(()=>{
        
    },[])
    const postData = async() =>{
        try {
            const {data} = await axios.post("http://localhost:8000/api/search",{url})
            if(data.message){
                setMessage(data.message)
                setMessage2(data.messagetwo)
                setError("")
                console.log(data)
            }
            setSearch(data.website)
            
        } catch (error) {
            console.log(error)
            setError(error.response.data.error)
            setMessage("")
            setMessage2("")
        }
    }

  return (
    <div className="search">
        <div className="searchContainer">
            <div className="searchWrapper">
                <div className="searchTop">
                        <h4 className="searchTopTitle"> Phishing Detection System</h4>
                        <form onSubmit={(e)=>{e.preventDefault();  postData()}} style={{marginLeft: "20%"}}>
                            <input placeholder="Enter Website Url" value={url} className="searchInputs" onChange={(e)=>setUrl(e.target.value)} />
                        </form>
                        
                </div>
                        <div className="searchBottom">
                            <div className="searchBottomTop">{error}</div>
                            {
                                message &&
                                <>
                                     <div className="searchBottomTop" id="mydiv" style= {{color:"green"}}>{message }</div>
                                    <div className="searchBottomTop" style= {{color:"#175dee"}}>{message2}</div>
                                    <div className="searchBottomTop" style= {{color:"#175dee"}}>Website Url: {search.url}</div>
                                </>
                            }
                           
                        </div>
            </div>
        </div>
    </div>
  )
}

export default Search