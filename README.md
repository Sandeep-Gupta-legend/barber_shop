# Crown & Blade - Production-Ready MERN Barber Shop App

A complete MERN stack web application for a barber shop business.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB Atlas with Mongoose
- Image Storage: Cloudinary
- Auth: JWT-based admin authentication
- Deployment: Vercel (client), Render/Railway (server)

## Folder Structure

```bash
barbar_shop/
  client/
  server/
```

---

## 1. Backend Setup (Start Here)

### 1.1 Install

```bash
cd server
npm install
```

### 1.2 Environment

Copy `server/.env.example` to `server/.env` and update values:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/barber_shop
JWT_SECRET=change_this_to_a_long_random_secret
ADMIN_SETUP_KEY=only_for_initial_admin_creation
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 1.3 Run Backend

```bash
npm run dev
```

API base URL: `http://localhost:5000/api`

### 1.4 Backend Features

- Auth routes:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/auth/me` (protected)
- Services routes:
  - `GET /api/services`
  - `POST /api/services` (protected)
  - `PUT /api/services/:id` (protected)
  - `DELETE /api/services/:id` (protected)
- Appointments routes:
  - `GET /api/appointments` (protected)
  - `POST /api/appointments`
  - `PATCH /api/appointments/:id` (protected)
  - `DELETE /api/appointments/:id` (protected)
- Gallery routes:
  - `GET /api/gallery`
  - `POST /api/gallery` (protected, Cloudinary upload)
  - `DELETE /api/gallery/:id` (protected)

### 1.5 MongoDB Collections

- `users` (admins)
- `services`
- `appointments`
- `galleries` (for admin gallery images)

---

## 2. Frontend Setup

### 2.1 Install

```bash
cd client
npm install
```

### 2.2 Environment

Copy `client/.env.example` to `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=15551234567
```

### 2.3 Run Frontend

```bash
npm run dev
```

Frontend URL: `http://localhost:5173`

### 2.4 Frontend Features

- Public pages:
  - Home (hero, services, testimonials)
  - Services
  - Booking form (date, time, service)
  - Contact with Google Maps embed
  - 404 page
- Admin:
  - Secure login
  - Dashboard tabs:
    - Appointments (status updates)
    - Services CRUD
    - Gallery upload/delete (Cloudinary)
- Extras:
  - WhatsApp booking button
  - SEO meta tags via React Helmet
  - Loading skeletons
  - Responsive layout

---

## 3. Create First Admin Account

Use this once after deployment/local setup:

```bash
POST /api/auth/register
```

Body:

```json
{
  "name": "Admin",
  "email": "admin@barber.com",
  "password": "password123",
  "setupKey": "only_for_initial_admin_creation"
}
```

Then log in from `/admin/login`.

---

## 4. Deployment Guide

## 4.1 Backend on Render/Railway

1. Create a new Web Service from the `server` folder.
2. Build command: `npm install`
3. Start command: `npm start`
4. Add all environment variables from `server/.env.example`.
5. Set `CLIENT_URL` to your deployed frontend URL (for CORS).

## 4.2 Frontend on Vercel

1. Import project and set Root Directory to `client`.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add env var `VITE_API_URL` to deployed backend URL + `/api`.

Example:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

---

## 5. Production Notes

- JWT secret must be long and random.
- Configure MongoDB Atlas network access and DB user credentials.
- Configure Cloudinary credentials and verify upload preset behavior.
- Keep CORS strict with only trusted frontend domains.
- Use HTTPS URLs for both frontend and backend in production.

---

## 6. Available Scripts

### Server

```bash
npm run dev
npm start
```

### Client

```bash
npm run dev
npm run build
npm run preview
```
