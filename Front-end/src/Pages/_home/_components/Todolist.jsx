import { useSelector, useDispatch } from 'react-redux';
import { fetchTodosByUserid } from '../../../Redux/reducers/todos_reducer';
import { useEffect } from 'react';
import Todo from './Todo';
import { checkStatus } from '../../../CSS/muiStyles';

function TodoList () {
  const dispatch = useDispatch();
  const todos = useSelector((state) =>state.todosReducer.todos);
  const currentUser = useSelector((state) => state.userReducer)

  useEffect(() =>{
    dispatch(fetchTodosByUserid(currentUser));
  },[]);

  const todoCards = todos.map((item) =>{
    let StatusText = checkStatus(item);    
    return(
      <Todo 
        key={item._id}
        todo={item.todo} 
        projectName={item.projects} 
        priority={item.priority}
        due={item.due}
        id={item._id} 
        status={item.finished} 
        text={StatusText}/>
    )
  });

  return(
    <>
      <ol>
        {todoCards}
      </ol>
    </>
  )
}

export default TodoList