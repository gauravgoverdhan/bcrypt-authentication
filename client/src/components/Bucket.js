import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { userData } from "./Register";
import { userData1 } from "./Login";

function Bucket() {

    const [ userInput, setUserInput ] = useState({
        bucketName: "",
        inputArea: ""
    });

    const [ fetch, setFetch ] = useState(false);
    
    function handleChange(e) {
        const { name, value } = e.target;
        setUserInput((prevValue) => {
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
            if (userInput.bucketName === "")
                alert("Bucket name is empty!");
            axios.post("http://localhost:3001/bucket", {userData, userInput})
            .then(res => {
                if (res.data.insertBucket)
                    alert("Data written to DB!");
                else if (res.data.insertBucket === false)
                    alert("Bucket name already exists!");
            })
            .catch((err) => {
                console.log(err);
            });
        } 
    }, [fetch]);

    return (
        <div className="bucket">
            <h1 className="username-heading">Username: {userData.username ? userData.username : userData1.username}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="bucketName">Bucket Name</label><br />
                    <input type="text" className="form-control" name="bucketName" onChange={handleChange} /><br />
                    <label htmlFor="text-area">Input Area</label><br />
                    <textarea name="inputArea" className="form-control" rows="3" onChange={handleChange} /><br />
                    <button type="submit" className="btn btn-dark">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Bucket;