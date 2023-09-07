import './CSS/app.css';
import './CSS/index.css'
import HomePage from './Pages/_home/_pages/HomePage';
import LoginPage from './Pages/_login/_pages/LoginPage';
import Button from '@mui/material/Button';

const isLoggedin= true;

function App() {
  //could show login in unless user is authenticated.
  // if authenticated render HomePage
  if(isLoggedin){
    return(
      <>
        <HomePage />
      </>
    )
  }else{
    return (
      <>
        <LoginPage />
      </>
    )
  }
};

export default App
