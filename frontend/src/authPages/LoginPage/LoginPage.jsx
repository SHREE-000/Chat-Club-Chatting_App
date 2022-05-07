import React, { useState,useEffect } from 'react'
import Authbox from '../../shared/components/Authbox';
import LoginPageHeader from './LoginPageHeader';
import LoginPageInputs from './LoginPageInputs'
import LoginPageFooter from './LoginPageFooter';
import { validateLoginForm } from '../../shared/utils/validators';
import { login, reset } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../shared/components/Spinner';
import AlertNotification from '../../shared/components/AlertNotification'
const LoginPage = () => {

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setFormValid] = useState(false);
    const [invalidCredential, setInvalidCredential] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth)

    const handleLogin = () => {
        const userData = {
            mail,
            password
        }
        dispatch(login(userData))        
    }

    useEffect( () => {
        setFormValid(validateLoginForm( {mail, password }))

    }, [mail, password, setFormValid, user, isLoading, isError, isSuccess, message, navigate, dispatch ]);

    useEffect( () => {
        
        if (isSuccess || user) {
            navigate('/dashboard')
        }
        if (isError) {
            setInvalidCredential(true);
            setTimeout( () => {
                setInvalidCredential(false);
            },5000)
        }
        // dispatch(reset())
    },[user, isLoading, isError, isSuccess, message, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
      }

    
  return (
      <>
    <Authbox>

        <LoginPageHeader/>
        <LoginPageInputs
        mail = {mail}
        setMail = {setMail}
        password = {password}
        setPassword = {setPassword}
        />
        <LoginPageFooter 
        isFormValid={isFormValid} handleLogin={handleLogin}
            />
            { invalidCredential ?
            <AlertNotification notificationLogin={'You Entered Invalid Credential!'}/> : <div></div> }
    </Authbox>
    </>
)
};

export default LoginPage;