const { default: axios } = require('axios');
const express = require('express');
let users = require("./auth_users.js").users;
const public_users = express.Router();

const BOOKS_API_URL = 'http://localhost:5000/books'

public_users.post("/register", (req,res) => {
  //Write your code here
  
  const { username , password } = req.body;
  if(username || password){
    const matchingUser = users.find(user => user.username === username );
    if (!matchingUser) {
      users.push({"username" : username, "password": password});;
      return res.status(200).json({message: "User successfully registered"});
    } else{
      return res.status(409).json({message: "Username is already taken. Please choose a different one"});
    }

  } else{
    return res.status(400).json({message: "Username and Password are both required"})
  }
});

// Get the book list available in the shop

public_users.get('/', async function (req, res) {
  try{
    const response = await axios.get(BOOKS_API_URL);
    const books = response.data;
    return  res.status(200).json({books});
  }catch (error){
    console.log("Error is: " + error)
    return res.status(500).json({message: "Failed to fetch books"});
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  try{
    const response = await axios.get(BOOKS_API_URL);
    const books = response.data;
    const book = books[isbn]
    res.status(200).json({books});
    if (book){
      return res.status(200).json({ book });
    }
    return res.status(404).json({message: `Book with an ISBN of ${isbn} not found`});
  }catch {
    return res.status(500).json({message: "Failed to fetch books"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  try{
    const response = await axios.get(BOOKS_API_URL);
    const books = response.data;
    const author = req.params.author;

    //Handles case where author is Unknown in books database
    if (author === "Unknown"){
      return res.status(404).json({message: `Author name of Unknown is an invalid author name.`})
    }

  
    const book = Object.values(books).find(book => book.author === author);
    if (book){
      return res.status(200).json({book});
    }
    return res.status(404).json({message: `Book authored by ${author} not found`});
  } catch{
    return res.status(500).json({message: "Failed to fetch books"});
  }
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  try{
    const response = await axios.get(BOOKS_API_URL);
    const books = response.data;
    const title = req.params.title;
    const book = Object.values(books).find(book => book.title === title);
    if (book){
      return res.status(200).json({book});
    }
    return res.status(404).json({message: `Book titled ${title} not found`});
  }catch{
    return res.status(500).json({message: "Failed to fetch books"});
  }
});

//  Get book review
public_users.get('/review/:isbn',async function (req, res) {
  try{
    const response = await axios.get(BOOKS_API_URL);
    const books = response.data;
    const book = books[isbn];
    const isbn = req.params.isbn;
    if (book){
      return res.status(200).json({reviews: book.reviews});
    }
    return res.status(404).json({message: `Book with an ISBN of ${isbn} not found`});
  }catch{
    return res.status(500).json({message: "Failed to fetch books"});
  }
});

module.exports.general = public_users;
