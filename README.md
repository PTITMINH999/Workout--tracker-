# 🏋️‍♂️ Workout Tracker Web App

Ứng dụng web giúp theo dõi và quản lý quá trình tập luyện cá nhân, gồm **Backend (Spring Boot)** và **Frontend (React + Vite)**.

---

## 🚀 Công nghệ

**Backend:**

- Java 17, Spring Boot 3.5.4
- Spring Security (JWT), Spring Data JPA
- MySQL, MapStruct, Lombok
- Validation & Exception Handling

**Frontend:**

- React 19, Vite
- Tailwind CSS, Axios, React Router
- react-hook-form, react-toastify, framer-motion
- Chart.js / react-chartjs-2 / Recharts

---

## ⚙️ Cách chạy dự án

### 1️⃣ Backend

**Yêu cầu:** Java 17+, Maven 3.9+, MySQL server

**Cấu hình database:**  
Chỉnh file `workout-tracker/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/workout_tracker # Tên database
    username: root # Tài khoản MySQL
    password: your_password # Mật khẩu MySQL
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

Các bước chạy:

cd workout-tracker

mvn spring-boot:run

2️⃣ Frontend

Yêu cầu: Node.js 18+, npm hoặc yarn

Chạy frontend:

cd workout-tracker-frontend

npm install

npm run dev
