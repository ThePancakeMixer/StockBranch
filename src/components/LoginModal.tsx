import React, { useState,useRef, useEffect } from 'react';
import { Dialog,DialogTitle,TextField,DialogContent,DialogContentText,DialogActions,Button } from '@material-ui/core';
import firebase from 'firebase/app'
import 'firebase/auth';


import AuthAPI from '../DAL/AuthAPI';


function LoginModal() {

    const emailInputRef = useRef<HTMLInputElement>(null);
    const pwdInputRef = useRef<HTMLInputElement>(null);
    const confirmPwdInputRef = useRef<HTMLInputElement>(null);
    
    const [isLoggedIn,setLoggedIn] = useState(false);
    const [register,setRegister] = useState(false);

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(user){
            if (user)
                setLoggedIn(true);
            else
                setLoggedIn(false);
        })   
    });

    async function signIn(){
        if(!emailInputRef.current?.value || !pwdInputRef.current?.value)
            return;
        let result = await AuthAPI.SignIn(emailInputRef.current.value,pwdInputRef.current.value);
        if (result) {
            alert( result + " signed in");
        }
    }

    async function registerUser() {
        if(!register)   {
            setRegister(true);
            return;
        }
        if(!emailInputRef.current?.value || !pwdInputRef.current?.value || !confirmPwdInputRef.current?.value){
            alert("Please fill in all the fiels");
            return;
        }
        if (pwdInputRef.current.value != confirmPwdInputRef.current.value) {
            alert("Passwords do not match");
        }
        let result = await AuthAPI.RegisterUser(emailInputRef.current.value,pwdInputRef.current.value);
        if (result) { 
            alert( result + " succesfully registered");
        }
    }

    return (
        <Dialog open={!isLoggedIn}>
            <DialogContent>
                <DialogTitle> Register/Login </DialogTitle>
                <DialogContentText>
                    Create an account to save your portfolios!
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    inputRef={emailInputRef}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Password"
                    type="password"
                    inputRef={pwdInputRef}
                    fullWidth
                />
                {register && <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Confirm Password"
                    type="password"
                    inputRef={confirmPwdInputRef}
                    fullWidth
                />}
                <DialogActions>
                <Button 
                    color="primary"
                    onClick={signIn}
                >
                    Login
                </Button>
                <Button 
                    color="primary"
                    onClick={registerUser}
                >
                    Register
                </Button>
                <Button color="primary">
                    Skip
                </Button>
                </DialogActions>
            </DialogContent>


        </Dialog>
    )

}

export default LoginModal;