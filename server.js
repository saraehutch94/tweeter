// Require dependencies

const express = require("express");

// mongoose allows us to connect to mongoDB
const mongoose = require("mongoose");

const methodOverride = require("method-override");

// singular tweet --> naming convention (schema is used to create one singular tweet)
const Tweet = require("./models/tweet");

// Initialze express app

const app = express();

// Configure settings
 
require("dotenv").config();

const PORT = process.env.PORT;

// Connect to and config mongoDB

// capitalize constant variables
const MONGODB_URI= process.env.MONGODB_URI;

// connect to mongoose using database url (from mongoDB website)
mongoose.connect(MONGODB_URI);

// set up listeners for mongoDB events

// shortcut variable --> stores a shortcut to a specific point in an object
const db = mongoose.connection; // mongoose.connection is an object that represents our database in this application
// this object contains information related to db name, db host, db port, and any other relevant information

// console.log(db);

db.on("connected", () => console.log("Connected to mongoDB"));
db.on("error", (error) => console.log("mongoDB error: " + error.message));
db.on("disconnected", () => console.log("mongoDB disconnected"));

// Mount middleware

// use public folder for static assets (CSS files, JS files)
app.use(express.static("public"))

// body-parser -> creates req.body with parsed info from forms
// if no data from forms, it will return an empty object {}
app.use(express.urlencoded({extended: false}));

// method override: allows POST, PUT and DELETE from a form
app.use(methodOverride("_method"));

// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(express.json());

// Mount routes

app.get("/", (req, res) => {
    res.send("Hello World!")
  })

// index route
app.get("/tweets", (req, res) => {
    // error-first signature
    Tweet.find({}, (err, tweets) => {
        res.send(tweets);
    });
});

// delete route
// (req, res) = route handler
app.delete("/tweets/:id", (req, res) => {
    Tweet.findByIdAndDelete(req.params.id, (err, copyOfDeletedTweet) => {
        res.send(copyOfDeletedTweet)
    });
});

// update route
app.put("/tweets/:id", (req, res) => {
    // {new: true} --> sends us updated tweet instead of old tweet
    Tweet.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, tweet) => {
            res.send(tweet);
    });
});

// create route
app.post("/tweets", (req, res) => {
    Tweet.create(req.body, (err, tweet) => {
        res.send(tweet);
    }); // this code runs asynchronously (runs while other code runs)
});

// show route

app.get("/tweets/:id", (req, res) => {
    Tweet.findById(req.params.id, (err, foundTweet) => {
        res.send(foundTweet);
    });
});

// Tell app to listen for client requests

app.listen(PORT, () => {   
    console.log("Express is listening for requests on port " + PORT);
});
