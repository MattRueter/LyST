import { useEffect, useState } from "react";
import {  useSelector } from "react-redux/es/hooks/useSelector";
import CircularProgress from '@mui/material/CircularProgress';
import {progressStyle} from "../../../CSS/muiStyles.js"

function LoadingUser () {
    const loading = useSelector((state) => state.userReducer.loading);
    const success = useSelector((state) => state.userReducer.success);
    const loadingMsg = "Logging in.";
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

    if (loading && minTimeElapsed){
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


export default LoadingUser;