import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    const state = useSelector((state) => state.themeReducer);
    const theme = state.theme;

    const chooseFilter = (e) =>{
        e.preventDefault();     
        const selectInput = e.target.value;

        if(selectInput === "all"){
            dispatch(fetchTodosByUserid());
        }else{
            const criteria = { route:selectInput[0], criteria:selectInput[1]}
            dispatch(fetchTodosByCriteria(criteria));
        }
    };
   
    return(
        <FormControl variant="standard" sx={{width:"40%" }} size="small">
            <InputLabel sx={theme.labels}>View:</InputLabel>
            <Select onChange={chooseFilter} value="" >
                //fixed
                <MenuItem value="all">All</MenuItem>
                
                //fixed
                <InputLabel sx={theme.labels} >Priority</InputLabel>
                    <MenuItem name="Priority" value={["bypriority","1"]}>High</MenuItem>
                    <MenuItem name="Priority" value={["bypriority","2"]}>Medium</MenuItem>
                    <MenuItem name="Priority" value={["bypriority","3"]}>Low</MenuItem>

                //replace with calendar and compose like data's date values
                <InputLabel sx={theme.labels} >Date</InputLabel>
                    <MenuItem name="Due date" value={["bydate","Monday" ]}>Monday</MenuItem>
                    <MenuItem name="Due date" value={["bydate","Tuesday" ]}>Tuesday</MenuItem>
                    <MenuItem name="Due date" value={["bydate","Wednesday" ]}>Wednesday</MenuItem>
                    <MenuItem name="Due date" value={["bydate","Thursday" ]}>Thursday</MenuItem>
                    <MenuItem name="Due date" value={["bydate","Friday" ]}>Friday</MenuItem>
                    <MenuItem name="Due date" value={["bydate","Saturday" ]}>Saturday</MenuItem>
                    <MenuItem name="Due date" value={["bydate","Sunday" ]}>Sunday</MenuItem>
                name="Monday" 
                //dynamically rendered
                <InputLabel sx={theme.labels} >Project</InputLabel>
                    <MenuItem name="Project"value= {["byproject", "languages"]}>Languages</MenuItem>
                    <MenuItem name="Project"value= {["byproject", "chores"]}>Chores</MenuItem>
                //fixed
                <InputLabel sx={theme.labels} >Status:</InputLabel>
                    <MenuItem name="Status" value={["bystatus", "false"]} >Uncompleted</MenuItem>
                    <MenuItem name="Status" value={["bystatus", "true"]} >Completed</MenuItem>
            </Select>
        </FormControl>              
    )
};

export default FilterMenu;
