# 🔗 MemLink

MemLink is a modern URL management platform that allows users to create secure, memorable, and intelligent short links with real-time analytics, password protection, QR code generation, and Redis-powered performance optimization.

## 🚀 Live Demo

🌐 Frontend: https://memlinkapp.onrender.com

⚙️ Backend API: https://memlink-backend.onrender.com

---

## ✨ Features

### 🔐 Authentication
- JWT Authentication
- Secure password hashing using bcrypt
- Protected user routes

### 🔗 Link Management
- Create short URLs
- Custom aliases
- Automatic alias generation
- Edit and delete links
- Link expiration support

### 🔒 Secure Links
- Password-protected URLs
- Temporary unlock tokens
- Redis-backed secure validation

### 📊 Analytics
- Total clicks
- Browser statistics
- Device statistics
- Operating system analytics
- Referrer analytics
- Recent click history
- Dashboard overview

### ⚡ Performance
- Redis caching
- Cached redirects
- Cache invalidation
- Fast URL resolution

### 📱 Additional Features
- QR Code generation
- Responsive dashboard
- Search and sorting
- Pagination
- User-friendly UI

---

# 🛠 Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- React Hot Toast
- Lucide React

## Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Redis
- JWT
- bcrypt

## DevOps
- Render
- Git & GitHub

---

# 📂 Project Structure

```
MemLink/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── config/
│   └── prisma/
│
└── README.md
```

---

# ⚙ Environment Variables

## Backend

```env
PORT=
DATABASE_URL=
JWT_SECRET=
REDIS_URL=
CLIENT_URL=
```

## Frontend

```env
VITE_API_URL=
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/ganesh1229/memlink.git
```

### Backend

```bash
cd server

npm install

npx prisma migrate dev

npm run dev
```

### Frontend

```bash
cd client

npm install

npm run dev
```

---

# 📈 Dashboard

Users can monitor:

- Total Links
- Total Clicks
- Today's Clicks
- Top Performing Links
- Browser Distribution
- Device Distribution
- Referrer Statistics
- Recent Activity

---

# 🔐 Security

- JWT Authentication
- Password-protected Links
- bcrypt Password Hashing
- Redis-based Unlock Tokens
- Input Validation
- Protected Routes

---

# 📌 Future Improvements

- Custom Domains
- AI Alias Suggestions
- Team Workspaces
- Bulk Link Creation
- API Keys
- Webhooks

---

# 👨‍💻 Author

Ganesh

GitHub: https://github.com/ganesh1229
