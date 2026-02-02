# CLAUDE.md

## Project Overview

Chatterbox is a real-time chat application built on the MERN stack (MongoDB, Express, React, Node.js) using Socket.io for WebSocket communication. Users can register, log in, and chat with multiple users simultaneously. Deployed on Heroku as a single-process application.

## Directory Structure

```
├── server.js                    # Express + Socket.io server entry point (port 7777)
├── routes/index.js              # API routes (/api/login, /api/sign-up, /api/user, /api/logout)
├── controllers/
│   ├── userController.js        # User registration, login, logout, profile
│   └── authController.js        # Form validation & auth middleware
├── models/User.js               # Mongoose User schema with bcrypt password hashing
├── config/passportConfig.js     # Passport Local Strategy setup
├── utils.js                     # Express-validator validation rules
├── client/                      # React frontend (Create React App)
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.js           # Route definitions (/, /sign-up, /chatterbox)
│   │   │   ├── Chatterbox.js    # Main chat interface with Socket.io
│   │   │   ├── Login.js         # Login page
│   │   │   ├── Signup.js        # Signup container
│   │   │   ├── SignUpForm.js    # Signup form
│   │   │   ├── Message.js       # Chat message rendering
│   │   │   ├── TopNav.js        # Header navigation
│   │   │   ├── Loading.js       # Loading spinner
│   │   │   └── ErrorAlert.js    # Error display
│   │   ├── styles/              # CSS files (BEM naming convention)
│   │   ├── __tests__.js/        # Jest + Enzyme tests (Login, Signup)
│   │   └── helpers.js           # Timestamp formatting utility
│   └── build/                   # Production build (committed to repo)
```

## Commands

### Backend (from project root)
```bash
npm install          # Install server dependencies
npm start            # Production server (node server.js)
npm run dev          # Development server with nodemon (auto-reload)
```

### Frontend (from client/)
```bash
npm install          # Install React dependencies
npm start            # Dev server on port 3000 (proxies API to :7777)
npm run build        # Production build to client/build/
npm test             # Run Jest + Enzyme tests
```

### Running locally
Run backend (`npm run dev`) and frontend (`cd client && npm start`) in separate terminals. The client proxies `/api/*` requests to `localhost:7777`.

## Environment Variables

Create `variables.env` in the project root (not committed):
```
NODE_ENV=development
DATABASE=<mongodb-connection-uri>
SECRET=<session-secret>
```

The server reads these via `dotenv`. In production (Heroku), set them as config vars. `PORT` defaults to 7777.

## Tech Stack & Key Dependencies

- **Backend**: Express 4, Mongoose 5, Passport.js (Local Strategy), Socket.io 2, bcrypt, express-session with connect-mongo, express-validator
- **Frontend**: React 16.7 (class components), React Router DOM 4, Axios, Socket.io-client
- **Testing**: Jest + Enzyme (frontend only; no backend tests)
- **Dev**: Nodemon for backend auto-reload

## Code Conventions

- **Module system**: CommonJS (`require`/`module.exports`) on backend; ES6 imports on frontend
- **React components**: Class components for stateful logic (Chatterbox, Login, Signup); functional for presentational
- **CSS**: BEM naming (e.g., `chatterbox__conversation-bin`), plain CSS files per component
- **Naming**: camelCase for variables/functions, PascalCase for React components
- **No explicit linter/formatter config**: ESLint runs via Create React App defaults; no Prettier

## Architecture Notes

- **Authentication**: Passport Local Strategy with session-based auth stored in MongoDB (connect-mongo). Passwords hashed with bcrypt (10 rounds).
- **Real-time**: Socket.io handles login/logout notifications, typing indicators, and message broadcasting on the server side in `server.js`.
- **Production serving**: Express serves the React build from `client/build/` when `NODE_ENV=production`.
- **Session security**: `trust proxy` and secure cookies enabled in production.

## Deployment

Heroku single-dyno deployment. The `client/build/` directory is committed so Heroku serves the frontend without a separate build step. Remote: `https://git.heroku.com/chatterbox-prod`.
