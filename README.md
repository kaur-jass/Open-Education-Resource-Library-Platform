# 📚 OER Commons Portal

**A Modern, High-Density Discovery Platform for Open Educational Resources.**

OER Commons Portal is a centralized hub built for students and educators to access vetted resources across 20+ subject areas. Architected as a **microservices monorepo**, it enables scalable, modular, and efficient resource discovery.

---

## 🏗️ Architecture Overview

The platform uses an **API Gateway** as the single entry point.

```text
┌─────────────┐
│   Client     │  React 18 + Tailwind CSS (Port 3000)
└──────┬───────┘
       │
┌──────▼───────┐
│  API Gateway  │  Express + http-proxy-middleware (Port 5000)
└──────┬───────┘
       │
┌──────▼────────────────────────────────────────────────────┐
│                    Downstream Services                     │
├──────────────┬──────────────┬──────────────┬──────────────┤
│ auth :5001   │ resource:5002│ user :5003   │ search :5004 │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

---

## 🚀 Key Features

* 🔍 **Global Discovery Hub** — Browse resources across 20+ subject categories
* 🧠 **Intelligent Search** — Integrated with OER APIs for deep discovery
* ⚙️ **Microservices Backend** — Scalable, modular architecture
* 🎨 **Modern UI/UX** — Built with React + Tailwind CSS
* ♿ **Accessible Design** — High readability and responsive layout

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kaur-jass/Open-Education-Resource-Library-Platform.git
cd Open-Education-Resource-Library-Platform
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Run the Platform (Open 3 Terminals)

```bash
# Terminal 1: API Gateway
npm run dev --workspace=services/gateway

# Terminal 2: Resource Service
npm run dev --workspace=services/resource

# Terminal 3: Frontend
npm run start --workspace=frontend
```

---

## 🔧 API Gateway Fix (`services/gateway/index.js`)

This configuration resolves the **"Unexpected token <"** error by properly routing API requests.

```javascript
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// Health Check
app.get('/health', (req, res) => res.json({ status: "Gateway Healthy" }));

// Proxy /api/resources → Resource Service
app.use('/api/resources', createProxyMiddleware({ 
  target: 'http://localhost:5002', 
  changeOrigin: true,
  pathRewrite: {
    '^/api/resources': '/api/resources',
  },
}));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Gateway running on http://localhost:${PORT}`));
```

---

## 🔧 Resource Service Setup (`services/resource/server.js`)

Ensure the resource service runs on the correct port.

```javascript
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Add your routes here...

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`📦 Resource Service active on port ${PORT}`));
```

---

## 🌍 Deployment Guide

### 🔹 Backend (Render)

* Create **2 Web Services**:

  * Gateway → Port **5000**
  * Resource Service → Port **5002**

---

### 🔹 Frontend (Vercel)

Set environment variable:

```env
REACT_APP_API_URL=https://your-gateway-url.onrender.com
```

---

### 🔹 Database (MongoDB Atlas)

* Create cluster
* Add connection string in `.env`:

```env
MONGO_URI=your_mongodb_connection_string
```

---

## ✅ Deployment Checklist

* [ ] Push code to GitHub
* [ ] Setup MongoDB Atlas
* [ ] Deploy Gateway (Render)
* [ ] Deploy Resource Service (Render)
* [ ] Deploy Frontend (Vercel)
* [ ] Update API URLs
* [ ] Test upload + fetch

---

## ⚠️ Common Issues & Fixes

| Issue                  | Fix                        |
| ---------------------- | -------------------------- |
| `Unexpected token <`   | Fix API Gateway routing    |
| 404 API error          | Wrong backend URL          |
| Upload fails           | Use `multipart/form-data`  |
| CORS error             | Enable `cors()` in backend |
| Images/PDF not loading | Serve `/uploads` folder    |

---

## 📜 License

Distributed under the **MIT License**.

---

## 🚀 Future Enhancements

* 🔐 Authentication (JWT)
* ⭐ Ratings & Reviews
* ❤️ Bookmark / Save resources
* 📊 Trending algorithm
* ☁️ Cloud file storage (Cloudinary/Firebase)
* 🤖 AI-based recommendations

---

### 💡 Built with MERN Stack + Microservices Architecture
