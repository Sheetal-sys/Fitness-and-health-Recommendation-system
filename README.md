# 🏋️ Fitness & Health Recommendation System

An AI-powered fitness and health recommendation web application built with **FastAPI** (backend) and **React + Vite** (frontend).

---

## 🚀 Features

- 🤖 ML-powered personalized fitness & diet recommendations
- 📊 Progress tracking with interactive charts
- 🔐 User authentication (Login / Register)
- ⚙️ Customizable user settings & preferences
- 📱 Fully responsive, modern UI with dark mode

---

## 🗂️ Project Structure

```
fitness-ai-system/
├── backend/          # FastAPI backend + ML model
│   ├── main.py
│   ├── database.py
│   ├── model.pkl
│   ├── data/
│   └── ml_model_final.ipynb
└── frontend/         # React + Vite frontend
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── layouts/
    │   └── App.jsx
    └── public/
```

---

## ⚙️ Setup & Installation

### Backend

```bash
cd backend
pip install fastapi uvicorn scikit-learn pandas numpy
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React, Vite, Tailwind CSS, Recharts |
| Backend   | FastAPI, Python                     |
| ML Model  | scikit-learn                        |
| Database  | SQLite                              |

---

