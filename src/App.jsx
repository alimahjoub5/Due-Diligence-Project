import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { settingAPI } from './services/api'; // Import settingAPI
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ServicesManager from './pages/admin/ServicesManager';
import FAQManager from './pages/admin/FAQManager';
import TestimonialsManager from './pages/admin/TestimonialsManager';
import SettingsManager from './pages/admin/SettingsManager';
import BlogManager from './pages/admin/BlogManager';
import ContactManager from './pages/admin/ContactManager';
import ActivityLogs from './pages/admin/ActivityLogs';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Testimonials from './pages/Testimonials';
import NotFound from './pages/NotFound';
import Maintenance from './pages/Maintenance'; // Import Maintenance Page
import PageTransition from './components/PageTransition';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ScrollToTop from './components/ScrollToTop';

// Public routes with animations
const PublicRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PageTransition><Home /></PageTransition>} />
          <Route path="services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="about" element={<PageTransition><About /></PageTransition>} />
          <Route path="faq" element={<PageTransition><FAQ /></PageTransition>} />
          <Route path="blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="blog/:id" element={<PageTransition><BlogPost /></PageTransition>} />
          <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="privacy" element={<PageTransition><Privacy /></PageTransition>} />
          <Route path="testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
          {/* 404 Not Found for public paths */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Route>
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        const response = await settingAPI.get();
        if (response.data && response.data.maintenanceMode) {
          setIsMaintenance(true);
        } else {
          setIsMaintenance(false);
        }
      } catch (error) {
        console.error("Failed to check maintenance mode:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkMaintenance();
  }, []);

  if (isLoading) return null; // Or a loader

  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes - PROTECTED */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="faqs" element={<FAQManager />} />
            <Route path="settings" element={<SettingsManager />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="messages" element={<ContactManager />} />
            <Route path="logs" element={<ActivityLogs />} />
          </Route>

          {/* Public Routes - BLOCKED IF MAINTENANCE IS ACTIVE */}
          {isMaintenance ? (
            <Route path="/*" element={<Maintenance />} />
          ) : (
            <Route path="/*" element={<PublicRoutes />} />
          )}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
