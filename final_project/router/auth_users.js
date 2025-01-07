const express = require('express');
const jwt = require('jsonwebtoken');
const {default: axios }  = require('axios');
const regd_users = express.Router();

const BOOKS_API_URL = 'http://localhost:5000/books'

let users = [];



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
regd_users.put("/auth/review/:isbn", async (req, res) => {
  try{
    const response = await axios.get(BOOKS_API_URL);
    const books = response.data;
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
  }catch{
    return res.status(500).json({message: "Failed to fetch books"});
  }
});

regd_users.delete("/auth/review/:isbn", async (req, res) => {
  try{
    const response = await axios.get(BOOKS_API_URL);
    const books = response.data;
    const isbn = req.params.isbn;
    const book = books[isbn];
    const username = req.session.authorization && req.session.authorization.username;

    if(!username){
      return res.status(401).json({message: "Not authorized"})
    }
    if(!book){
      return res.status(400).json({message: "ISBN not found"})
    }
    if(book.reviews[username]){
      delete book.reviews[username];
      return res.status(200).json({message: "Book review successfully deleted"})
    }
    return res.status(400).json({message: "Review does not exist"})

  }catch{
    return res.status(500).json({message: "Failed to fetch books"});
  }
});


module.exports.authenticated = regd_users;
module.exports.users = users;
