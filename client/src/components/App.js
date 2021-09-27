import React from "react";
import HomePage from "./HomePage";
import Register from "./Register";
import Login from "./Login";
import Bucket from "./Bucket";
import { Route } from "react-router-dom";

function App() {
  return (
      <div className="App">
        <Route path="/" exact component={HomePage} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/bucket" exact component={Bucket} />
      </div>
  );
}

export default App;
