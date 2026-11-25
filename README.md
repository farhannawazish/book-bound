# Book-Bound

A full-stack community blogging platform where anyone can browse, search, and read articles freely without an account, while verified registered members can write posts with live Markdown previews, comment, and manage their own articles.

---

## Key Features

- **Public Read Access**: Instant access to the editorial feed, single article reading, search, and tag filtering without logging in.
- **Secure Email Verification**: Account registration with 6-digit OTP verification and automated welcome emails powered by Nodemailer.
- **Member Publishing Studio**: Protected post creation with live Markdown preview, plus author-only edit and delete controls.
- **Community Discussions**: Public comment viewing and authenticated comment posting.
- **Production Hardened**: JWT authentication, bcrypt password hashing, Helmet security headers, and auth rate limiting.

---

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, React Markdown
- **Backend**: Node.js, Express.js, JWT, Nodemailer, Helmet
- **Database**: MongoDB & Mongoose

---

## Folder Structure

```text
Book-Bound/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection setup
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT route protection middleware
│   ├── models/
│   │   ├── User.js             # User & OTP schema
│   │   ├── Post.js             # Blog post schema & slug generator
│   │   └── Comment.js          # Article comment schema
│   ├── routes/
│   │   ├── authRoutes.js       # Register, verify-otp, and login routes
│   │   ├── postRoutes.js       # Post CRUD, search, and tag filtering
│   │   └── commentRoutes.js    # Comment retrieval and creation
│   ├── utils/
│   │   └── sendEmail.js        # Nodemailer email helper
│   ├── .env.example            # Environment variables template
│   ├── package.json            # Backend dependencies & scripts
│   └── server.js               # Express app entry point
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx          # Editorial navigation bar
    │   │   ├── PostCard.jsx        # Blog post summary card
    │   │   ├── PostEditor.jsx      # Shared Markdown editor & preview
    │   │   └── ProtectedRoute.jsx  # Authenticated route guard
    │   ├── config/
    │   │   └── api.js              # API base URL configuration
    │   ├── context/
    │   │   └── AuthContext.jsx     # Auth state & localStorage sync
    │   ├── pages/
    │   │   ├── Home.jsx            # Public feed, search & category filter
    │   │   ├── PostDetail.jsx      # Full article view & author controls
    │   │   ├── CreatePost.jsx      # Protected post creation studio
    │   │   ├── EditPost.jsx        # Protected post editing page
    │   │   ├── Login.jsx           # User login page
    │   │   ├── Register.jsx        # User registration page
    │   │   └── VerifyOtp.jsx       # 6-digit email OTP verification page
    │   ├── App.jsx                 # Router & layout setup
    │   ├── index.css               # Tailwind & typography styles
    │   └── main.jsx                # React DOM entry point
    ├── index.html
    ├── package.json
    ├── vercel.json                 # SPA rewrite rules for Vercel
    └── vite.config.js
```

---

## Local Setup & Installation Guide

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas cluster)
- A Gmail account with 2-Step Verification enabled (for Nodemailer OTP & welcome emails)

### Step 1: Clone the Repository

```bash
git clone https://github.com/farhannawazish/Book-Bound.git
cd Book-Bound
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder and add the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/book-bound
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_gmail_app_password
```

> **How to generate a Google App Password for Nodemailer:**
> 1. Go to your [Google Account Security settings](https://myaccount.google.com/security).
> 2. Enable **2-Step Verification** if it is not already turned on.
> 3. Search for **App passwords** in the Google Account search bar.
> 4. Create a new app password (for example, named `Book-Bound`), copy the 16-character password, and paste it as `EMAIL_PASS` in your `.env` file.

### Step 3: Frontend Setup

Open a new terminal from the project root and set up the frontend:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000
```

### Step 4: Run Both Servers

Start the backend server (from `backend/`):

```bash
npm run dev
# or: node server.js
```

Start the frontend development server (from `frontend/`):

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser. The backend API runs on `http://localhost:5000`.

---

## API Endpoints Overview

### Auth Routes (`/api/auth`)

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Register a new user and send a 6-digit verification OTP |
| `POST` | `/api/auth/verify-otp` | Public | Verify email OTP, send welcome email, and return JWT + user |
| `POST` | `/api/auth/login` | Public | Authenticate verified user and return JWT + user |

### Post Routes (`/api/posts`)

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/posts` | Public | Fetch all posts (supports `?search=` and `?tag=`) |
| `GET` | `/api/posts/:slug` | Public | Fetch a single post by its URL slug |
| `POST` | `/api/posts` | Protected | Create a new blog post (requires Bearer JWT) |
| `PUT` | `/api/posts/:id` | Protected (Owner) | Update an existing post (author only) |
| `DELETE` | `/api/posts/:id` | Protected (Owner) | Delete a post (author only) |

### Comment Routes (`/api/comments`)

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/comments` | Public | Fetch comments for a post |
| `POST` | `/api/comments` | Protected | Add a comment to a post (requires Bearer JWT) |

---

## Contributing & License

Contributions are welcome! To contribute to Book-Bound:

1. **Fork** the repository on GitHub.
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes** with clear, descriptive messages:
   ```bash
   git commit -m "Add your feature description"
   ```
4. **Push to your fork** and **open a Pull Request** describing your changes.

This project is licensed under the **MIT License**.
