import React from 'react'
import InputWithLabel from '../../shared/components/InputWithLabel';

const LoginPageInputs = ({mail, setMail, password, setPassword}) => {
  return (
    <>
    <div>
    <InputWithLabel
    value = {mail}
    setValue = {setMail}
    label='E-mail'
    type='text'
    placeholder='Enter e-mail address'
    />

<InputWithLabel
    value = {password}
    setValue = {setPassword}
    label='password'
    type='password'
    placeholder='Enter password'
    />
    </div>

    </>
  )
}

export default LoginPageInputs;