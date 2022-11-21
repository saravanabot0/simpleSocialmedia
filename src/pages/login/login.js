import {React, useEffect} from 'react';
import { GoogleButton } from 'react-google-button';
import {authentication} from "../../firebaseConfig/firebaseConfig"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate   } from "react-router-dom";
import "./login.css";

function Login(props) {

    const navigate = useNavigate();

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
        .then ((res)=> {
            console.log(res);
            navigate("/");
        })
        .catch ((err)=> {
            console.log(err);
        })
    }

  return (
    <div className='overallLoginContainer'>
        <h1 className='headerLoginStyle'> Login Here </h1>
        <div className='loginBox'>
        <p className='loginFontStyle'> SignIn With Your 🫵 Google Account </p>
        <GoogleButton onClick={() => signInWithGoogle()} />
        </div>
       
    </div>
  )
}

export default Login