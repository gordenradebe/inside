const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const config = require("./Chatbot/config/keys");
// const mongoose = require("mongoose");
// mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/dialogflow', require('./Chatbot/routes/dialogflow'));

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  console.log('sartuday', process.env.NODE_ENV);

  // Set static folder
    app.use(express.static("mxero/build"));

  // index.html for all page routes
   app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "mxero", "build", "index.html"));
 });
}

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
