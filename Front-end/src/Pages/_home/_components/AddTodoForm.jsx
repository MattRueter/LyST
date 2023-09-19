import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodosByUserid, postNewTodo } from '../../../Redux/reducers/todos_reducer';
import Calendar from 'react-calendar';
import { createDate  } from '../../../Utils/utilities';
import 'react-calendar/dist/Calendar.css'

function AddTodoForm ({display}) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.userReducer);
    const projectList = useSelector((state) => state.todosReducer.projects);
    const [ value, setValue ] = useState(new Date());
    const [ dueDate, setDueDate ] = useState("")   

    function onChange (nextValue){
        setValue(nextValue)
        console.log(nextValue)

        //format date
        const dueDate = createDate(nextValue)
        setDueDate(dueDate)
    };


    const handleSubmit = async (e)=>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        let project;

        if(formJson.newProject){
            project = formJson.newProject
            console.log(project)
        }else{
            project = formJson.projects
            console.log(project)
        }

        const newTodo = {
            todo: formJson.todo,
            priority: formJson.priority,
            projects:[project],
            owner:currentUser._id,
            due: dueDate,
            secret:currentUser.secret
        };
        console.log(newTodo)
        form.reset();

        await dispatch(postNewTodo(newTodo))
        dispatch(fetchTodosByUserid(currentUser));
    };

    return(
        <>
            <form id="addTodoForm" className={display} onSubmit={handleSubmit}>
                <input className="inputLarge" name="todo" type="text" placeholder="new todo name"></input>

                <div>
                    <Calendar 
                        name="date"
                        onChange={onChange}
                        value={value}
                        />
                </div>
                    


                <div id="projectsContainer">
                    <select name="projects">
                        <option value="none">Add to existing project</option>
                        {projectList.map((item) =>{
                            const index = projectList.findIndex((project)=>project===item);
                            return(
                                <option key={index} value={item}> {item} </option>
                            )
                        })}
                    </select>
                    <p>or add to a new project.</p>
                    <input className="inputSmall" type ="text" name="newProject" placeholder='new project name'></input>
                </div>


                <div>
                <div id="priorityContainer">
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
                </div>
                <button className ={"primaryButton"} type="submit">Save</button>
                </div>

            </form>
        </>
    )
}


export default AddTodoForm;