import { useSelector} from 'react-redux';
import './CSS/app.css';
import './CSS/index.css'
import HomePage from './Pages/_home/_pages/HomePage';
import LoginPage from './Pages/_login/_pages/LoginPage';
import DateSelector from './Pages/_home/_components/Calendar';

function App() {
  const user = useSelector((state) =>state.userReducer);


  if(user._id){
    return(
      <>
        <HomePage />
      </>
    )
  }else if(user._id === null){
    return (
      <>
        <LoginPage />
      </>
    )
  }else{
    return(
      <>
        <DateSelector />
      </>
    )
  }
}

export default App
