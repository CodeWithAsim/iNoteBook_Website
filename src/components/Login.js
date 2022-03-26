import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    const [loginCreds, setLoginCreds] = useState({ email: "", password: "" });

    const history = useHistory();

    const loginHandler = async (e) => {

        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loginCreds.email, password: loginCreds.password }) // body data type must match "Content-Type" header
        });

        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);

        // hum ne ek pattern banaya hai in endpoints success aur us ke against message send krne ka 
        if (json.success) {

            // Save the token and redirect to home page  
            localStorage.setItem("token", json.authtoken); // for storing or saving the token in local storage
            props.showAlert("success", "Logged in successfully !");
            history.push("/"); // here using useHistory hook for redirecting 

        }
        else {

            props.showAlert("danger", "Please enter correct credentials !");
            // alert("Please enter correct credentials !"); // ye JS ka native alert use kiya hai hum ne fil hal

        }

    }

    const onChangeHandler = (e) => {

        setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value });

    }

    return (
        <div className="container">
            <h1 className='text-center mb-3'>Login to use iNotebook</h1>
            <form onSubmit={loginHandler}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChangeHandler} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChangeHandler} />
                </div>
                <button type="submit" className="btn btn-dark">Login</button>
            </form>
        </div>
    )
}

export default Login
