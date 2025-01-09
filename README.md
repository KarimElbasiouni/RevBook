# Book Review Application

This is a Node.js and Express-based server-side application for managing book reviews. The application features a REST API for user registration, authentication, and handling book-related operations such as fetching book details, adding reviews, and more.

## Features
- User registration and session-based authentication using JWT (JSON Web Tokens).
- REST API endpoints for:
  - Retrieving the book catalog.
  - Fetching book details by ISBN, title, or author.
  - Adding and deleting book reviews.
- Modular and scalable code structure.

## Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/KarimElbasiouni/RevBook.git
   cd RevBook/final_project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node index.js
   ```

4. The server will be running on `http://localhost:5000`.

## API Endpoints
### Public Endpoints
1. **Register a New User**
   - **POST** `/register`
   - Request Body:
     ```json
     {
       "username": "your-username",
       "password": "your-password"
     }
     ```

2. **Get All Books**
   - **GET** `/`

3. **Get Book Details by ISBN**
   - **GET** `/isbn/:isbn`

4. **Get Book Details by Author**
   - **GET** `/author/:author`

5. **Get Book Details by Title**
   - **GET** `/title/:title`

6. **Get Book Reviews**
   - **GET** `/review/:isbn`

### Protected Endpoints (Authentication Required)
1. **Login**
   - **POST** `/customer/login`
   - Request Body:
     ```json
     {
       "username": "your-username",
       "password": "your-password"
     }
     ```

2. **Add a Book Review**
   - **PUT** `/customer/auth/review/:isbn?review=YourReview`

3. **Delete a Book Review**
   - **DELETE** `/customer/auth/review/:isbn`

## Project Structure
```
.
├── node_modules/           # Installed dependencies (ignored in .gitignore)
├── router
│   ├── auth_users.js       # Routes and logic for authenticated users
│   ├── booksdb.js          # Book database
│   ├── general.js          # General (public) routes
├── index.js               # Main server file
├── package.json            # Project dependencies
└──  README.md               # Project documentation
```

## Dependencies
The following npm packages are used in this project:
- `express`: Web framework for Node.js.
- `jsonwebtoken`: For generating and verifying JWT tokens.
- `axios`: For making HTTP requests.
- `express-session`: For managing user sessions.

├── axios@1.7.9
├── express-session@1.18.1
├── express@4.21.2
├── jsonwebtoken@9.0.2
└── nodemon@3.1.9

## Notes
- The `node_modules` directory is excluded from version control and should not be pushed to the repository.
- All API responses are in JSON format.

