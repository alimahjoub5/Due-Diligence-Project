import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
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
import PageTransition from './components/PageTransition';
import Login from './pages/Login';
import ScrollToTop from './components/ScrollToTop';

// Create a wrapper component to use useLocation hook
const AnimatedRoutes = () => {
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
          {/* 404 Not Found */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Route>
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
