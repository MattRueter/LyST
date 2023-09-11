import { useSelector, useDispatch } from 'react-redux';
import { fetchTodosByUserid, fetchTodosByCriteria } from '../../../Redux/reducers/fetchTodos_reducer';
import { useEffect } from 'react';
import Todo from './Todo';
import { checkStatus } from '../../../CSS/muiStyles';

function TodoList () {
  const dispatch = useDispatch();
  const state = useSelector((state) =>state.fetchTodosReducer);
  const todos = state.todos;

  useEffect(() =>{
    //fetches ALL of user's todos on updates to state.
    dispatch(fetchTodosByUserid());
  },[]);

  const todoCards = todos.map((item) =>{
    let StatusText = checkStatus(item);    
    return(
      <Todo todo={item.todo} projectName={item.projects} priority={item.priority} id={item._id} status={item.finished} text={StatusText}/>
    )
  });

  return(
    <>
      <h3>View criteria here:</h3>
      <ol>
        {todoCards}
      </ol>
    </>
  )
};

export default TodoList