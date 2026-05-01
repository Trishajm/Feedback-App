# Feedback App (Next.js + Docker)

A simple feedback collection app built with Next.js. Users can submit feedback and view all submissions.

## ✨ Features

* Submit feedback (Name + Message)
* Validation:

  * Name is required
  * Message length: 10–200 characters
  * Prevent duplicate submissions (case-insensitive)
* Fetch and display all feedback
* Sorting: latest first
* Pagination (2 items per page)
* Loading + success + error states
* Dockerized for easy setup

---

## 🛠 Tech Stack

* Next.js (App Router)
* TypeScript
* Docker

---

## 📦 Setup (Local)

```bash
npm install
npm run dev
```

Open: http://localhost:3000

---

## 🐳 Docker Setup

### Build Image

```bash
docker build -t nextjs-feedback .
```

### Run Container

```bash
docker run -p 3000:3000 nextjs-feedback
```

Open: http://localhost:3000

---

## 🔌 API Endpoints

### POST /api/feedback

Submit feedback

```json
{
  "name": "Trisha",
  "message": "This is a sample feedback"
}
```

### GET /api/feedback

Fetch all feedback

---

## 🧪 Sample cURL

### POST

```bash
curl -X POST http://localhost:3000/api/feedback \
-H "Content-Type: application/json" \
-d "{\"name\":\"Trisha\",\"message\":\"This is a sample feedback\"}"
```

### GET

```bash
curl http://localhost:3000/api/feedback
```

---

## ⚙️ Assumptions

* Data is stored in memory (no database)
* Duplicate detection is case-insensitive (name + message)
* Designed for demo purposes, not persistent storage

---

## 🚀 Notes

* Clean UI with basic styling
* Professional validation handling
* Production build works via Docker
