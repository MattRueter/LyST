
function LoginForm () {
    return(
        <>
            <form>
                <input type="text" name="username"placeholder="username"></input>
                <input type="password" name="password"placeholder="password"></input>
                <button>Login</button>
                <button>Signup</button>
            </form>
        </>
    )
}

export default LoginForm;