import { useSelector, useDispatch } from 'react-redux';
import { fetchTodosByUserid, fetchTodosByCriteria } from '../../../Redux/reducers/fetchTodos_reducer';
import { useEffect } from 'react';
import Todo from './Todo';

function TodoList () {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  
  useEffect(() =>{
    dispatch(fetchTodosByUserid("555"));
    //dispatch(fetchTodosByCriteria({uid:"555", route:"byproject", criteria:"languages"}));

  },[]);

  return(
    <>
      <h3>View criteria here:</h3>
      <ol>
        <Todo/>
        </ol>
    </>
  )
};

export default TodoList