import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import history from "../history";

let userData;

function Register() {

    const [ formData, setFormData ] = useState({
        username: "",
        password: "",
        isRegistered: ""
    });

    const [ fetch, setFetch ] = useState(false);

    function handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setFetch((prevValue) => {
            return !prevValue;
        });
    }

    const initialRender1 = useRef(true);

    useEffect(() => {
        if (initialRender1.current) {
            initialRender1.current = false;
        } else {
            axios.post("http://localhost:3001/register", formData)
            .then(res => {
                setFormData((prevValue) => {
                    return {
                        ...prevValue,
                        isRegistered: res.data.isRegistered
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
        } 
    }, [fetch]);

    // const initialRender2 = useRef(true);

    useEffect(() => {
        userData = formData;
        if (formData.isRegistered) {
            history.push("/bucket");
        } else if (formData.isRegistered === false) {
            alert("Username already exists!");
        }
    }, [formData]);

    return (
        <div>
            <div className="container mt-5">
                <h1>Register</h1>

                <div className="row">
                    <div className="col-sm-8">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="username" onChange={handleChange} value={formData.username} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" name="password" onChange={handleChange} value={formData.password} />
                                    </div>
                                    <button className="btn btn-dark" type="submit">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* <div className="col-sm-4">
                        <div className="card social-block">
                            <div className="card-body">
                                <a className="btn btn-block btn-social btn-google" href="/auth/google" role="button">
                                    <i className="fab fa-google"></i>
                                    Sign Up with Google
                                </a>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Register;
export { userData };