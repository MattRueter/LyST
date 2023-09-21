import { useSelector} from 'react-redux';
import './CSS/app.css';
import './CSS/index.css'
import HomePage from './Pages/_home/_pages/HomePage';
import LoginPage from './Pages/_login/_pages/LoginPage';


function App() {
  const user = useSelector((state) =>state.userReducer);
  const success = useSelector((state) => state.userReducer.success);

  if(user._id){
    return(
      <>
        <HomePage />
      </>
    )
  }else if(user.exists === true){
    return(
      <>
        <LoginPage msg="Please choose another username." />
      </>
    )
  }else if(success === false){
    return(
      <>
        <LoginPage msg="Check username and password are correct." />
      </>
    )
  }else if(user._id === null){
    return (
      <>
        <LoginPage msg=""/>
      </>
    )
  }
}

export default App
