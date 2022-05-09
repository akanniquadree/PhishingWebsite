import "./table.css"
import { DataGrid, gridClasses} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';
import { DeleteForever, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios"

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));


export default function Table({setUser, user}) {
    //  Pseudo DataTable columns and rows for the Appointment
    const columns = [
        { field: 'id', headerName: 'ID', width: 60, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
        { field: 'name', headerName: 'Name of Admin', width: 341, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
        { field: 'email', headerName: 'Email of Admin', width: 400,headerAlign: 'center', headerClassName: 'super-app-theme--header' },
        { field: 'date', headerName: 'Date', width: 200,headerAlign: 'center', headerClassName: 'super-app-theme--header', renderCell: (params)=>{
          return(
              <div style={{display:"flex", alignItems:"center"}}>
                  <div style={{marginRight:"10px",}}>{params.row.date}</div> 
                  {
                      params.row.time
                  }
              </div>
          )
    }},
        {field: 'action', headerName: 'Action', width: 90, headerAlign: 'center', headerClassName: 'super-app-theme--header',renderCell: (params)=>{
            return(
                  <div>
                      <Link className='link' to={`/users/${params.row.id}`}><Edit  style={{marginLeft:"5px",marginRight:"5px",color:"green",cursor:"pointer"}}/></Link>           
                      
                      <DeleteForever className='tiny material-icons' style={{marginRight:"5px",color:"red",cursor:"pointer"}} onClick={()=>{deletePost(params.row.id)}}/>
                  </div>
              )},}
      ];
      
      const rows = user?.map((itm, idx)=>{
        return{
          id: itm._id,
          name: itm.name,
          email: itm.email,
          date: new Date(itm.createdAt).toDateString(),
          time: new Date(itm.createdAt).toLocaleTimeString(),
        }
      }
        
      )
const deletePost = async(itemId) =>{
  try {
      const remove = await axios.delete(`http://localhost:8000/api/deleteuser/${itemId}`,{
          headers:{
              "Authorization":"Bearer " +localStorage.getItem("token")
          }
      })
      if(remove){
        const newData = user.filter(item=>{return item._id !== remove._id})
          setUser(newData)
      }

  } catch (error) {
    
  }
}

  return (
    <div className="table">
        <div className="tableWrapper">
            <Box sx={{
                height: "100%",
                width: 1,
                '& .super-app-theme--header': {
                backgroundColor: '#1775ee',}}}>
                <StripedDataGrid
                    style={{ fontSize: "13px",}}
                    rows={rows}
                    columns={columns}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    disableSelectionOnClick
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }
                />
            </Box>
        </div>
    </div>
  )
}
