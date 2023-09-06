import { useSelector, useDispatch } from 'react-redux';
import { addTodo, postNewTodo } from "../../../Redux/reducers/addTodos_reducer";
import { fetchTodosByUserid } from '../../../Redux/reducers/fetchTodos_reducer';

function AddTodoForm () {
    const dispatch = useDispatch();
    const state = useSelector((state)=>state.addTodosReducer);
    const newTodo = state.todo;
    const userid = "555"

    const handleSubmit = (e)=>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        formJson.owner = userid;
        console.log(formJson)
        dispatch(postNewTodo(formJson))
        dispatch(fetchTodosByUserid("555")); // fetches from DB to bring in updated list. Might not be the most efficient way.
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input name="todo"type="text" placeholder="new todo"></input>
                <button type="submit">Save</button>
            </form>
            <p>* {newTodo} has been added </p>
        </>
    )
};

export default AddTodoForm;