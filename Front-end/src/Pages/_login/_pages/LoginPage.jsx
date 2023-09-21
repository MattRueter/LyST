import { useSelector } from "react-redux";
import LoginForm from "../_components/LoginForm";
import LoadingUser  from "../_components/LoadingUser";

function LoginPage ({msg}) {
    const loading = useSelector((state) => state.userReducer.loading);

    return(
        <div id="loginpage">
            <h1>Lyst</h1>
            <LoadingUser />
            <LoginForm />
            <p>{msg}</p>
        </div>
    )
}

export default LoginPage;