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
  const isbn = req.params.isbn;
  const book = books[isbn];
  const review = req.query.review;
  const username = req.session.authorization && req.session.authorization.username;
  if(!username){
    return res.status(401).json({message: "Not authorized"})
  }
  if(!book){
    return res.status(400).json({message: "ISBN not found"})
  }
  if(!review){
    return res.status(403).json({message: "Cannot leave empty review"})
  }
  book.reviews[username] = review;
  return res.status(200).json({message: "Book review successfully added"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
