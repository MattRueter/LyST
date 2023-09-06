import './CSS/app.css';
import HomePage from './Pages/_home/_pages/HomePage';
import LoginPage from './Pages/_login/_pages/LoginPage';

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
