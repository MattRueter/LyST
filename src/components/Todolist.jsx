import { todos } from "../data/todos";

function TodoList () {
    const [ todoList, setTodoList ] = useState(todos);
    
    const todoNames = todos.map((index)=>{
        return(
          <li>{index.todo}</li>
        )
      });

    return(
        <>
            <h3>TODO:</h3>
            <ul>{todoNames}</ul>
        </>
    )
}
export default TodoList