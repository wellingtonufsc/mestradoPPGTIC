import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignUpForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';

const Login = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isSignUpMode, setIsSignUpMode] = useState(false);

    const signUpHandler = (success, message = '') => {
        if (success) {
            toast("Cadastrado com sucesso! Por favor, faça o log in", {type:'dark'});
        } else {
            toast(message + " Por favor, tente novamente", {type:'error'});
        }
    }

    const turnOffLogin = () => {
        setIsSignUpMode(true);
    }

    const turnOffSignUp = () => {
        setIsLoginMode(true);
    }

    return(
        <React.Fragment>
            <ToastContainer 
                position="top-center"
            />
            <CSSTransition
                classNames="my-node"
                timeout={1000}
                in={isLoginMode}
                unmountOnExit
                onExited={turnOffLogin}
            >
                <LoginForm switchMode={() => setIsLoginMode(false)} signUpSuccess={signUpHandler} ></LoginForm>
            </CSSTransition>
            <CSSTransition
                classNames="my-node"
                timeout={1000}
                in={isSignUpMode}
                unmountOnExit
                onExited={turnOffSignUp}
            >
                <SignupForm switchMode={() => setIsSignUpMode(false)} signUpSuccess={signUpHandler}></SignupForm>
            </CSSTransition>
        </React.Fragment>
    );
}

export default Login;