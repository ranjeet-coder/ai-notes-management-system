# AI Notes Management System

## Overview

This project is a Notes Management System built using Laravel (Backend) and React (Frontend).

The application allows users to:

* Create Notes
* View Notes
* Update Notes
* Delete Notes
* Search Notes using Semantic Search
* Generate AI-based Note Summaries
* View Notes with Pagination

---

## Tech Stack

### Backend

* Laravel 12
* MySQL
* REST API

### Frontend

* React
* Axios
* React Router

---

## Setup Instructions

### Backend Setup

1. Clone repository

```bash
git clone <repository-url>
```

2. Navigate to backend folder

```bash
cd backend
```

3. Install dependencies

```bash
composer install
```

4. Configure environment

```bash
cp .env.example .env
```

Update database credentials in `.env`.

5. Generate application key

```bash
php artisan key:generate
```

6. Run migrations

```bash
php artisan migrate
```

7. Start server

```bash
php artisan serve
```

Backend URL:

```text
http://127.0.0.1:8000
```

---

### Frontend Setup

1. Navigate to frontend

```bash
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Run application

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## API Documentation

### Get Notes

GET /api/notes

### Paginated Notes

GET /api/notes?page=1&limit=10

### Get Note

GET /api/notes/{id}

### Create Note

POST /api/notes

Request:

```json
{
  "title": "Laravel",
  "content": "Laravel is a PHP framework"
}
```

### Update Note

PUT /api/notes/{id}

### Delete Note

DELETE /api/notes/{id}

### Semantic Search

GET /api/notes/search?q=laravel

### AI Summary

POST /api/notes/{id}/summary

---

## Database Schema

### notes

| Column     | Type      |
| ---------- | --------- |
| id         | bigint    |
| title      | string    |
| content    | text      |
| embedding  | json      |
| created_at | timestamp |
| updated_at | timestamp |

---

## Semantic Search Implementation

Semantic search was implemented using:

* Embedding generation
* Vector storage in database
* Cosine similarity calculation
* Ranking based on similarity score

Embeddings are generated when notes are created or updated.

---

## AI Summary Implementation

The summary endpoint generates a short summary by extracting key sentences from note content.

Endpoint:

POST /api/notes/{id}/summary

---

## Architecture

React Frontend

↓

Laravel REST API

↓

MySQL Database

Semantic Search Layer

↓

Embedding Generation + Cosine Similarity
