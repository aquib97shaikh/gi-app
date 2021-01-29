// import logo from './logo.svg';
import './App.css';
import SuccessPage from './SuccessPage';
import React,{useState} from 'react';
import AuthPage from './AuthPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  
  return (
    <div className="App">
      {loggedIn ? <SuccessPage /> :   <AuthPage loggedIn={setLoggedIn}/>}
    </div>
  );
}

export default App;
