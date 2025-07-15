import React, { useEffect, useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import StarsBackground from '../components/StarsBackground';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const timeSlotRef = useRef(null);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  ];

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user))
        .catch((err) => console.error('User fetch error:', err));
    }
  }, [token]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) return;
      const dateStr = selectedDate.toISOString().split('T')[0];

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/slots/${dateStr}`);
        const data = await res.json();
        setBookedSlots(data.booked || []);
      } catch (err) {
        console.error('Error loading booked slots:', err);
        toast.error('Could not load booked slots.');
      }
    };

    fetchBookedSlots();
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate && timeSlotRef.current) {
      timeSlotRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedDate]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time slot');
      return;
    }

    if (!token) {
      toast.error('Please login to book a slot');
      return;
    }

    const dateStr = selectedDate.toISOString().split('T')[0];

    try {
      const orderRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1 }),
      });

      const orderData = await orderRes.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: 100,
        currency: 'INR',
        name: 'BookEase',
        description: `Slot Booking on ${dateStr} at ${selectedTime}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          const verifyRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            const bookingRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ date: dateStr, time: selectedTime }),
            });

            const bookingData = await bookingRes.json();

            if (!bookingRes.ok) {
              toast.error(bookingData.error || 'Booking failed');
            } else {
              toast.success('✅ Booking Confirmed!');
              setSelectedTime('');
              setBookedSlots([...bookedSlots, selectedTime]);
              setShowSuccess(true);
              confetti();
              setTimeout(() => {
                setShowSuccess(false);
                navigate('/booking-success', {
                  state: {
                    name: user?.name,
                    email: user?.email,
                    date: dateStr,
                    time: selectedTime,
                    paymentId: response.razorpay_payment_id,
                  },
                });
              }, 1500);
            }
          } else {
            toast.error('Payment verification failed!');
          }
        },
        theme: { color: '#6366F1' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Something went wrong during payment');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-10 px-4 bg-black overflow-hidden">
      <StarsBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Book Your Appointment</h2>

        <div className="flex flex-col md:flex-row gap-10 items-start">
          <motion.div
            key={selectedDate?.toISOString() || 'calendar'}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 bg-white/5 rounded-xl shadow p-4 border border-white/20"
          >
            <style>{`
              .react-calendar {
                background-color: rgba(31, 41, 55, 0.9);
                border-radius: 0.75rem;
                color: white;
                padding: 1rem;
                border: none;
              }
              .react-calendar__navigation button {
                color: white;
                font-weight: bold;
                background: none;
              }
              .react-calendar__month-view__weekdays {
                text-transform: uppercase;
                font-weight: 500;
                font-size: 0.75rem;
                color: rgba(255, 255, 255, 0.6);
              }
              .react-calendar__tile {
                background: none;
                color: white;
                border-radius: 0.5rem;
                padding: 0.5rem 0;
                transition: background 0.3s ease;
              }
              .react-calendar__tile--now {
                background: rgba(99, 102, 241, 0.3);
              }
              .react-calendar__tile--active {
                background: #6366f1 !important;
                color: white !important;
              }
              .react-calendar__tile:hover {
                background-color: rgba(255, 255, 255, 0.1);
              }
            `}</style>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={new Date()}
              className="w-full"
            />
          </motion.div>

          <div className="flex-1" ref={timeSlotRef}>
            <h3 className="text-lg font-semibold mb-4">
              {selectedDate
                ? `Available Slots on ${selectedDate.toDateString()}`
                : 'Select a date first'}
            </h3>

            <AnimatePresence mode="wait">
              {selectedDate && (
                <motion.div
                  key={selectedDate.toDateString()}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                >
                  {timeSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedTime === slot;

                    return (
                      <motion.button
                        layout
                        key={slot}
                        onClick={() => !isBooked && setSelectedTime(slot)}
                        disabled={isBooked}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition border transform hover:scale-105 hover:shadow-lg duration-200 ease-in-out ${
                          isBooked
                            ? 'bg-red-200 text-red-700 cursor-not-allowed'
                            : isSelected
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-100 text-gray-900 hover:bg-blue-100'
                        }`}
                      >
                        {slot}
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <button
            onClick={handleBooking}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full transition duration-300"
          >
            Pay & Book ₹1
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-10 w-full flex justify-center z-50"
          >
            <div className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 animate-bounce">
              <span className="text-2xl">✅</span> Booking Confirmed!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Booking;