import { useSelector, useDispatch } from 'react-redux';
import { fetchTodosByUserid, fetchTodosByCriteria } from '../../../Redux/reducers/fetchTodos_reducer';
import { useEffect } from 'react';



function TodoList () {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const todos = state.fetchTodosReducer.todos;
  
  useEffect(() =>{
    dispatch(fetchTodosByUserid("555"));
    //dispatch(fetchTodosByCriteria({uid:"555", route:"byproject", criteria:"languages"}));

  },[]);

  const todoNames = todos.map((item)=>{
    return(
      <li>{item.todo}</li>
    )
  });

  return(
    <>
      <h3>TODO:</h3>
      <ul>{todoNames}</ul>
    </>
  )
};

export default TodoList