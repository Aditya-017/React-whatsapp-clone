import React from 'react'
import {Button} from "@material-ui/core"
import './Login.css'
import{auth, provider} from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
function Login() {
const [{},dispatch]=useStateValue()
    const signIn=()=>{
        auth.signInWithPopup(provider).then(res=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:res.user,
            })
        }).catch(err=>{alert(err)})
    }
    return (
        <div className="login">
            <div className="login_container">
                <img src="https://freepngimg.com/thumb/whatsapp/4-2-whatsapp-transparent-thumb.png"/>
                <div className="login_text">
                    <h1>Sign in to whatsapp</h1>
                </div>

                <Button  onClick={signIn}>
                Sign in with google
                </Button>



            </div>
            
        </div>
    )
}

export default Login;