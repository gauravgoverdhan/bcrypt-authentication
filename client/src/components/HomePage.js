import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="home-page">
            <div className="jumbotron centered">
                <div className="container">
                    <h1 className="display-3">Bucket</h1>
                    <hr />
                    <Link to="/register" className="btn btn-light btn-lg" href="/register" role="button">Register</Link>
                    <Link to="/login" className="btn btn-dark btn-lg" href="/login" role="button">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage;