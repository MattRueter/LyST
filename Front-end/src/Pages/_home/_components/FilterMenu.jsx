import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { fetchTodosByUserid, fetchTodosByCriteria } from '../../../Redux/reducers/todos_reducer';


function FilterMenu() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.themeReducer.theme);
    const currentUser = useSelector((state) => state.userReducer);
    const projectList = useSelector((state) => state.todosReducer.projects);

    const chooseFilter = (e) =>{
        e.preventDefault();     
        const selectInput = e.target.value;

        if(selectInput === "all"){
            dispatch(fetchTodosByUserid(currentUser));
        }else{
            const criteria = { route:selectInput[0], criteria:selectInput[1], currentUser:currentUser}
            dispatch(fetchTodosByCriteria(criteria));
        }
    };
    return(
        <FormControl variant="standard" sx={{width:"40%" }} size="small">
            <InputLabel sx={theme.labels}>View:</InputLabel>
            <Select onChange={chooseFilter} value="" >
                {/*fixed*/}
                <MenuItem value="all">All</MenuItem>
                
                {/*fixed*/}
                <InputLabel sx={theme.labels} >Priority</InputLabel>
                    <MenuItem name="Priority" value={["bypriority","1"]}>High</MenuItem>
                    <MenuItem name="Priority" value={["bypriority","2"]}>Medium</MenuItem>
                    <MenuItem name="Priority" value={["bypriority","3"]}>Low</MenuItem>

                {/*replace with calendar and compose like data's date values*/}                
                <InputLabel sx={theme.labels} >Date</InputLabel>
                    <MenuItem name="Due date" value={["bydate","Monday" ]}>Monday</MenuItem>
                    <MenuItem name="Due date" value={["bydate","Tuesday" ]}>Tuesday</MenuItem>
                    <MenuItem name="Due date" value={["bydate","Wednesday" ]}>Wednesday</MenuItem>
                    <MenuItem name="Due date" value={["bydate","Thursday" ]}>Thursday</MenuItem>
                    <MenuItem name="Due date" value={["bydate","Friday" ]}>Friday</MenuItem>
                    <MenuItem name="Due date" value={["bydate","Saturday" ]}>Saturday</MenuItem>
                    <MenuItem name="Due date" value={["bydate","Sunday" ]}>Sunday</MenuItem>
                
                <InputLabel sx={theme.labels} >Project</InputLabel>                    
                    {projectList.map((item) =>{
                        const index = projectList.findIndex((project)=>project===item);
                        return(
                            <MenuItem key={index} name="Project"value= {["byproject", item]}>{item}</MenuItem>
                        )
                    })}
                <InputLabel sx={theme.labels} >Status:</InputLabel>
                    <MenuItem name="Status" value={["bystatus", "false"]} >Uncompleted</MenuItem>
                    <MenuItem name="Status" value={["bystatus", "true"]} >Completed</MenuItem>
            </Select>
        </FormControl>              
    )
}

export default FilterMenu;
