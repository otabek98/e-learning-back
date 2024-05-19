const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static("public"));
// enable cors
app.use(cors({ origin: "*" }));

// env config
dotenv.config();

// MongoDB database
const uri = process.env.DB;

// Set Port
const PORT = process.env.PORT || 5050;

app.use(bodyParser.json({ limit: "50mb" }));

// Parse application/x-www-form-urlencoded requests
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.set("strictQuery", true);
mongoose
  .connect(uri)
  .then(() => console.log("MongoDb connected!"))
  .catch((err) => console.log("Connection Failed", err?.message));

// routes and controllers here
const userRoute = require("./routes/user");
const courseRoute = require("./routes/course");
const sectionRoute = require("./routes/section");
const lessonRoute = require("./routes/lesson");
// file-upload
const fileUpload = require("./controllers/file-upload");

app.use("/api/user", userRoute);
app.use("/api/course", courseRoute);
app.use("/api/section", sectionRoute);
app.use("/api/lesson", lessonRoute);
app.use("/api/fileUpload", fileUpload);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!!!`);
});
