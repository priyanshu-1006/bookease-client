import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import StarsBackground from './components/StarsBackground'; // ✅ new import
import 'react-calendar/dist/Calendar.css';

function App() {
  return (
    <Router>
      <StarsBackground /> {/* ✅ Fullscreen stars background */}
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
        <Route path="/Booking" element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        } />
        <Route path="/Profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
