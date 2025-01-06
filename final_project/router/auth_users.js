const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
}

//check if username and password match the one we have in records
const authenticatedUser = (username,password)=>{ 
  const user = users.find(user => 
    user.username === username && user.password === password 
  )

  if (user){
    return true;
  }
  return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password){
    return res.status(403).json({message: "Error logging in"})
  }

  if(authenticatedUser(username,password)){
    let accessToken = jwt.sign(
      {data: username },
      "access",
      {expiresIn : 60*60}
    )

    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).json({message: "User successfully logged in"})
  }
  return res.status(401).json({message: "Invalid username or password"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
