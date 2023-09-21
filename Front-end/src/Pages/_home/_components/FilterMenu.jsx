import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { fetchTodosByUserid, fetchTodosByCriteria } from '../../../Redux/reducers/todos_reducer';
import Calendar from 'react-calendar';
import { createDate  } from '../../../Utils/utilities';


function FilterMenu() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.themeReducer.theme);
    const currentUser = useSelector((state) => state.userReducer);
    const projectList = useSelector((state) => state.todosReducer.projects);
    const [ value, setValue ] = useState(new Date());


    function onChange (nextValue){
        const dueDate = createDate(nextValue)
        const criteria ={route:"bydate", criteria:dueDate, currentUser:currentUser}
        dispatch(fetchTodosByCriteria(criteria))
        setValue(nextValue)
    };

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
                
                <MenuItem value="all">All</MenuItem>
                <InputLabel sx={theme.labels} >Priority</InputLabel>
                    <MenuItem name="Priority" value={["bypriority","1"]}>High</MenuItem>
                    <MenuItem name="Priority" value={["bypriority","2"]}>Medium</MenuItem>
                    <MenuItem name="Priority" value={["bypriority","3"]}>Low</MenuItem>

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
                <InputLabel sx={theme.labels} >Date</InputLabel>
                    <MenuItem name="date" value={["bydate", "none"]}>None</MenuItem>
                    <Calendar
                        id="selectCalendar"
                        className="calendarShowing"
                        onChange={onChange}
                        name="date"
                        value={value}
                    />
            </Select>
        </FormControl>              
    )
}
/*
<MenuItem name="due" value={["bydate", createDate(value) ]}>

</MenuItem>
*/
export default FilterMenu;
