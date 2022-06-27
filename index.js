require('dotenv').config();
const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const app = express();
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL
const Schema = mongoose.Schema;
const port = process.env.PORT || 3000;

app.use(json());
app.use(express.urlencoded());

app.use("/", routes);

mongoose.connect(mongoString,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
