const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin } = require("../db");
const { Course } = require("../db");
const validate = require("../db/validate");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Admin Routes

var username = "";
var password = "";

// middleware to handle assignment of pass,username
function getCredentials(req, res, next) {
  try {
    username = req.headers.username;
    password = req.headers.password;
  } catch (e) {
    console.log("enter credentials properly !");
  }
  next();
}

// middleware to handle assignment of headers by decoding of jwt

function parseJwt(req, res, next) {
  try {
    // Get the Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new Error("Authorization header not found");
    }

    // Extract the token from the "Bearer " prefix
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token not found");
    }

    console.log("Token:", token);

    // Decode the token
    const decoded = jwt.decode(token);
    console.log(decoded);
    if (!decoded) {
      throw new Error("Failed to decode token");
    }

    // Extract username (assuming the username is stored in the token)
    const username = decoded.username;
    req.headers["username"] = username;

    console.log("Decoded Token:", decoded);

    // Optionally, verify the token (requires a secret key)
    const verified = jwt.verify(token, process.env.SECRET);
    console.log("Verified Token:", verified);

    if (!verified) {
      res.status(400).json({ msg: "Invalid token" });
      return;
    }
  } catch (err) {
    console.log(`Can't decode token. Error: ${err.message}`);
    res.status(400).json({ msg: "Invalid token" });
    return;
  }

  next();
}

router.post("/signup", getCredentials, async (req, res) => {
  // Implement admin signup logic

  if (await validate(Admin, username, password)) {
    res.status(400).json({ msg: "Already registered !" });
    return;
  }
  console.log("Creating " + username);
  Admin.create({ name: username, password: password })
    .then(() => {
      res.status(200).json({ msg: "User registration successfull" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error" + err });
    });
});

router.post("/signin", getCredentials, async (req, res) => {
  // Implement admin signup logic

  if (!(await validate(Admin, username, password))) {
    res.status(400).json({ msg: "User not registered" });
    return;
  }
  console.log("Signing in.. Checking credentials ... " + username);
  try {
    const tokenResponse = jwt.sign({ username: username }, process.env.SECRET);
    console.log("success " + username + " redirecting...");
    const decoded = jwt.decode(tokenResponse);
    console.log(decoded);
    //res.status(200).redirect("/admin/courses");
    res.status(200).json({ token: tokenResponse });
  } catch (err) {
    res.status(400).json({ web: "something went wrong in credentials" });
  }
});

router.use(parseJwt);

router.post("/courses", async (req, res) => {
  // Implement course creation logic
  console.log(req.body + "\n creating course...");
  const resp = await Course.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageLink: req.body.imageLink,
  });
  console.log(resp);
  if (!resp) res.status(400).send("cant create");
  else res.send("created successfully");
});

router.get("/courses", (req, res) => {
  // Implement fetching all courses logic
  
});

module.exports = router;
