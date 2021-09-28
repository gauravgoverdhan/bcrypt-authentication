import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

let userData1;

function Login() {

    const history = useHistory();

    const [ formData, setFormData ] = useState({
        username: "",
        password: "",
        isLogged: ""
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
            axios.post("http://localhost:3001/login", formData)
            .then(res => {
                setFormData((prevValue) => {
                    return {
                        ...prevValue,
                        isLogged: res.data.isLogged
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
        } 
    }, [fetch]);

    useEffect(() => {
        userData1 = formData;
        if (formData.isLogged) {
            history.push("/bucket");
        } else if (formData.isLogged === false) {
            alert("Incorrect username or password!");
            setFormData((prevValue) => {
                return {
                    ...prevValue,
                    isLogged: ""
                }
            });
        }
    }, [formData]);

    return (
        <div>
            <div className="container mt-5">
                <h1>Login</h1>
                <div className="row">
                    <div className="col-sm-8">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" onChange={handleChange} className="form-control" name="username" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" onChange={handleChange} className="form-control" name="password" />
                                    </div>
                                    <button type="submit" className="btn btn-dark">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <a className="btn btn-block btn-social btn-google" href="/auth/google" role="button">
                                    <i className="fab fa-google"></i>
                                    Sign In with Google
                                </a>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Login;
export { userData1 };