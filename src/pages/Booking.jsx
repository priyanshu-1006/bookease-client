import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import StarsBackground from '../components/StarsBackground';

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  ];

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

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time slot');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to book a slot');
      return;
    }

    const dateStr = selectedDate.toISOString().split('T')[0];

    try {
      // Step 1: Create Razorpay Order
      const orderRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 500 }),
      });

      const orderData = await orderRes.json();

      // Step 2: Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: 500 * 100,
        currency: 'INR',
        name: 'BookEase',
        description: `Slot Booking on ${dateStr} at ${selectedTime}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          // Step 3: Verify payment
          const verifyRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            // Step 4: Book slot
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
            }
          } else {
            toast.error('Payment verification failed!');
          }
        },
        theme: {
          color: '#6366F1',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Something went wrong during payment');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-10 px-4 bg-gradient-to-br from-indigo-200 via-blue-100 to-pink-200 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-5xl bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Book Your Appointment
        </h2>

        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Calendar */}
          <motion.div
            key={selectedDate?.toISOString() || 'calendar'}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 bg-white rounded-xl shadow p-4"
          >
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={new Date()}
              className="w-full rounded-lg"
            />
          </motion.div>

          {/* Time Slots */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
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
                        className={`py-2 px-3 rounded-lg border text-sm font-medium transition ${
                          isBooked
                            ? 'bg-red-200 text-red-700 cursor-not-allowed'
                            : isSelected
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 hover:bg-blue-100'
                        }`}
                        whileTap={{ scale: 0.95 }}
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

        {/* Confirm Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <button
            onClick={handleBooking}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition duration-300"
          >
            Pay & Book ₹500
          </button>
        </motion.div>

        <StarsBackground />
      </motion.div>
    </div>
  );
};

export default Booking;
