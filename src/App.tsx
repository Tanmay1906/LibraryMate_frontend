import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OTPVerification from './pages/OTPVerification';
import LibraryOwnerDashboard from './pages/LibraryOwner/Dashboard';
import AddStudent from './pages/LibraryOwner/AddStudent';
import StudentsList from './pages/LibraryOwner/StudentsList';
import LibraryInfo from './pages/LibraryOwner/LibraryInfo';
import Notifications from './pages/LibraryOwner/Notifications';
import LibraryOwnerProfile from './pages/LibraryOwner/Profile';
import StudentDashboard from './pages/Student/Dashboard';
import MyLibrary from './pages/Student/MyLibrary';
import Books from './pages/Student/Books';
import PaymentHistory from './pages/Student/PaymentHistory';
import Wishlist from './pages/Student/Wishlist';
import UpgradePlan from './pages/Student/UpgradePlan';
import UpdatePayment from './pages/Student/UpdatePayment';
import CompletedBooks from './pages/Student/CompletedBooks';
import CurrentlyReading from './pages/Student/CurrentlyReading';
import StudentProfile from './pages/Student/Profile';
import BookReader from './pages/BookReader';
import ContactSupport from './pages/ContactSupport';
import { AuthProvider, useAuth } from './utils/AuthContext';

/**
 * Protected Route Component
 * Handles route protection based on authentication and user role
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: string }> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={user?.role === 'student' ? '/student/dashboard' : '/owner/dashboard'} replace />;
  }
  
  return <>{children}</>;
};

/**
 * Main App Component
 * Handles routing and authentication flow for the Library Management System
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            {/* Library Owner Routes */}
            <Route 
              path="/owner/dashboard" 
              element={
                <ProtectedRoute requiredRole="owner">
                  <LibraryOwnerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/currently-reading" 
              element={
                <ProtectedRoute requiredRole="student">
                  <CurrentlyReading />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/upgrade-plan" 
              element={
                <ProtectedRoute requiredRole="student">
                  <UpgradePlan />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/update-payment" 
              element={
                <ProtectedRoute requiredRole="student">
                  <UpdatePayment />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/wishlist" 
              element={
                <ProtectedRoute requiredRole="student">
                  <Wishlist />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/completed-books" 
              element={
                <ProtectedRoute requiredRole="student">
                  <CompletedBooks />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner/add-student" 
              element={
                <ProtectedRoute requiredRole="owner">
                  <AddStudent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner/students" 
              element={
                <ProtectedRoute requiredRole="owner">
                  <StudentsList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner/library-info" 
              element={
                <ProtectedRoute requiredRole="owner">
                  <LibraryInfo />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner/notifications" 
              element={
                <ProtectedRoute requiredRole="owner">
                  <Notifications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner/profile" 
              element={
                <ProtectedRoute requiredRole="owner">
                  <LibraryOwnerProfile />
                </ProtectedRoute>
              } 
            />
            
            {/* Student Routes */}
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/my-library" 
              element={
                <ProtectedRoute requiredRole="student">
                  <MyLibrary />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/books" 
              element={
                <ProtectedRoute requiredRole="student">
                  <Books />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/payment-history" 
              element={
                <ProtectedRoute requiredRole="student">
                  <PaymentHistory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/profile" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentProfile />
                </ProtectedRoute>
              } 
            />
            
            {/* Shared Routes */}
            <Route 
              path="/support" 
              element={
                <ProtectedRoute>
                  <ContactSupport />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/book-reader/:bookId" 
              element={
                <ProtectedRoute>
                  <BookReader />
                </ProtectedRoute>
              } 
            />
            
            {/* Default Redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;