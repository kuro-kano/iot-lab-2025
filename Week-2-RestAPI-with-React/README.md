# Internet of Things (IoT) 2025

Reference: [https://github.com/n0uur/iot-lab-2025](https://github.com/n0uur/iot-lab-2025)
ตัวอย่างโค้ด และ Template สำหรับสร้าง Rest API ด้วย Hono (Typescript / Javascript) อย่างง่าย

### หัวข้อ

- ตัวอย่างพื้นฐานสำหรับการสร้างเว็บ API ด้วย Hono
- การสร้าง API ที่รองรับการเรียกใช้งานด้วย HTTP Method GET, POST, PUT, DELETE
- การเชื่อมต่อฐานข้อมูล PostgreSQL ด้วย Drizzle ORM
- การสร้าง API ที่รองรับการเรียกใช้งานด้วย HTTP Method GET, POST, PUT, DELETE และเชื่อมต่อฐานข้อมูล PostgreSQL ด้วย Drizzle ORM
- สร้าง API ที่รองรับการเชื่อมต่อผ่าน WebSocket
- การสร้างเว็บไซต์ด้วย React อย่างง่าย และการทำ CRUD ผ่าน RestfulAPI ที่สร้างด้วย Hono

---

### Deployed with vercel
- https://cafe-website-three-murex.vercel.app/

---
## Setup (Run on Local)
```bash
# clone this repository to local computer
git clone https://github.com/kuro-kano/iot-lab-2025.git
# change directory to "Week-1-RestAPI-with-Hono" directory
cd Week-2-RestAPI-with-React

# Install dependencies on Backend/
cd Backend && npm install
# Install dependencies on Frontend/
cd Frontend && npm install

# Create .env file
cp .env.example .env
# then enter an API_SECRET on both of Frontend and Backend what as same API_SECRET
```

## Run
Open 2 terminals for run both Backend and Frontend
### Backend
```bash
# change directory Backend/
cd Backend
# Create table from /api/db/schema.ts with drizzle
npm run drizzle push
# Run Backend Server
npm run dev
```

## Frontend
```bash
# change directory Frontend/
cd Frontend
# Run Frontend Server
npm run dev
```

## Routes
- `/` -> Landing pages
- `/books` -> Display all books # METHOD GET
  - `/books/:id` -> Display specific :id book # METHOD GET
  - `/books/:id/edit` -> edit data specific :id book # METHOD PATCH
  - `/books/create` -> Create book # METHOD POST
- `/beverages` -> Display drinks order and ordered
- `/staff` -> Show order what ordered


## Project Structure
```
Week-2-RestAPI-with-React/
├── Backend/
│   ├── src/
│   │   ├── db/
│   │   │   ├── drizzle.ts
│   │   │   └── schema.ts
│   │   ├── routes/
│   │   │   ├── api.ts
│   │   │   ├── books.ts
│   │   │   ├── genre.ts
│   │   │   └── orders.ts
│   │   └── index.ts
│   ├── drizzle/
│   │   ├── 0000_init.sql
│   │   └── meta/
│   ├── db.sqlite
│   ├── drizzle.config.ts
│   ├── package.json
│   └── tsconfig.json
└── Frontend/
    ├── src/
    │   ├── assets/
    │   │   ├── website-logo.png
    │   │   └── images/
    │   ├── components/
    │   │   ├── layout.tsx
    │   │   ├── loading.tsx
    │   │   └── footer.tsx
    │   ├── lib/
    │   │   └── models.tsx
    │   ├── pages/
    │   │   ├── beverages.tsx
    │   │   ├── books.tsx
    │   │   ├── book-by-id.tsx
    │   │   ├── book-create.tsx
    │   │   ├── book-edit-by-id.tsx
    │   │   ├── index.tsx
    │   │   └── staff.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   └── vite-env.d.ts
    ├── public/
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.ts
    └── tsconfig.json
```
