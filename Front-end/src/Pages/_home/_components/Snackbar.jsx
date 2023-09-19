import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Snackbar from '@mui/material/Snackbar';

function SnackBar () {
    const newTodo = useSelector((state) => state.todosReducer.newTodoName)
    const [ open, setOpen ] = useState(false);

    useEffect (() => {
        if(newTodo.length > 0){
            setOpen(true);
        }
    },[newTodo])

    const handleClose = () => {
        open === true ? setOpen(false) : setOpen(true);
    }
    return(
        <Snackbar 
            sx={{'& .MuiPaper-root':{backgroundColor:"#a6c2dd"}}}
            open={open}
            onClose={handleClose}
            autoHideDuration={4000}
            message={newTodo + " added."}
        />
    )
}

export default SnackBar