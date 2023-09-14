import { useDispatch } from "react-redux";
import { authenticateUser} from "../../../Redux/reducers/user_reducer";

function LoginForm () {
    const dispatch = useDispatch();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        
        dispatch(authenticateUser(formJson))
    };   
    
    return(
        <>
            <form id="loginForm" onSubmit={handleSubmit}>
                <input type="text" name="username"placeholder="username"></input>
                <input type="password" name="password"placeholder="password"></input>
                <button>Login</button>
                <button>Signup</button>
            </form>
        </>
    )
}

export default LoginForm;