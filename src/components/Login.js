import { Button } from '@mui/material'
import React from 'react'
import { useSigninWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase'

function Login() {
   const[signinWithGoogle] = useSigninWithGoogle(auth)
  return (
    <div className='app'>
        <div className='login'>
            <div className='login__background' /> {/*$bem css*/}
                <div className='login__container'>
                    <img src='/logo.png' alt="logo" />
                    <div className='login__text'>
                        <h1>Sign in to connect</h1>
                    </div>
                    <Button onClick={() => signinWithGoogle()}>
                         Sign in with Google
                    </Button>
                </div>
            </div>
    </div>
  )
}

export default Login