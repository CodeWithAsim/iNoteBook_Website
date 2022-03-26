import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = (props) => {

    const [creds, setCreds] = useState({ name: "", email: "", password: "", cpassword: "" });

    const history = useHistory();

    const signupHandler = async (e) => {

        e.preventDefault();

        const { name, email, password } = creds;

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }) // body data type must match "Content-Type" header
        });

        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);

        // hum ne ek pattern banaya hai in endpoints success aur us ke against message send krne ka 
        if (json.success) {

            // Save the token and redirect to home page  
            localStorage.setItem("token", json.authtoken); // for storing or saving the token in local storage
            history.push("/"); // here using useHistory hook for redirecting 
            props.showAlert("success", "Signed up successfully !");


        }
        else {

            props.showAlert("danger", "Try with another credentials !");
            // alert("Try with another credentials !"); // ye JS ka native alert use kiya hai hum ne fil hal

        }

    }

    const onChangeHandler = (e) => {

        setCreds({ ...creds, [e.target.name]: e.target.value });

    }

    return (
        <div className="container">
            <h1 className='text-center mb-3'>SignUp to use iNotebook</h1>
            <form onSubmit={signupHandler}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChangeHandler} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChangeHandler} minLength={5} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChangeHandler} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChangeHandler} minLength={5} required />
                    {/* minLength krne se inbuild browser validation mil jata hai  */}
                </div>
                <button type="submit" className="btn btn-dark">SignUp</button>
            </form>
        </div>
    )
}

export default Signup
