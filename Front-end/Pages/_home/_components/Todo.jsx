import { Card, CardContent, Typography,Button} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux';
import  {fetchTodosByUserid, deleteTodo, markTodoFinished, markFinishedUI, deleteUI}  from '../../../Redux/reducers/fetchTodos_reducer';


function Todo (props) {
    const {todo, projectName, priority, id, status, text} = props
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
        dispatch(deleteUI(id))
    };
    const handleMarkFinished = async (id, status) =>{
        const todoData = { id:id, status:status }
        dispatch(markTodoFinished(todoData));
        dispatch(markFinishedUI(todoData));
    }

        return(
            <li key={id}>
                <Card variant="outlined" sx={{margin:"2%"}}>
                    <CardContent>
                        <Typography 
                            sx={{
                                fontSize : 24, 
                                textDecorationLine: text.textDecorationLine
                                }}>
                                {todo}
                        </Typography>
                        <Typography 
                            sx={text}>
                                Project:{projectName}
                        </Typography>
                        <Typography 
                            sx={text}>
                                Priority:{priority} 
                        </Typography>                        
                        <button>details</button>
                        <Button onClick={()=>handleDelete(id)}>delete</Button>
                        <Button onClick={()=>handleMarkFinished(id, status)}><DoneIcon/></Button>
                    </CardContent>
                </Card>
            </li>
        )
};

export default Todo;