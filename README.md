# Employee Management System (EMS)

A full-stack **MERN (MongoDB, Express.js, React, Node.js)** web application that helps HR/admins manage employee records, departments, salary details, attendance, and reports in a centralized dashboard with image upload support and role-based access.

---

## 🚀 Features

### 👨‍💼 Employee Management

* Add new employees with full details
* Upload and update profile images using Multer (stored locally)
* Secure password storage with bcrypt hashing
* View, edit, delete employee records
* Search, filter, and paginate employees

### 🗂 Department Management

* Add, view, update, and delete departments
* Assign departments to employees
* Filter employee list by department

### 💵 Salary Management

* Assign salary to employees
* Track base pay, allowances, deductions
* View and update salaries dynamically

### 📅 Attendance Tracking

* Mark daily attendance (Present, Absent, Leave, Late)
* Prevent duplicate attendance for the same day
* View attendance by employee, department, or date

### 📊 Attendance Reports

* Generate weekly/monthly attendance reports
* Filter by employee, department, or date range
* Includes present/absent counts and percentage

### 🔐 Authentication & Authorization

* JWT-based login system
* Role-based access control for Admins and Employees

---

## 🛠 Tech Stack

### Frontend

* React + Tailwind CSS / shadcn/ui
* TanStack Query for data fetching & caching
* React Hook Form + Zod/Yup for form validation

### Backend

* Node.js + Express.js
* MongoDB + Mongoose
* JWT for authentication
* Multer for local image uploads
* MVC pattern for clean architecture

---

## 📁 Project Structure (Backend)

```
/backend
├── controllers/
│   ├── authController.js
│   ├── employeeController.js
│   ├── salaryController.js
│   ├── attendanceController.js
│   ├── departmentController.js
├── models/
│   ├── employeeModel.js
│   ├── salaryModel.js
│   ├── attendanceModel.js
│   ├── departmentModel.js
├── routes/
│   ├── authRoutes.js
│   ├── employeeRoutes.js
│   ├── salaryRoutes.js
│   ├── attendanceRoutes.js
│   ├── departmentRoutes.js
├── middleware/
│   ├── auth.js
│   ├── multer.js
├── uploads/ (local image storage)
├── server.js
```

---

## 📷 Image Upload

* Profile images are stored in `/uploads/` locally
* Handled via Multer with unique file naming
* Automatically replaced during updates

---

## 🧪 Key Test Cases

| Feature           | Test Case             | Expected Outcome                       |
| ----------------- | --------------------- | -------------------------------------- |
| Add Employee      | Valid form + image    | Employee saved, image uploaded locally |
| Edit Employee     | Change salary & image | Updated in DB and local image replaced |
| Mark Attendance   | Already marked        | Error shown: "Already marked"          |
| Filter Department | Select "HR"           | Only HR employees shown                |
| Delete Employee   | Confirm deletion      | Employee and image deleted             |
| Generate Report   | Select April 2025     | Attendance stats and percentage shown  |

---

## 📦 Deployment Suggestions

* **Frontend**: Vercel or Netlify
* **Backend**: CapRover, Railway, Render, or VPS
* **Database**: MongoDB Atlas
* **Image Storage**: Local (default) or Cloudinary (optional upgrade)

---

## 🔮 Future Enhancements

* CSV/PDF export for employee & attendance reports
* Admin dashboard with charts (attendance, salary stats)
* Email notifications (late/missing attendance)
* Shift tracking & work-hour monitoring
* Notification system for salary credits & announcements
* Multi-language (i18n) support

---

## 🙌 Final Thoughts

This EMS project is a feature-rich and scalable HR tool ideal for businesses, HR teams, and admin dashboards. It demonstrates:

* Secure user management
* Real-world CRUD with file handling
* Role-based access
* MVC backend and React frontend separation
* Scalable MongoDB schema design

---

## 💬 Contact

Built by \ MOHAMMAD AMMAR. Reach me on https://www.linkedin.com/in/mohammad-ammar-uddin/ or | ammaruofficial@gmail.com (mailto:ammaruofficial@gmail.com)] for feedback or collaboration!
