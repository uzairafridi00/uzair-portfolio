# Personal Website (React + FastAPI)

This project is a personal website showcasing expertise in **Machine Learning**, built with:

* **Frontend**: React + Vite + TailwindCSS
* **Backend**: FastAPI
* **Deployment-ready**: Docker (optional)

---

## 📂 Project Structure

```
uzair-portfolio/
│
├── backend/                   # FastAPI backend
│   ├── app/
│   │   ├── main.py             # Entry point
│   │   ├── api/
│   │   │   ├── routes.py       # All API endpoints
│   │   ├── models/             # Pydantic models
│   │   ├── services/           # ML models, business logic
│   │   └── database.py         # If using a DB
│   ├── tests/                  # Backend tests
│   ├── requirements.txt        # Python deps
│   └── Dockerfile
│
├── frontend/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Navbar, Footer, Cards, etc
│   │   ├── pages/              # Home, About, Projects, Contact
│   │   ├── services/           # API calls to FastAPI
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml          # Orchestrate frontend + backend
└── README.md

```

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd personal-website
```

---

### 2. Backend (FastAPI)

#### Create virtual environment

```bash
cd backend
python -m venv venv
```

#### Activate environment

* **Windows**

```bash
venv\Scripts\activate
```

* **Mac/Linux**

```bash
source venv/bin/activate
```

#### Install dependencies

```bash
pip install fastapi uvicorn
pip install "fastapi[all]"   # Optional: for CORS, email, etc.
```

#### Run FastAPI server

```bash
uvicorn main:app --reload
```

Backend runs at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

### 3. Frontend (React + Tailwind)

#### Create React app using Vite

```bash
cd ../frontend
npm create vite@latest .
```

When prompted:

* **Framework**: `react`
* **Variant**: `javascript` (or typescript if you prefer)

#### Install dependencies

```bash
npm install
```

#### Install TailwindCSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Configure Tailwind

In `tailwind.config.js`, set content:

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

In `src/index.css` (or `src/main.css`), add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Run React frontend

```bash
npm run dev
```

Frontend runs at: [http://localhost:5173](http://localhost:5173)

---

## ✅ Now You Have

* Backend API at **[http://127.0.0.1:8000](http://127.0.0.1:8000)**
* Frontend UI at **[http://localhost:5173](http://localhost:5173)**
* Ready to connect React to FastAPI via `axios` or `fetch`
