import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import StarsBackground from '../components/StarsBackground';

const carouselSlides = [
  {
    title: 'Book Smarter',
    text: 'Schedule slots instantly and never miss appointments.',
    image: 'https://cdn-icons-png.flaticon.com/512/4221/4221430.png',
  },
  {
    title: 'Trusted & Secure',
    text: 'End-to-end encryption keeps your data safe.',
    image: 'https://cdn-icons-png.flaticon.com/512/3064/3064197.png',
  },
  {
    title: 'Loved by Users',
    text: '"BookEase made my freelancing life 10x easier!" — Anjali Sharma',
    image: 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png',
  },
  {
    title: 'Stay Organized',
    text: 'Manage all bookings in one beautiful dashboard.',
    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
];

const Signup = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselSlides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Signup failed');
        setLoading(false);
        return;
      }

      setSuccessMsg('Signup successful! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
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

      {/* RIGHT: Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md bg-black/30 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-lg text-white">
          <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>

          {errorMsg && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{errorMsg}</div>
          )}
          {successMsg && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{successMsg}</div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Name */}
            <div className="relative">
              <UserIcon className="w-5 h-5 text-white absolute left-3 top-3.5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full pl-10 pr-4 py-3 bg-transparent border border-gray-300 rounded-md text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Name"
              />
              <label
                htmlFor="name"
                className="absolute left-10 top-3 text-white text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:top-1 peer-focus:text-sm transition-all"
              >
                Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <EnvelopeIcon className="w-5 h-5 text-white absolute left-3 top-3.5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
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
              disabled={loading}
              className={`w-full py-3 rounded font-semibold text-white transition duration-200 ${
                loading ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          {/* Login redirect */}
          <p className="mt-6 text-center text-sm text-white/80">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-white underline cursor-pointer hover:text-purple-300"
            >
              Login
            </span>
          </p>
        <StarsBackground />
        </div>
      </div>
    </div>
  );
};

export default Signup;
