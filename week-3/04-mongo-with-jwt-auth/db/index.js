const { type } = require("express/lib/response");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt =require("jsonwebtoken")

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.error("Failed to connect Error : " + err));

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  name: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  name: String,
  password: String,
  courses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "course",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
