const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(methodOverride("_method"));

// Mongoose/MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", (error) => console.log("Connected to MongoDB"));

//Import Routes

// app.get("/", pizzaRoute);

// app.use("/pizza", pizzaRoute);

// Get All Pizza
const pizzaRoute = require("./routes/pizza");

// app.get("/", pizzaRoute);
app.use("/", pizzaRoute);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
