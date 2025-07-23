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

## Setup
```bash
# clone this repository to local computer
git clone https://github.com/kuro-kano/iot-lab-2025.git
# change directory to "Week-1-RestAPI-with-Hono" directory
cd Week-1-RestAPI-with-Hono

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

## Development
```bash
# Run development server
npm run vercel:dev

# Create table from /api/db/schema.ts with drizzle
npm run drizzle push
```

## API Endpoints

Use [POSTMAN](https://www.postman.com/)

### Get all students
```http
GET /api/students
Authorization: Bearer your_api_secret
```

### Create student
```http
POST /api/students
Authorization: Bearer your_api_secret
Content-Type: application/json

{
    "firstname": "John",
    "lastname": "Doe",
    "student_id": "66070091",
    "birthday": "01-01-2001",
    "gender": "male"
}
```

### Update student
```http
PATCH /api/students/:id
Authorization: Bearer your_api_secret
Content-Type: application/json

{
    "firstname": "Jane"
}
```

### Delete student
```http
DELETE /api/students/:id
Authorization: Bearer your_api_secret
Content-Type: application/json

// Response example
{
    "success": true,
    "message": "Student deleted successfully"
}
```

## Project Structure
```
├── api/
│   ├── db/
│   │   ├── drizzle.ts
│   │   └── schema.ts
│   ├── routes/
│   │   ├── api.ts
│   │   └── students.ts
│   └── index.ts
├── drizzle/
├── .env
├── .gitignore
├── drizzle.config.ts
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
├── vercel.json
```
