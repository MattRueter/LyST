import { useDispatch, useSelector } from 'react-redux';
import { fetchTodosByUserid, postNewTodo } from '../../../Redux/reducers/todos_reducer';
import { useState } from 'react';


function AddTodoForm ({display}) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.userReducer);
    const projectList = useSelector((state) => state.todosReducer.projects);
    //const [ newProject, setNewProject ] = useState(null);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        
        const newTodo = {...formJson,
            //if newProject has a value projects:[newProject] otherwise --> projects:[formJson.projects], (as below) 
            projects:[formJson.projects], 
            owner:currentUser._id, secret: 
            currentUser.secret
        };
        console.log(newTodo);
        form.reset();
        await dispatch(postNewTodo(newTodo))
        dispatch(fetchTodosByUserid(currentUser)); // fetches from DB to bring in updated list. Might not be the most efficient way.
    };    
    return(
        <>
            <form id="addTodoForm" className={display} onSubmit={handleSubmit}>
                <label>Task name:</label>
                    <input name="todo"type="text" placeholder="new todo"></input>
                <div className="break">_______________________</div>
                <label>Priority:
                <div>
                    <input type="radio" name="priority" id="high" value="1"></input>
                    <label>High</label>
                </div>
                <div>
                    <input type="radio" name="priority" id="medium" value="2"></input>
                    <label>Medium</label>
                </div>
                <div>
                    <input type="radio" name="priority" id="low" value="3"></input>
                    <label>Low</label>
                </div>
                </label>
                <div className="break">-----------------------</div>
                {/* This will be replaced with calendar*/}
                <label>Date</label>
                    <select name="due">
                        <option value="Today">Choose a due date</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                    <div className="break">-----------------------</div>
                {/*This will need to map over a user's projects and give the option of selecting one of those
                or create a new one.*/}
                <label>Project</label>
                <select>
                    {projectList.map((item) =>{
                        return(
                            <option value={item}> {item} </option>
                        )
                    })}
                </select>
                {/* New Project Button Here*/}
                <div className="break">-----------------------</div>
                <button type="submit">Save</button>
            </form>
            {/*New Project Form here update <newProject> variable if submitted*/}
        </>
    )
}

export default AddTodoForm;