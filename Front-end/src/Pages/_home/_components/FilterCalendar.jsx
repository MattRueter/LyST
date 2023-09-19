import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { fetchTodosByUserid, fetchTodosByCriteria } from '../../../Redux/reducers/todos_reducer';
import Calendar from 'react-calendar';
import { createDate  } from '../../../Utils/utilities';


function FilterCalendar() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.themeReducer.theme);
    const currentUser = useSelector((state) => state.userReducer);
    const projectList = useSelector((state) => state.todosReducer.projects);
    const [ calendarDisplay, setCalendarDisplay ] = useState("calendarHidden");
    const [ value, setValue ] = useState(new Date());

    function onChange (nextValue){
        setValue(nextValue)
    };
    const toggleCalendar = () =>{
        calendarDisplay === "calendarHidden" ? setCalendarDisplay("calendarShowing") : setCalendarDisplay("calendarHidden")
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
        <div>        
            <button className="primaryButton" type="button" onClick={toggleCalendar}>Pick a date</button>
            <form>
                <Calendar
                    id="filterCalendar"
                    className={calendarDisplay}
                    onChange={onChange}
                    name="date"
                    value={value}
                    />
            </form>
        </div>


              
    )
}
export default FilterCalendar;
