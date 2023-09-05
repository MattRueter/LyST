import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from '../reducers/todoReducer';
import { useEffect } from 'react';



function TodoList () {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const todos = state.todoReducer.todos;

  useEffect(() =>{
    dispatch(fetchTodos());
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