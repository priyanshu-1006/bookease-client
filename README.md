
# 📖 BookEase - Appointment Booking System

BookEase is a full-stack web application that enables businesses or professionals to manage their appointments online. It offers seamless booking, availability tracking, user authentication, admin management, and optional Razorpay payment integration.

## 🔗 Live Links

- 🌐 Client: [bookease.vercel.app](https://bookease.vercel.app)
- 🛠️ Server: [bookease-server.onrender.com](https://bookease-server.onrender.com)

## 📸 Screenshots

### 🖥️ Landing Page
![Landing Page](screenshots/landing.png)

### 🔐 Signup Page
![Signup](screenshots/signup.png)

### 🔓 Login Page
![Login](screenshots/login.png)

### 📅 Booking Calendar
![Booking](screenshots/booking.png)

### 👤 Profile Dashboard
![Profile](screenshots/profile.png)

### 🛡️ Admin Panel
![Admin Panel](screenshots/admin.png)

---

## 🚀 Features

### 🧑‍💼 For Users:
- Signup/Login using JWT authentication
- Book available time slots using calendar UI
- View your past and upcoming bookings
- Dark mode UI with animated visuals
- Payment via Razorpay with confirmation

### 🛠️ For Admins:
- View all user bookings
- Monitor system activity
- Manage availability
- Export and track appointment data

---

## 🛠️ Tech Stack

### Frontend:
- ⚛️ React.js + Vite
- 💨 TailwindCSS
- 🧭 React Router DOM
- ✨ Framer Motion (Animations)
- 🔥 React Hot Toast (Notifications)
- 📆 react-calendar

### Backend:
- 🧠 Node.js + Express.js
- 🐘 PostgreSQL (Database)
- 🔐 JWT for Authentication
- 🧾 Razorpay Integration (Payments)
- 📦 dotenv, bcrypt, cors

---

## 📁 Folder Structure

### `/client`
- React UI components and pages
- Responsive and animated design
- Razorpay integration and calendar booking

### `/server`
- REST API routes: `/auth`, `/bookings`, `/admin`
- PostgreSQL with pooled connection
- Middleware for auth and error handling

---

## ⚙️ Setup Instructions

### 1. Clone the repositories

```bash
git clone https://github.com/priyanshu-1006/bookease
git clone https://github.com/priyanshu-1006/bookease-server


2. Install dependencies

Client:

cd bookease
npm install

Server:

cd bookease-server
npm install

3. Create .env in /server

PORT=5000
DB_HOST=your_postgres_host
DB_USER=your_postgres_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=5432
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

4. Run the app

# In client
npm run dev

# In server
npm start


---

📦 Deployment

Client: Deployed on Vercel

Server: Deployed on Render



---

📄 License

MIT License


---

🙋‍♂️ Author

Priyanshu Chaurasia
🔗 LinkedIn
📧 priyanshuchaurasia.business@gmail.com


---

🌟 Show your Support

If you like this project, don't forget to ⭐ the repo and share it with others!

Folder Structure

bookease-client/
│
├── src/
│   ├── components/      # Reusable UI components (Navbar, StarsBackground, etc.)
│   ├── pages/           # Route pages (Home, Booking, Login, Signup, AdminPanel)
│   ├── assets/          # Images and logos
│   └── App.jsx          # Main app router
│
├── public/screenshots/  # Screenshots for README
├── .env.example         # Sample env variables
├── package.json
└── README.md
