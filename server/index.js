const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/login", (req, res) => {
    
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
});


let port = process.env.PORT;
if (port == null || port == "") 
    port = 3001;

app.listen(port, () => {
    console.log("Server started on port " + port);
});