import React from 'react'
import "./Login.css"
import { Button } from '@material-ui/core'
import {auth, provider} from '../Firebase'

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error));
    }

    return (
        <div className = "login">
            <h2> Login </h2>
            <div className="login__logo">
                <h2> Commune </h2>
            </div>

            <Button onClick = {signIn}>Sign In</Button>

        </div>
    )
}

export default Login
