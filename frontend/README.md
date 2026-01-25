# EasyGenerator Auth App - Frontend Documentation
---

## Overview

A premium, dark-themed authentication frontend application built with Next.js. It provides a seamless user experience for registration, login, and dashboard access, featuring smooth GSAP animations and a glassmorphism design aesthetic.

**Tech Stack:**
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Bootstrap 5 (Base) + Custom CSS Modules (Glassmorphism)
- **Authentication:** NextAuth.js (Credentials Provider)
- **Animations:** GSAP (GreenSock Animation Platform)
- **Design Inspiration:** Stitch with Google

---

## Project Structure

```
frontend/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/ # NextAuth API route
│   │   │   └── proxy/            # API Route Proxies (if applicable)
│   │   ├── auth/                 # Auth Pages
│   │   │   ├── login/            # /auth/login
│   │   │   └── signup/           # /auth/signup
│   │   ├── page.tsx              # Dashboard (Protected)
│   │   ├── layout.tsx            # Root Layout
│   │   └── globals.css           # Global Styles
│   │
│   ├── components/               # React Components
│   │   ├── auth/                 # Auth-specific components
│   │   │   ├── LoginForm/
│   │   │   ├── SignupForm/
│   │   │   └── AuthWrapper/
│   │   ├── dashboard/            # Dashboard components
│   │   └── ui/                   # Reusable UI elements
│   │       ├── Button/
│   │       └── Input/
│   │
│   ├── lib/                      # Utilities & Config
│   │   └── auth.ts               # NextAuth Configuration
│   │
├── public/                       # Static Assets
├── .env                          # Environment Variables
├── next.config.ts                # Next.js Configuration (Proxy Rewrites)
├── package.json
├── tsconfig.json
└── README.md
```

## Installation Guide

### Prerequisites
- **Node.js** (v18 or higher)
- **npm**
- **Backend Service** running on port 3000 (see Backend Documentation)

### Installation

#### Local Setup

Step 1: Install Dependencies
```bash
npm install
```

Step 2: Environment Configuration
Create a `.env` file in the root directory:

```env
# Backend Connection
BACKEND_URL=http://localhost:3000

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
```

Step 3: Run the Application
Start the development server on port **3001** (to avoid conflict with backend on 3000):

```bash
npm run dev -- -p 3001
```

---

## Application Flow

### 1. User Signup
1. User navigates to `/auth/signup`.
2. Fills in Display Name, Email, and Password.
3. **Client Validation**:
   - Email format check.
   - Password strength check (min 8 chars, letter, number, special char).
4. **Proxy Request**: Frontend sends request to internal proxy or direct backend endpoint.
5. On success, redirects to Login.

### 2. User Login
1. User navigates to `/auth/login`.
2. Enters credentials.
3. **NextAuth**: `authorize` callback calls Backend (`/auth/login`) to get Access Token.
4. **Session**: Access Token is stored in HttpOnly session.
5. Redirects to Dashboard (`/`).

### 3. Dashboard (Protected)
1. User attempts to view `/`.
2. **Server-Side Check**: `getServerSession` checks for active session.
3. **Token Validation**:
   - On every request, the application calls Backend (`/auth/user`) with the stored token.
   - If token is invalid/expired provided by backend, user is immediately logged out.
4. If valid, Dashboard displays user greeting.

---

# Environment Variables

| Variable          | Description                                      | Required | Default |
| ----------------- | ------------------------------------------------ | -------- | ------- |
| `BACKEND_URL`     | URL of the running backend API                   | Yes      | -       |
| `NEXTAUTH_URL`    | Canonical URL of the frontend (include port)     | Yes      | -       |
| `NEXTAUTH_SECRET` | Secret key for signing NextAuth session cookies  | Yes      | -       |

### Example `.env`

```env
BACKEND_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=complex_secret_string_here
```
