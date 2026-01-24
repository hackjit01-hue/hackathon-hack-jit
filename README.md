# 🏆 Hack@JIT 1.0 - SDG Edition

![Hack@JIT Header](https://raw.githubusercontent.com/Jeeva1121/Hackathon---Hack-JIT-1.0/main/public/favicon.png)

> **"Code Till You Drop"** - A signature 24-hour innovation marathon hosted by Jansons Institute of Technology.

Hack@JIT 1.0 is a premium, full-stack hackathon management platform designed to facilitate a 24-hour coding competition focused on the UN's 17 Sustainable Development Goals (SDGs). This platform handles everything from landing page engagement to participant registration and administrative oversight.

---

## ✨ Features

### 🏢 For Participants
- **Dynamic Landing Page:** High-performance UI with glassmorphism and smooth animations.
- **SDG Exploration:** Interactive section showcasing all 17 Global Goals.
- **2-Member Team Registration:** Secure registration flow with automated email confirmations via Nodemailer.
- **Integrated Payments:** QR-based UPI payment gateway integration for registration fees.
- **Real-time Schedule:** Detailed 24-hour event timeline with custom thematic icons.
- **Accommodation Management:** Built-in tracking for overnight stay requirements.

### 🔐 For Administration (Staff Portal)
- **Role-Based Access:** Secure login for Admins and Coordinators.
- **Live Statistics:** Real-time dashboard showing total registrations, verified teams, and slots left.
- **Team Verification:** Capability to verify or reject team registrations with instant email notifications to participants.
- **Excel Export:** One-click data export of all team details for offline logistics.

---

## 🛠 Tech Stack

**Frontend:**
- **React.js (Vite)** - For a lightning-fast UI.
- **Framer Motion** - Delivering premium, high-end animations.
- **Lucide React** - Modern, clean iconography.
- **Vanilla CSS** - Tailored, responsive design with glassmorphism effects.

**Backend:**
- **Node.js & Express** - Scalable REST API architecture.
- **Firebase Firestore** - Cloud-native NoSQL real-time database.
- **Nodemailer** - Professional email automated communication.
- **XLSX** - Backend Excel generation for data export.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Firebase Project & Firestore Database
- Gmail App Password (for email automation)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jeeva1121/Hackathon---Hack-JIT-1.0.git
   cd Hackathon---Hack-JIT-1.0
   ```

2. **Frontend Setup:**
   ```bash
   npm install
   npm run dev
   ```

3. **Backend Setup:**
   ```bash
   cd server
   npm install
   ```

4. **Environment Configuration:**
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5001
   ADMIN_PASSWORD=your_admin_pass
   COORDINATOR_PASSWORD=your_coord_pass
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password

   # Firebase Config
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   ```

5. **Run Backend:**
   ```bash
   node index.js
   ```

---

## 🎯 Purpose
The purpose of Hack@JIT 1.0 is to empower young engineers to build technology-driven solutions for real-world global challenges. By streamlining the registration and verification process, we ensure participants can focus solely on what matters most: **Building the future.**

---

## 🏫 About Jansons Institute of Technology (JIT)

![JIT Campus](https://raw.githubusercontent.com/Jeeva1121/Hackathon---Hack-JIT-1.0/main/src/assets/jit_campus.png)

Jansons Institute of Technology is a premier engineering institution committed to excellence in education and innovation. Located in Coimbatore, JIT provides a vibrant ecosystem for students to explore, build, and solve real-world problems. With a focus on sustainable technology and professional integrity, JIT stands as a beacon of academic brilliance.

---

## 📸 Visuals & Branding
- **Theme:** Minimalist White & Blue Glassmorphism.
- **Accent:** Emerald Green (Success/Verification) & Amber (Warning/Alert).
- **Favicon:** Custom Golden Trophy representation of success.

---
Developed with ❤️ by **Jeeva** & **Barath Raj** (Team jit_earth).

