const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  
  const { username , password } = req.body;
  if(username || password){
    const matchingUser = users.find(user => user.username === username );
    if (!matchingUser) {
      users.push({"username" : username, "password": password});
      res.send("Registration successful");
      return res.status(200).json({message: "User successfully registered"});
    } else{
      res.send("Username is already taken");
      return res.status(409).json({message: "Username is already taken. Please choose a different one"});
    }

  } else{
    res.send("Please enter both username and password")
    return res.status(400).json({message: "Username and Password are required"})
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books));
  return res.status(200).json({message: "Books successfully printed"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn]
  if (book){
    res.send(JSON.stringify(book));
    return res.status(200).json({message: `Book with an ISBN of ${isbn} successfully printed as ${book}`});
  }
    res.send("Book not found")
    return res.status(404).json({message: `Book with an ISBN of ${isbn} not found`});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  const author = req.params.author;

  //Handles case where author is Unknown in books database
  if (author === "Unknown"){
    res.send("Please enter a valid author name")
    return res.status(404).json({message: `Invalid author name`})
  }


  const book = Object.values(books).find(book => book.author === author);
  if (book){
    res.send(JSON.stringify(book));
    return res.status(200).json({message: `Book authored by ${author} successfully printed as ${book}`});
  }
    res.send("Book not found")
    return res.status(404).json({message: `Book authored by ${author} not found`});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  


  const book = Object.values(books).find(book => book.title === title);
  if (book){
    res.send(JSON.stringify(book));
    return res.status(200).json({message: `Book titled ${title} successfully printed as ${book}`});
  }
    res.send("Book not found")
    return res.status(404).json({message: `Book titled ${title} not found`});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn]
  if (book){
    res.send(JSON.stringify(book.reviews));
    return res.status(200).json({message: `Reviews of book with an ISBN of ${isbn} successfully printed as ${book.reviews}`});
  }
    res.send("Book not found")
    return res.status(404).json({message: `Book with an ISBN of ${isbn} not found`});
});

module.exports.general = public_users;
