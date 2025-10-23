# 🎓 MERN_LMS_TTCS

A full-stack **Learning Management System (LMS)** built with the **MERN Stack (MongoDB, Express, React, Node.js)**, featuring authentication, cloud storage, course management, and PayPal integration. Designed for both students and instructors with a clean, responsive interface.

## 🚀 Features
- 👩‍🎓 Students can browse, enroll, and learn through interactive lessons, videos, and quizzes, with progress tracking and secure PayPal payments.  
- 👨‍🏫 Instructors can create, edit, and delete courses, upload content to Cloudinary, and manage enrolled students.  
- 🧩 System includes JWT authentication, role-based access (Admin / Instructor / Student), RESTful API, and a React + Tailwind + Radix UI frontend with Framer Motion animations.  

## 🧠 Tech Stack
**Frontend:** React 19, Vite, Tailwind CSS, Radix UI, Framer Motion  
**Backend:** Node.js, Express.js, Mongoose  
**Database:** MongoDB  
**Authentication:** JWT, bcryptjs  
**Media:** Cloudinary, Multer  
**Payment:** PayPal REST SDK  
**Dev Tools:** ESLint, Nodemon  

## ⚙️ Installation
```bash
# 1️⃣ Clone repository
git clone https://github.com/Solozyyy/MERN_LMS_TTCS.git
cd MERN_LMS_TTCS

# 2️⃣ Install dependencies
cd client
npm install
cd ../server
npm install

# 3️⃣ Create environment file (.env) inside /server
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret

# 4️⃣ Run project
# Terminal 1 (backend)
cd server
npm run dev
# Terminal 2 (frontend)
cd client
npm run dev
# Access app at: http://localhost:5173

📁 Folder Structure

MERN_LMS_TTCS/
├── client/                        # React frontend (Vite + Tailwind)
│   ├── node_modules/              # Dependencies
│   ├── public/                    # Static assets
│   ├── src/                       # Source code
│   │   ├── assets/                # Images, icons, fonts (if any)
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Page-level components (Dashboard, Login, etc.)
│   │   ├── routes/                # React Router configuration
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── utils/                 # Helper functions / constants
│   │   └── main.jsx               # App entry point
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                        # Node.js backend (Express + MongoDB)
│   ├── controllers/               # Route controllers (business logic)
│   ├── helpers/                   # Utility functions
│   ├── middleware/                # Authentication & validation middleware
│   ├── models/                    # Mongoose models (User, Course, etc.)
│   ├── routes/                    # Express route definitions
│   ├── uploads/                   # Uploaded files (images, docs, etc.)
│   ├── node_modules/
│   ├── package.json
│   ├── .env                       # Environment variables (ignored by git)
│   └── server.js                  # Backend entry point
│
└── README.md                      # Project documentation

🧾 Scripts

Frontend:
npm run dev – start dev server
npm run build – build for production
npm run preview – preview build

Backend:
npm run dev – run backend (nodemon)
npm start – start backend normally

🧑‍💻 Author

Solozyyy
🌐 [GitHub Profile](https://github.com/Solozyyy) 
