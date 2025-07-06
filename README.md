#  Konvoo - Social Media App

Konvoo is a modern full-stack **social media application** built with performance and scalability in mind. Designed using **Next.js**, **Prisma**, and **PostgreSQL**, it brings together the essential features of social networking—posts, likes, comments, and profiles—with a slick and responsive UI powered by **Tailwind CSS** and smooth **Framer Motion** animations.



<p align="center">
  <img src="https://github.com/Hariprasaadh/Konvoo-social-media-app/blob/master/public/logo.jpg?raw=true" alt="Konvoo Preview" width="250"/>
</p>

---

## 🧠 Features

- 🔐 **Authentication** with secure session handling
- 📝 **Create, like, and comment on posts**
- 👤 **User profiles** with dynamic routing
- 💬 **Interactive UI** with real-time feedback
- 🎨 **Framer Motion animations** for smooth transitions
- 🌙 **Dark mode support** (optional to add)
- 🧩 **Modular components** for scalability and maintainability

---

## 🧰 Tech Stack

| Category        | Technology         |
|----------------|--------------------|
| Frontend       | Next.js, React, TypeScript |
| Styling        | Tailwind CSS, Framer Motion |
| Authentication | Clerk                     |
| Backend        | Next.js API Routes |
| Database ORM   | Prisma             |
| Database       | PostgreSQL         |
| Hosting        | Vercel             |

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Hariprasaadh/Konvoo-social-media-app.git
cd Konvoo-social-media-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a .env file in the root directory and configure:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
DATABASE_URL=""
UPLOADTHING_TOKEN=""
```

### 4. Run Prisma migrations

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

The app will be running at http://localhost:3000.


