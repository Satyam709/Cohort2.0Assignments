const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin } = require("../db");
const validate = require("../db/validate");
// Admin Routes
router.post("/signup",async (req, res) => {
  // Implement admin signup logic

  const username = req.headers.username;
  const password = req.headers.password;

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

router.post("/signin", (req, res) => {
  // Implement admin signup logic
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
});

module.exports = router;
