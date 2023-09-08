import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, postNewTodo } from "../../../Redux/reducers/addTodos_reducer";
import { fetchTodosByUserid } from '../../../Redux/reducers/fetchTodos_reducer';

function AddTodoForm ({display}) {
    const dispatch = useDispatch();
    const state = useSelector((state)=>state.addTodosReducer);
    const newTodo = state.todo;
    const userid = "555"

    const handleSubmit = (e)=>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const project = formJson.projects;
        formJson.projects =[project];
        formJson.owner = userid;
        form.reset();
        dispatch(postNewTodo(formJson))
        dispatch(fetchTodosByUserid("555")); // fetches from DB to bring in updated list. Might not be the most efficient way.
    };    
    return(
        <>
            <form id="addTodoForm" className={display} onSubmit={handleSubmit}>
                <label>Task name:</label>
                <input name="todo"type="text" placeholder="new todo"></input>
                <div className="break">________________________________</div>
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
                <div className="break">--------------------------------</div>
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
                <div className="break">--------------------------------</div>
                {/*This will map over a user's projects and give the option of selecting one of those
                or create a new one.*/}
                <label>Project</label>
                <select name="projects" >
                        <option value="none">Add task to a project</option>
                        <option value= "languages" >languages</option>
                        <option value= "software development" >software development</option>
                        <option value= "chores" >chores</option>
                        <option value= "exercise" >exercise</option>
                    </select>
                <div className="break">--------------------------------</div>
                <button type="submit">Save</button>
                <p>{newTodo} has been added </p>
            </form>
        </>
    )
};

export default AddTodoForm;