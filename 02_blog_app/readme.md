# Blog App

A simple blog backend built with Node.js, Express, and MongoDB.  
This app supports posts, likes, and comments. When a user likes or comments on a post, the like or comment is also reflected in the post's data.

## Features

- **Posts**: Create and retrieve blog posts.
- **Likes**: Like or unlike a post. Likes are tracked and shown on the post.
- **Comments**: Add comments to posts. Comments are tracked and shown on the post.

## Project Structure

```
02_blog_app/
│
├── app.js
├── package.json
├── .env
├── config/
│   └── db.config.js
├── controllers/
│   ├── comment.controller.js
│   ├── like.controller.js
│   └── post.controller.js
├── models/
│   ├── comment.model.js
│   ├── like.model.js
│   └── post.model.js
└── routes/
    ├── comment.route.js
    ├── like.route.js
    └── post.route.js
```

## Models

- **Post**: Contains `text`, `body`, and arrays of `likes` and `comments`.
- **Like**: Contains `post` (reference to Post) and `user`.
- **Comment**: Contains `post` (reference to Post), `user`, and `body`.

When a like or comment is created, its ID is pushed to the corresponding post's `likes` or `comments` array.

## API Endpoints

### Posts

- `POST /api/v1/posts/create`  
  Create a new post.

- `GET /api/v1/posts/retrieve`  
  Retrieve all posts.

### Likes

- `POST /api/v1/likes/like`  
  Like a post.

- `GET /api/v1/likes/unlike`  
  Unlike a post.

### Comments

- `POST /api/v1/comments/create`  
  Add a comment to a post.

- `GET /api/v1/comments/retrieve`  
  Retrieve comments for a post and user.

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with your MongoDB URI:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=4000
   ```
4. Start the server:
   ```sh
   npx nodemon
   ```
