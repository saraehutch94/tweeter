// 1. Require dependencies

const mongoose = require("mongoose");

// 2. Define a mongoose Schema

// blueprint that defines document that will be inserted into database
const tweetSchema = new mongoose.Schema({
    title: String, // field and data type
    body: String,
    author: String,
    likes: { type: Number, default: 0}, // if number isn't provided, goes with default
    sponsored: { type: Boolean, default: false}, // if sponsored isn't true, will go with default (false)
    // createdAt: Date,
    // updatedAt: Date,

    // (Schema) options object:
}, { timestamps: true }); // mongoose manages createdAt and updatedAt fields for you
// by default, timestamps is set to false


// 3. Compile mongoose Schema into a mongoose model

module.exports =  mongoose.model("Tweet", tweetSchema);

/* methods available now because of one line of code written above:

Tweet.create() --> creates new entry in database (new Tweet)
Tweet.find() --> whole collection of tweets
Tweet.findById()
Tweet.findOne()
Tweet.findByIdAndUpdate()
Tweet.findByIdAndDelete()

*/

// 4. Use mongoose model methods to perform CRUD data operations
// on a mongoDB collection