# Personal Finance App

## Backend (Express + SQLite)
Run with:
```
cd backend
npm install
npm start
```

## Frontend (React + Vite + Tailwind)
Run with:
```
cd frontend
npm install
npm run dev
```

## Deployment
- Deploy backend to Render/Railway
- Deploy frontend to Vercel/Netlify
- Set `VITE_API_URL` to your backend URL in frontend env

## Environment Variables
- Backend: `.env` (copy from `.env.example`)
  - `PORT=5000`
- Frontend: `.env` (copy from `.env.example`)
  - `VITE_API_URL=http://localhost:5000` (change to your deployed backend URL)
