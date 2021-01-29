import React,{useState} from 'react';
import Login from './Login';
import Tab from './Tab';
import SignUp from './SIgnUp';

function AuthPage(props) {
    const [loginShow, setLoginShow] = useState(true);
    const tabHandler = (a)=>{
        console.log({a});
        a===0 ? setLoginShow(true) : setLoginShow(false);
    }

    return (
        <div>
            <Tab options={["Login","Signup"]} tabHandler={tabHandler}/>
            {loginShow ? <Login loggedIn={props.loggedIn} /> : <SignUp loggedIn={props.loggedIn}/>}
        </div>
    )
}

export default AuthPage
