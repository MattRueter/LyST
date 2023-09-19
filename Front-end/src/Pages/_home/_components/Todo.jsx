import { Card, CardContent, Typography,Button} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux';
import  {deleteTodo, markTodoFinished, markFinishedUI, deleteUI}  from '../../../Redux/reducers/todos_reducer';


function Todo (props) {
    const {todo, projectName, priority, due, id, status, text} = props
    const dispatch = useDispatch();
    const secret = useSelector((state => state.userReducer.secret))

    const handleDelete = (id) => {
        const data ={id : id , secret : secret};
        dispatch(deleteTodo(data));
        dispatch(deleteUI(id))
    };
    const handleMarkFinished = async (id, status) =>{
        const data = { id:id, status:status, secret: secret};
        dispatch(markTodoFinished(data));
        dispatch(markFinishedUI(data));
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
                        <Typography 
                            sx={text}>
                                Due:{due} 
                        </Typography>                       
                        <button className ={"primaryButton"}>details</button>
                        <Button className ={"primaryButton"} onClick={()=>handleDelete(id)}>delete</Button>
                        <Button className ={"primaryButton"} onClick={()=>handleMarkFinished(id, status)}><DoneIcon/></Button>
                    </CardContent>
                </Card>
            </li>
        )
}

export default Todo;