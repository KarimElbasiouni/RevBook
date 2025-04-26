# RevBook - Online Bookshop API

## Overview
RevBook is a RESTful API for an online bookshop, built with Node.js and Express. It provides endpoints for browsing books, managing user accounts, and submitting book reviews.

## Technologies Used
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **JWT (jsonwebtoken)**: Authentication and authorization
- **Express-session**: Session management
- **Axios**: HTTP client for making requests
- **Nodemon**: Development dependency for auto-restarting the server

## Project Structure
```
final_project/
├── index.js              # Entry point & server configuration
├── package.json          # Project metadata & dependencies
├── router/
│   ├── auth_users.js     # Authentication routes & logic
│   ├── booksdb.js        # Book database
│   └── general.js        # Public routes
```

## Features
- **User Authentication**
  - User registration
  - User login with JWT
  - Session management

- **Book Management**
  - Browse complete book catalog
  - Search books by ISBN
  - Search books by author
  - Search books by title

- **Review System**
  - Add reviews to books (authenticated users only)
  - Delete reviews (authenticated users only)
  - View book reviews

## API Endpoints

### Public Endpoints
- `POST /register` - Register a new user
- `GET /` - Get all books
- `GET /isbn/:isbn` - Get book by ISBN
- `GET /author/:author` - Get book by author
- `GET /title/:title` - Get book by title
- `GET /review/:isbn` - Get reviews for a book

### Authenticated Endpoints
- `POST /customer/login` - User login
- `PUT /customer/auth/review/:isbn` - Add a book review
- `DELETE /customer/auth/review/:isbn` - Delete a book review

## Authentication Flow
The application uses JWT (JSON Web Tokens) for authentication:
1. Users register with a username and password
2. Upon login, a JWT token is generated and stored in the session
3. Protected routes verify the token before granting access
4. The token expires after 1 hour

## Data Structure
- **Users**: Array of user objects with username and password
- **Books**: Object with ISBN as keys and book details as values
  - Each book contains: author, title, and reviews
  - Reviews are stored as an object with username as keys

## Setup and Installation
1. Clone the repository
2. Install dependencies:
   ```
   cd final_project
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. The server will run on `http://localhost:5000`

## Development
- The server uses Nodemon to automatically restart when files are changed
- APIs are structured in a modular way for maintainability

## License
This project is licensed under the MIT License.