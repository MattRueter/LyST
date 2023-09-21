import { useDispatch } from "react-redux";
import { authenticateUser, signupUser} from "../../../Redux/reducers/user_reducer";
import { useState } from "react";

function LoginForm () {
    const dispatch = useDispatch();
    const [ submitType, setSubmitType ] = useState("login")

    const handleClick = async (e) =>{
        const submit = e.target.name;
        setSubmitType(submit)
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        //package form data for sending req to backend.
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        
        //make sure fields aren't blank
        if(formJson.username === "" || formJson.password === ""){
            alert("must fill out name and password.")
            return
        }
        //which action has been requested?
        if(submitType === "login"){
            dispatch(authenticateUser(formJson))
        }else if(submitType === "signup"){
            dispatch(signupUser(formJson))
        }
    };
    
   
    return(
        <>
            <form id="loginForm" onSubmit={handleSubmit}>
                <input type="text" name="username"placeholder="username"></input>
                <input type="password" name="password"placeholder="password"></input>
                <button onClick={handleClick}  className ={"primaryButton"} name="login"> Login </button>
                <button onClick={handleClick}  className ={"primaryButton"} name="signup"> Signup </button>
            </form>
        </>
    )
}

export default LoginForm;