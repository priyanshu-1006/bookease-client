import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok && data.user) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          console.error('Failed to fetch user:', data.error);
        }
      } catch (err) {
        console.error('Error fetching user for navbar:', err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleBookClick = () => {
    if (user) {
      navigate('/booking');
    } else {
      toast.error('Please log in to book a slot!');
      navigate('/login');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/30 backdrop-blur-lg shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-4xl font-['Fredoka'] font-semibold text-amber-50 tracking-wide">
          Book<span className="text-pink-500">Ease</span>
        </Link>

        <div className="flex items-center gap-5 text-white text-sm font-medium relative">
          <Link to="/" className="hover:text-blue-300 transition duration-200">
            Home
          </Link>

          {/* Handle Book Conditional Access */}
          <button
            onClick={handleBookClick}
            className="hover:text-blue-300 transition duration-200"
          >
            Book
          </button>

          {user?.role === 'admin' && (
            <Link to="/admin" className="hover:text-blue-300 transition duration-200">
              Admin Panel
            </Link>
          )}

          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
            >
              <button className="bg-white/20 px-3 py-1 rounded-full border border-white/30 hover:bg-white/30 transition backdrop-blur-sm">
                {user.name}
              </button>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-white hover:bg-white/20 transition"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-white/20 transition"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-300 transition duration-200">
                Login
              </Link>
              <Link to="/signup" className="hover:text-blue-300 transition duration-200">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
