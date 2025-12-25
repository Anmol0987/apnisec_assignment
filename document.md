## Tech Stack

### Frontend
- **Next.js 15 (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS**

### Backend
- **Next.js API Routes**
- **Object-Oriented Architecture**
- **JWT Authentication**
- **Custom Rate Limiter**
- **Resend (Email Service)**

### Database
- **PostgreSQL (NeonDB)**
- **Prisma ORM (v6)**

---

## Authentication

Custom authentication is implemented using **JWT tokens stored in HTTP-only cookies**.

### Auth APIs
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

All protected routes validate authentication using a **middleware-based approach**.

---

## User Profile

Users can view and update their profile information securely.

### Profile APIs
- `GET /api/users/profile`
- `PUT /api/users/profile`

---

## Issue Management

Users can create and manage security-related issues.

### Supported Issue Types
- Cloud Security
- Red Team Assessment
- VAPT (Vulnerability Assessment & Penetration Testing)

### Issue APIs
- `GET /api/issues`
- `POST /api/issues`
- `GET /api/issues/[id]`
- `PUT /api/issues/[id]`
- `DELETE /api/issues/[id]`

### Capabilities
- Create issues with title, description, type, priority, and status
- View all created issues
- Filter issues by type
- Update issue status
- Delete issues
- Ownership enforced at API level

---

## Backend Architecture

The backend strictly follows **Object-Oriented Programming (OOP)** principles:

- **Handlers** – Request handling
- **Services** – Business logic
- **Repositories** – Database access
- **Validators** – Input validation
- **Middlewares** – Authentication & rate limiting
- **Error Classes** – Centralized error handling

This structure ensures **maintainability, scalability, and clean separation of concerns**.

---

## Rate Limiting

- Custom in-memory rate limiter
- Limit: **100 requests per 15 minutes**
- Applied to all APIs
- Returns proper **429 Too Many Requests** responses

---

## Email Integration

Email notifications are implemented using **Resend** and triggered from **service layers**.

### Emails Sent
- Welcome email on user registration
- Issue creation notification
- Profile update notification

HTML-based email templates are used for all emails.

---

## Frontend Pages

- `/` – Landing page (SEO optimized)
- `/login` – Login page
- `/register` – Registration page
- `/dashboard` – Protected dashboard
- `/profile` – Profile management (protected)
