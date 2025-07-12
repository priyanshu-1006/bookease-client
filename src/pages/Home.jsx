import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import StarsBackground from '../components/StarsBackground';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full relative px-4 pt-20 pb-10 overflow-hidden bg-transparent"
    >
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center z-10 relative min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Welcome to <span className="text-yellow-300">BookEase</span>
          </h1>
          <p className="text-white/90 text-lg mb-6">
            Book your appointments effortlessly with our modern interface.
          </p>
          <div className="text-white font-mono mb-6 text-sm">
            {currentTime.toLocaleDateString()} — {currentTime.toLocaleTimeString()}
          </div>
          <Link
            to="/booking"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full text-lg transition duration-200 shadow-lg"
          >
            Get Started
          </Link>
        </motion.div>

        <motion.img
          src="https://images.template.net/78647/Free-Business-Growth-Illustration-1.jpg"
          alt="Hero"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="w-full max-h-[400px] rounded-xl shadow-xl"
        />
      </div>

      {/* Calendar Section */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-20 max-w-md mx-auto z-10 relative bg-white/10 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-xl text-white"
      >
        <h2 className="text-xl font-bold mb-4 text-center">📅 Choose a Date</h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          minDate={new Date()}
          className="w-full rounded-lg text-black"
        />
        <p className="mt-4 text-center text-sm text-white/90">
          Selected: <span className="font-semibold">{selectedDate.toDateString()}</span>
        </p>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-20 max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-8 shadow-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">What Users Say</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm md:text-base">
          <div className="p-4 bg-white/10 rounded-lg shadow">
            <p className="italic">"BookEase made my life easier — I never miss a booking now!"</p>
            <p className="mt-2 font-semibold text-yellow-200">— Rakshita</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg shadow">
            <p className="italic">"Super clean design and easy to use. Highly recommend!"</p>
            <p className="mt-2 font-semibold text-yellow-200">— Kislay Dubey</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg shadow">
            <p className="italic">"Perfect for freelancers and businesses to manage slots."</p>
            <p className="mt-2 font-semibold text-yellow-200">— Amitesh Vishwakarma</p>
          </div>
        </div>
      </motion.div>

      {/* Signup CTA Section */}
<section className="relative py-16 px-4 mt-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl max-w-4xl mx-auto text-center text-white z-10">
  {/* Sparkle animation (subtle and white) */}
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
    <div className="animate-ping w-3 h-3 bg-white rounded-full absolute top-6 left-10 opacity-20"></div>
    <div className="animate-ping w-4 h-4 bg-yellow-300 rounded-full absolute top-14 right-20 opacity-30"></div>
    <div className="animate-ping w-5 h-5 bg-white rounded-full absolute bottom-10 left-32 opacity-20"></div>
  </div>

  <motion.h2
    className="text-3xl font-bold mb-4 relative z-10"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    🎁 New Here? Join <span className="text-yellow-300">BookEase</span> Today!
  </motion.h2>
  <p className="text-md max-w-xl mx-auto mb-6 relative z-10 text-white/80">
    Sign up now to unlock smooth bookings, instant alerts, and exclusive perks for members.
  </p>
  <motion.div
    whileHover={{ scale: 1.05, rotate: [-2, 2, -2] }}
    whileTap={{ scale: 0.95 }}
    className="relative z-10 inline-block"
  >
    <Link
      to="/signup"
      className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold shadow-md transition duration-200"
    >
      🎉 Create Your Free Account
    </Link>
  </motion.div>
</section>

      {/* Footer */}
      <footer className="mt-20 text-white text-center border-t border-white/20 pt-6 pb-10 text-sm relative z-10">
        <div className="mb-2">
          Made with ❤️ by <span className="font-semibold">Priyanshu Chaurasia</span>
        </div>
        <div className="flex justify-center gap-4 text-white/70 mt-2">
          <a href="https://github.com" target="_blank" className="hover:text-white transition">GitHub</a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-white transition">LinkedIn</a>
          <a href="https://instagram.com" target="_blank" className="hover:text-white transition">Instagram</a>
        </div>
        <StarsBackground />
      </footer>
    </motion.div>
  );
};

export default Home;
