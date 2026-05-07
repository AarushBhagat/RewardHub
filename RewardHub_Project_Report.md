# LOVELY PROFESSIONAL UNIVERSITY 
## School of MSB 

**Name of the faculty member:** Dr.Monalisha Patel 

**Course Code:** HRM 204  
**Course Title:** Compensation Management 
**Academic Task No:** 2  
**Academic Task Title:** Assignment (Group) 
**Date of Allotment:** 17/04/2026  
**Date of Submission:** 01/05/2026 
**Student Roll No:** 19  
**Student Reg. No:** 12321934 
**Term:** 6  
**Section:** 20M95 
**Max. Marks:** 30  
**Marks. Obtained:** 

---

### Peer Rating Table 

| Sr. No | Registration No. | Name of the Student | Roll No. | Peer Rating | Student's Signature |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 12321380 | Vikash Gupta | 11 | 10 | |
| 2 | 12321429 | Yoga Nand Roy | 12 | 9 | |
| 3 | 12321475 | Harshit Kumar | 13 | 7 | |
| 4 | 12321720 | Mohd. Ahmad | 15 | 10 | |
| 5 | 12321934 | Nirbhay Kumar | 10 | 10 | |

---

### Declaration: 
We, Nirbhay Kumar (Reg. No. 12321934) and team members, declare that this assignment is our group work. We have not copied it from any other students' work or from any other source except where due acknowledgement is made explicitly in the text, nor has any part been written for us by any other person. 

---

**Name of the Project:** RewardHub - AI-Powered Employee Portal & HR Management System

**Platform Artefact:** RewardHub_v1.0 - React-Based HR & Employee Dashboard
**Objective:** What is the purpose of this project and what did you aim to build and demonstrate?  

The primary objective of this project is to design, develop, and critically evaluate RewardHub — a modern, interactive web platform built for contemporary HR teams and employees. Developed as part of the HRM 204 Compensation Management course, this platform demonstrates how high-end UI design, real-time data visualization, and automated performance tracking can transform employee engagement and reward distribution. The project bridges academic theory on compensation management with a working full-stack prototype, showing how attendance, performance metrics, and a gamified reward system can be consolidated into a premium, accessible dashboard. 

---

### QUESTION 1: PROJECT OVERVIEW AND TECHNOLOGY ANALYSIS 

#### 1.1 What is RewardHub? 
RewardHub is a modern HR web application that addresses the persistent challenge of employee engagement and transparent compensation management. In many organizations, reward structures are opaque and performance tracking is disconnected from daily employee experience. 

RewardHub centralizes this into an interactive, "Glassmorphism" styled portal. The system evaluates each employee across multiple dimensions — Attendance, Tasks, Performance, and Peer Feedback — and uses gamified mechanisms (Points, Badges, Tiers) to reward them. HR administrators gain a comprehensive analytics dashboard, while employees can view their performance metrics through rich interactive charts (Recharts), apply for leaves, and redeem their earned points for real-world rewards.

#### 1.2 Target User Groups and System Workflow 
RewardHub serves two primary user groups:
1. **Employees:** Access personalized dashboards showing their reward points, current tier (e.g., Silver, Gold), attendance trends, performance radar charts, and a catalog to redeem gifts.
2. **HR Administrators:** Access workforce analytics, AI-driven insights on department performance, employee directories, and tools to manage bonuses and feedback.

The system follows a modern Single Page Application (SPA) workflow. The frontend is built with React and Tailwind CSS, utilizing Framer Motion for premium animations. Data is managed via state and mock datasets (extensible to Firebase/Node backend).

| Layer | Technology | Role in RewardHub |
| :--- | :--- | :--- |
| **Frontend Core** | React.js & Vite | Component-based interactive UI and rapid development environment |
| **Styling** | Tailwind CSS & CSS Modules | "Glassmorphism" design, responsive layouts, and dark mode support |
| **Visualization** | Recharts | Interactive area, pie, and radar charts for performance metrics |
| **Animation** | Framer Motion | Smooth page transitions and element entrance animations |
| **Icons & UI** | Lucide React | Clean, modern iconography for dashboard navigation |

#### 1.3 Architecture Overview  
RewardHub is architected as a modern web application. The frontend handles state management, routing (via React Router), and data visualization locally to provide a blazing-fast user experience. The UI leverages a unified design system with CSS variables controlling light/dark themes and a signature glassmorphism aesthetic. All business logic—such as calculating attendance rates, evaluating performance trends, and updating reward points—is currently handled via robust frontend utility functions, making the prototype highly interactive and easy to showcase.

#### 1.4 Employee Dataset Profile 
The underlying mock dataset simulates a diverse workforce across multiple departments (Engineering, HR, Admin, etc.). Each employee profile contains detailed metrics including daily attendance records, specific skill ratings (Technical, Leadership, Communication), and a ledger of earned rewards (Badges and Bonus Points). 

**Reward Tier Structure:**
| Reward Tier | Points Required | Benefits / Perks |
| :--- | :--- | :--- |
| Bronze Tier | 0 - 499 | Standard Access |
| Silver Tier | 500 - 999 | 10% bonus on peer points, Priority support |
| Gold Tier | 1000+ | Extra day off, Premium catalog access |

---

### QUESTION 2: FEATURES, DASHBOARDS, AND DATA ANALYSIS 

#### 1.5 Employee Dashboard Features 
The employee-facing dashboard is built around transparent self-awareness and gamification. Key performance indicators (KPIs) like Attendance Rate, Tasks Completed, and Total Points are displayed in premium glass cards. The redesign includes a **Skills Radar Chart** and an **Attendance Trend Area Chart**, allowing employees to immediately grasp their performance trajectory. 

#### 1.6 Department Leaderboard and Competitive Visibility 
The platform includes a Leaderboard that ranks employees based on their accumulated reward points. This promotes healthy, transparent competition. By visualizing rankings with Gold/Silver/Bronze highlights, the reward system becomes a continuous motivational tool rather than an annual surprise.

#### 1.7 Admin Dashboard and Workforce Analytics 
The Admin view shifts focus to organizational health. It presents company-wide metrics through summary KPI cards and features an **AI Analysis Engine** that scans workforce data to provide insights (e.g., identifying departments with high absenteeism or highlighting top-performing teams).

#### 1.8 Comprehensive Rewards & History 
The redesigned Rewards section provides a granular view of every transaction. Employees can see exactly why they earned points (e.g., "Perfect Attendance", "Peer Recognition from John"), view a gallery of their collected Badges, and track their progress toward the next Tier via a visual progress bar.

---

### QUESTION 3: HR RELEVANCE, STRENGTHS, AND IMPROVEMENT ROADMAP 

RewardHub aligns perfectly with modern compensation theory: moving away from purely financial, delayed rewards to instantaneous, points-based recognition that appeals to a younger workforce.

#### Platform Evaluation: Feature Analysis by Module 

| Evaluation Dimension | Rating | Remarks |
| :--- | :--- | :--- |
| Technology Stack & Architecture | 8 / 10 | React + Tailwind provides a highly scalable and maintainable foundation. Ready for backend integration. |
| UI/UX Design & User Experience | 9.5 / 10 | Exceptional "Premium Glassmorphism" design with smooth Framer Motion animations. |
| HR & Business Value | 9 / 10 | Highly engaging gamified system that transparently maps performance to rewards. |
| Production Readiness | 6 / 10 | Frontend is polished, but requires integration with a live database (e.g., Firebase/PostgreSQL) and secure authentication for enterprise deployment. |
| **Overall Assessment** | **8.1 / 10** | A visually stunning, highly interactive prototype that clearly demonstrates modern HR concepts. |

**Key Strength 1 – Engaging & Transparent UX:**
RewardHub's biggest asset is its design. By using interactive charts and a gamified points system, it transforms dull HR metrics into an engaging employee experience.

**Key Strength 2 – Multi-dimensional Evaluation:**
Instead of a single subjective manager score, the system tracks Attendance, Skills, and Tasks, providing a holistic view of employee contributions.

**Key Limitation 1 – Backend Integration Needed:**
The current prototype relies heavily on frontend state. For real-world use, a secure backend to handle transaction ledgers and data persistence is necessary.

---

### LEARNING OUTCOMES

This project highlighted that an effective reward system must be visually engaging and transparent. Developing RewardHub demonstrated that modern HR is not just about recording data, but presenting it in a way that motivates the employee. Implementing the charts and gamification features proved that when employees can *see* their progress, they are more likely to improve. The project also taught the technical challenges of maintaining a cohesive, premium design system (Glassmorphism/Dark Mode) across a complex dashboard.

### Suggestions and Recommendations: 

1. **Integrate Real-Time Peer Recognition:**
Allow employees to send points to each other directly through the platform, fostering a culture of continuous appreciation.
2. **Implement Manager Approval Workflows:**
While automated points for attendance are great, larger bonus allocations should have a UI flow for manager review and approval to ensure budget compliance.
3. **Expand the AI Insights Module:**
Use the simulated AI engine to not only review past performance but predict flight risks (employees likely to leave) based on attendance drops and lack of recent rewards.
4. **Deploy Live Database:**
Transition the mock data to a live Firebase or Supabase instance to enable true multi-user interaction and secure data persistence.
