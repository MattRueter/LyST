import { useEffect, useState } from "react";
import {  useSelector } from "react-redux/es/hooks/useSelector";
import CircularProgress from '@mui/material/CircularProgress';
import {progressStyle} from "../../../CSS/muiStyles.js"

function Loading () {
    const loading = useSelector((state) => state.todosReducer.loading);
    const failed = useSelector((state) => state.todosReducer.failed);
    const success = useSelector((state) => state.todosReducer.success);
    const loadingMsg = "Loading your todo list.";
    const failMsg = "Failed to load your todos."
    const [minTimeElapsed , setMinTimeElapsed ] = useState(false);
    
    useEffect(() => {
        if(loading){
           const timer = setTimeout(() =>{
                setMinTimeElapsed(true)
            },2000)
            return () => clearTimeout(timer);
        }
        if(success){
            setMinTimeElapsed(false);
        }        
    },[loading,success])

    if(failed){
        return  (
            <div style={progressStyle}>
                <h3>{failMsg}</h3>
            </div>
        ) 
    }else if (loading && minTimeElapsed){
            return(    
                <div style={progressStyle}>
                    <h3>{loadingMsg}</h3>
                    <CircularProgress ></CircularProgress>
                </div>
            )
    }else{
        return(
            <></>
        )
    }
}


export default Loading;