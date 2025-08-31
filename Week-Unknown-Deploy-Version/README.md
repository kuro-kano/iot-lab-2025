# IoT Library & Cafe - Project Structure

โปรเจคนี้แบ่งออกเป็น 2 ส่วนหลัก คือ Frontend และ Backend

## โครงสร้างโปรเจค

```
📦 Root
├── railway.json             # Railway deployment configuration
├── 📂 Backend              # ส่วน Backend (Hono + SQLite)
│   ├── package.json        # Dependencies และ scripts
│   ├── tsconfig.json       # TypeScript configuration
│   ├── drizzle.config.ts   # Drizzle ORM configuration
│   ├── 📂 src
│   │   ├── index.ts       # Entry point
│   │   ├── 📂 db         # Database configurations
│   │   │   ├── drizzle.ts
│   │   │   └── schema.ts  # Database schema definitions
│   │   └── 📂 routes     # API routes
│   │       ├── api.ts     # API base router
│   │       ├── books.ts   # Books endpoints
│   │       ├── genre.ts   # Genre endpoints
│   │       └── orders.ts  # Orders endpoints
│   └── 📂 drizzle        # Database migrations
│       └── 0000_init.sql
│
└── 📂 Frontend            # ส่วน Frontend (React + Vite)
    ├── package.json       # Dependencies และ scripts
    ├── vite.config.ts     # Vite configuration
    ├── index.html        # Entry HTML
    ├── tsconfig.json     # TypeScript configuration
    ├── 📂 src
    │   ├── main.tsx      # React entry point
    │   ├── index.css     # Global styles
    │   ├── 📂 assets    # Static assets
    │   │   ├── website-logo.png
    │   │   └── 📂 images
    │   │       ├── aj-panwit.jpg
    │   │       ├── bg-cafe-1.jpg
    │   │       ├── bg-cafe-2.jpg
    │   │       └── coffee-1.jpg
    │   ├── 📂 components # Reusable components
    │   │   ├── footer.tsx
    │   │   ├── layout.tsx
    │   │   └── loading.tsx
    │   ├── 📂 lib       # Shared utilities
    │   │   └── models.tsx
    │   └── 📂 pages     # Application pages
    │       ├── index.tsx        # หน้าหลัก
    │       ├── beverages.tsx    # หน้าเครื่องดื่ม
    │       ├── books.tsx        # หน้ารายการหนังสือ
    │       ├── book-by-id.tsx   # หน้ารายละเอียดหนังสือ
    │       ├── book-create.tsx  # หน้าเพิ่มหนังสือ
    │       ├── book-edit-by-id.tsx # หน้าแก้ไขหนังสือ
    │       └── staff.tsx        # หน้าจัดการสำหรับพนักงาน
    └── 📂 public         # Static public assets
        ├── favicon.ico
        └── site.webmanifest

```

## เทคโนโลยีที่ใช้

### Frontend
- React (TypeScript)
- Vite
- Mantine UI
- TailwindCSS
- React Router DOM

### Backend
- Hono (TypeScript)
- SQLite
- Drizzle ORM

## การ Deploy

โปรเจคนี้ถูกออกแบบมาให้สามารถ deploy ได้บน:
- Frontend: Vercel
- Backend: Railway

ไฟล์ configuration สำหรับ deployment:
- `vercel.json` สำหรับ Frontend
- `railway.json` สำหรับ Backend
