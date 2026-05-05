import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NeuralBackground from './components/NeuralBackground';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import EmployeeLayout from './layouts/EmployeeLayout';

// Pages
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AIEngine from './pages/admin/AIEngine';
import Employees from './pages/admin/Employees';
import Attendance from './pages/admin/Attendance';
import Performance from './pages/admin/Performance';
import Rewards from './pages/admin/Rewards';
import Badges from './pages/admin/Badges';
import Feedback from './pages/admin/Feedback';
import Bonus from './pages/admin/Bonus';
import Reports from './pages/admin/Reports';

import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeRewards from './pages/employee/Rewards';
import EmployeePerformance from './pages/employee/Performance';
import EmployeeLeaderboard from './pages/employee/Leaderboard';
import EmployeeAttendance from './pages/employee/Attendance';
import EmployeeBadges from './pages/employee/Badges';
import EmployeeFeedback from './pages/employee/Feedback';
import EmployeeNotifications from './pages/employee/Notifications';

function App() {
  // Global theme initialization to force dark mode by default on all pages (including Login)
  useEffect(() => {
    if (localStorage.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Default to dark mode if no preference or explicitly set to dark
      document.documentElement.classList.add('dark');
      if (!localStorage.theme) {
        localStorage.theme = 'dark';
      }
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              style: {
                background: '#22C55E',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
        <NeuralBackground>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Admin Routes with Layout */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="ai-engine" element={<AIEngine />} />
              <Route path="employees" element={<Employees />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="performance" element={<Performance />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="badges" element={<Badges />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="bonuses" element={<Bonus />} />
              <Route path="reports" element={<Reports />} />
            </Route>

            {/* Employee Routes with Layout */}
            <Route 
              path="/employee" 
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <EmployeeLayout />
                </ProtectedRoute>
              } 
            >
              <Route index element={<EmployeeDashboard />} />
              <Route path="rewards" element={<EmployeeRewards />} />
              <Route path="performance" element={<EmployeePerformance />} />
              <Route path="leaderboard" element={<EmployeeLeaderboard />} />
              <Route path="attendance" element={<EmployeeAttendance />} />
              <Route path="badges" element={<EmployeeBadges />} />
              <Route path="feedback" element={<EmployeeFeedback />} />
              <Route path="notifications" element={<EmployeeNotifications />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </NeuralBackground>
      </Router>
    </AuthProvider>
  );
}

export default App;
