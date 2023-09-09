import { Card, CardContent, Typography,Button} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { useSelector } from 'react-redux/es/hooks/useSelector';


function Todo () {
    const state = useSelector((state) =>state.fetchTodosReducer);
    const todos = state.todos;

    const todoCards = todos.map((item)=>{
        return(
            <li>
                <Card variant="outlined" sx={{margin:"2%"}}>
                    <CardContent>
                        <Typography sx={{fontSize : 24}}>{item.todo}</Typography>
                        <Typography>Project: {item.projects}</Typography>
                        <Typography>Priority: {item.priority} </Typography>
                        <button>details</button>
                        <Button>delete</Button>
                        <Button><DoneIcon/></Button>
                    </CardContent>
                </Card>
            </li>
        )
    });
    return(
        <>
        {todoCards}
        </>
    )
}
export default Todo;