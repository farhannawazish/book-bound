# BookBound

BookBound is a community blogging website built with Node.js, Express, MongoDB, and React.

The platform allows anyone to read blogs freely without creating an account. Only registered and logged-in users can write and publish new blogs.

---

## Features

- Public reading: Visitors can read any blog post without logging in.
- User authentication: Users can create an account and log in securely using JSON Web Tokens (JWT).
- Protected publishing: Only authenticated users can write and publish blog posts.
- Search and filtering: Readers can search for blogs by keyword or filter by topic tags.
- Clean URLs: Blog posts automatically generate clean, readable URL slugs from titles.
- Responsive layout: Works smoothly on desktop and mobile screens.

---

## Tech Stack

### Backend
- Node.js (with ES Module syntax)
- Express.js (web framework)
- MongoDB and Mongoose (database and data modeling)
- JSON Web Token (JWT) (authentication)
- bcryptjs (password hashing)
- dotenv and cors

### Frontend
- React 19
- Vite (build tool and development server)
- Lucide React (icons)
- Pure CSS with custom variables for typography and colors

---

## Project Structure

```text
book-bound/
|-- .env.example              # Environment variables template
|-- package.json              # Backend dependencies and scripts
|-- server/
|   |-- config/
|   |   `-- db.js             # MongoDB connection logic
|   |-- middleware/
|   |   `-- authMiddleware.js # JWT verification middleware
|   |-- models/
|   |   |-- User.js           # User schema
|   |   |-- Post.js           # Blog post schema
|   |   `-- Comment.js        # Comment schema
|   |-- routes/
|   |   |-- authRoutes.js     # Register and login routes
|   |   `-- postRoutes.js     # Post routes (GET and POST)
|   |-- server.js             # Main backend server file
|   `-- index.js              # Server starter file
`-- client/
    |-- package.json          # Frontend dependencies
    |-- vite.config.js        # Vite configuration
    |-- index.html            # Main HTML document
    `-- src/
        |-- context/
        |   `-- AuthContext.jsx       # User authentication state
        |-- services/
        |   `-- api.js                # API request helpers
        |-- components/
        |   |-- Navbar.jsx            # Header navigation
        |   |-- FeaturedArticle.jsx   # Top featured story
        |   |-- TagFilter.jsx         # Search and tag selector
        |   |-- PostCard.jsx          # Post card preview
        |   |-- PostDetail.jsx        # Single blog reading view
        |   |-- WritePostModal.jsx    # Blog creation form
        |   |-- AuthModal.jsx         # Login and registration modal
        |   `-- Footer.jsx            # Page footer
        |-- App.jsx                   # Main React component
        |-- main.jsx                  # React application entry point
        `-- index.css                 # Global styling rules
```

---

## Installation and Setup

### Prerequisites
Make sure you have the following installed on your computer:
- Node.js (version 18 or higher)
- MongoDB (running locally or a MongoDB Atlas connection string)

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/book-bound.git
cd book-bound
```

---

### Step 2: Configure Environment Variables

Create a file named `.env` in the root folder by copying the example template:

```bash
cp .env.example .env
```

Open `.env` and verify the values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/book-bound
JWT_SECRET=your_jwt_secret_key_here
```

---

### Step 3: Install Backend Dependencies

From the root folder, run:

```bash
npm install
```

---

### Step 4: Install Frontend Dependencies

Navigate into the `client` directory and install its dependencies:

```bash
cd client
npm install
cd ..
```

---

### Step 5: Run the Project

You need two terminal windows: one for the backend server and one for the frontend client.

#### Terminal 1: Start Backend Server
From the root directory:

```bash
npm run dev
```

The backend server will run on `http://localhost:5000`.

#### Terminal 2: Start Frontend Client
From the `client` directory:

```bash
cd client
npm run dev
```

The frontend client will run on `http://localhost:5173`. Open this URL in your web browser.

---

## API Endpoints

### Authentication Routes

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Register a new user with name, email, and password |
| POST | `/api/auth/login` | Public | Log in with email and password, returns JWT token |

### Blog Post Routes

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/api/posts` | Public | Get all blog posts sorted by newest first |
| GET | `/api/posts/:slug` | Public | Get a single blog post by its URL slug |
| POST | `/api/posts` | Private | Create a new blog post (requires Bearer token) |

---

## How It Works

1. Visitors arrive at the website and can immediately browse and read published posts.
2. Clicking on any card opens the complete article view with reading time and author information.
3. Visitors who want to write a post can click the Sign In button in the navigation bar to log in or create an account.
4. Once logged in, the navigation button changes to Write Blog.
5. Logged-in users can draft a title, excerpt, tags, and Markdown content, then publish directly to the community feed.

---

## License

This project is open source and available under the ISC License.
