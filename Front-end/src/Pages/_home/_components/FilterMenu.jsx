import { useDispatch } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { fetchTodosByUserid, fetchTodosByCriteria } from '../../../Redux/reducers/fetchTodos_reducer';
/* 
FilterMenu is used to fetch filterd copies of the todo list and update state in the store.
The project and date sections can be slimmed down and dynamically rendered in the case of projects 
a calender can replace the days of the week. *date formatting will be required first on the DB and then in the client
to make use of date selections on the calender.
*/

function FilterMenu() {
    const dispatch = useDispatch();
    const uid ="555"

    const chooseFilter = (e) =>{
        e.preventDefault();
        const selectInput = e.target.value;        
        if(selectInput === "all"){
            dispatch(fetchTodosByUserid(uid));
        }else{
            const criteria = { uid: uid, route:selectInput[0], criteria:selectInput[1]}
            dispatch(fetchTodosByCriteria(criteria));
        }
    };
   
    return(
        <FormControl sx={{width:"40%" }} size="small">
            <InputLabel sx={{fontSize:"large"}} id="demo-simple-select-label" variant="standard">Filter</InputLabel>
            <Select onChange={chooseFilter} value="">
                //fixed
                <MenuItem value="all">All</MenuItem>
                
                //fixed
                <InputLabel sx={{color:"lightblue"}}>Priority</InputLabel>
                    <MenuItem value={["bypriority","1"]}>High</MenuItem>
                    <MenuItem value={["bypriority","2"]}>Medium</MenuItem>
                    <MenuItem value={["bypriority","3"]}>Low</MenuItem>

                //replace with calendar and compose like data's date values
                <InputLabel sx={{color:"lightblue"}}>Date</InputLabel>
                    <MenuItem value={["bydate","Monday" ]}>Monday</MenuItem>
                    <MenuItem value={["bydate","Tuesday" ]}>Tuesday</MenuItem>
                    <MenuItem value={["bydate","Wednesday" ]}>Wednesday</MenuItem>
                    <MenuItem value={["bydate","Thursday" ]}>Thursday</MenuItem>
                    <MenuItem value={["bydate","Friday" ]}>Friday</MenuItem>
                    <MenuItem value={["bydate","Saturday" ]}>Saturday</MenuItem>
                    <MenuItem value={["bydate","Sunday" ]}>Sunday</MenuItem>
                
                //dynamically rendered
                <InputLabel sx={{color:"lightblue"}}>Project</InputLabel>
                    <MenuItem value= {["byproject", "languages"]}>Languages</MenuItem>
                    <MenuItem value= {["byproject", "chores"]}>Chores</MenuItem>
                //fixed
                <InputLabel sx={{color:"lightblue"}}>Status:</InputLabel>
                    <MenuItem value={["bystatus", "false"]} >Uncompleted</MenuItem>
                    <MenuItem value={["bystatus", "true"]} >Completed</MenuItem>
            </Select>
        </FormControl>              
    )
};

export default FilterMenu;
