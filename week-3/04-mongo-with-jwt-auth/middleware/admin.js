// Middleware for handling auth
const { default: mongoose } = require("mongoose");
const { Admin: adminModel } = require("../db/index.js");
const validate = require("../db/validate.js");




// async function adminMiddleware(req, res, next) {
//   // Implement admin auth logic
//   // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
//   const username = req.headers.username;
//   const password = req.headers.password;

//   const qres = await adminModel.findOne({ name: username, password: password });

//   if (!qres) {
//     res.status(400).send("User not registered!");
//   }
//   next();
// }

async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const username = req.headers.username;
  const password = req.headers.password;

  const qres =await validate(adminModel,username,password);

  if (!qres) {
    res.status(400).send("User not registered!");
    return;
  }
  next();
}

module.exports = adminMiddleware;
