import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import StarsBackground from '../components/StarsBackground';

const carouselSlides = [
  {
    title: 'Book with Ease',
    text: 'Log in and reserve your slots instantly anytime.',
    image: 'https://cdn-icons-png.flaticon.com/512/2331/2331943.png',
  },
  {
    title: '100% Secure',
    text: 'Your login credentials and data are encrypted.',
    image: 'https://cdn-icons-png.flaticon.com/512/4205/4205699.png',
  },
  {
    title: 'Returning User?',
    text: 'Welcome back! Let’s manage your bookings smoothly.',
    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135823.png',
  },
  {
    title: 'Your Dashboard',
    text: 'View, track, and manage your appointments in one place.',
    image: 'https://cdn-icons-png.flaticon.com/512/4287/4287723.png',
  },
];

// ✅ Use env var or fallback to Render URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://bookease-server.onrender.com';

const Login = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselSlides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      navigate('/profile');
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-black relative overflow-hidden">
      {/* LEFT: Carousel */}
      <div className="w-1/2 hidden md:flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-sm w-full bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-lg text-white"
          >
            <img
              src={carouselSlides[current].image}
              alt="Slide Visual"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{carouselSlides[current].title}</h2>
            <p className="text-white/80 text-sm">{carouselSlides[current].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md bg-black/30 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-lg text-white">
          <h2 className="text-3xl font-bold text-center mb-6">Login to Your Account</h2>

          {errorMsg && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{errorMsg}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <EnvelopeIcon className="w-5 h-5 text-white absolute left-3 top-3.5" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="peer w-full pl-10 pr-4 py-3 bg-transparent border border-gray-300 rounded-md text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-10 top-3 text-white text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:top-1 peer-focus:text-sm transition-all"
              >
                Email
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 text-white absolute left-3 top-3.5" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="peer w-full pl-10 pr-4 py-3 bg-transparent border border-gray-300 rounded-md text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-10 top-3 text-white text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:top-1 peer-focus:text-sm transition-all"
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded font-semibold text-white transition duration-200 bg-purple-600 hover:bg-purple-700"
            >
              Login
            </button>
          </form>

          {/* Signup redirect */}
          <p className="mt-6 text-center text-sm text-white/80">
            Don’t have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-white underline cursor-pointer hover:text-purple-300"
            >
              Sign up
            </span>
          </p>
          <StarsBackground />
        </div>
      </div>
    </div>
  );
};

export default Login;
