require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/bucketDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const bucketSchema = new mongoose.Schema ({
    bucketId: String, 
    inputArea: String
});

const userSchema = new mongoose.Schema ({
    email: String,
    password: String,
    buckets: bucketSchema
});
  
const User = mongoose.model("User", userSchema);
const Bucket = mongoose.model("Bucket", bucketSchema);

app.post("/register", (req, res) => {
    User.findOne({email: req.body.username}, (err, foundUser) => {
        if (foundUser) {
            console.log("User already exists");
            res.json({
                isRegistered: false
            });
        } else {
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                const newUser = new User ({
                    email: req.body.username,
                    password: hash
                });
                newUser.save((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("User created");
                        res.json({
                            isRegistered: true
                        });
                    }
                })
            });
        }
    });
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
        if (foundUser) {
                bcrypt.compare(password, foundUser.password, (err, result) => {
                    if (result === true) {
                        res.json({
                            isLogged: true
                        });
                    } else {
                        res.json({
                            isLogged: false
                        });
                    }
                });
            } else {
                res.json({
                    isLogged: false
                });
            }
        }
    });
});

app.post("/bucket", (req, res) => {
    const bId = req.body.bucketName;
    const bText = req.body.inputArea;
    
    const newBucket = new Bucket({
        bucketId: bId,
        inputArea: bText
    });

    Bucket.findOne({bucketId: bId}, (err, foundBucket) => {
        if (!err) {
            if (foundBucket) {
                console.log("Bucket already exists");
                res.json({
                    insertBucket: false
                });
            } else {
                newBucket.save((err) => {
                    if (!err) {
                        console.log(foundBucket);
                        console.log("Bucket inserted successfully!");
                        res.json({
                            insertBucket: true
                        });
                    } else {
                        console.log(err);
                    }
                });
            }
        } else {
            console.log(err);
        }
    });
});

let port = process.env.PORT;
if (port == null || port == "") 
    port = 3001;

app.listen(port, () => {
    console.log("Server started on port " + port);
});