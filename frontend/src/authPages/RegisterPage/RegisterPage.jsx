import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import  { Typography } from '@mui/material'
import Authbox from '../../shared/components/Authbox'
import RegisterPageInput from './RegisterPageInput'
import RegisterPageFooter from './RegisterPageFooter'
import { validateRegisterForm } from '../../shared/utils/validators';
import { register, reset } from '../../features/auth/authSlice';
import Spinner from '../../shared/components/Spinner';
import { useSelector, useDispatch } from 'react-redux';

const RegisterPage = () => {

  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [isformValid, setIsFormValid] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth)

  const handleRegister = () => {
    const userData = {
      mail,
      username,
      password
    }
    dispatch(register(userData))
  }

  useEffect( () => {
    setIsFormValid(
      validateRegisterForm({
        mail, username, password
      })
    )
    if(isSuccess || user) {
      window.location.reload()
      navigate('/dashboard')
    }
    dispatch(reset())
  }, [ mail, username, password, setIsFormValid, user, isLoading, isError, isSuccess, message, navigate, dispatch ])


  useEffect( () => {
    if(isSuccess || user) {
      window.location.reload()
      navigate('/dashboard')
    }
    dispatch(reset())
  },[ user, isLoading, isError, isSuccess, message, navigate, dispatch ])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <Authbox>
        <Typography variant='h5' sx={{color : 'white'}}>
            Create an account
        </Typography>
    <RegisterPageInput
    mail = {mail}
    setMail = {setMail}
    username = {username}
    setUsername = {setUsername}
    password = {password}
    setPassword = {setPassword}
    />
    <RegisterPageFooter
    handleRegister= {handleRegister}
    isformValid= {isformValid}
    />
    </Authbox>
  )
};

export default RegisterPage;