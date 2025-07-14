import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import StarsBackground from '../components/StarsBackground';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, date, time, paymentId } = location.state || {};

  useEffect(() => {
    if (!name || !date || !time) {
      navigate('/');
    }
  }, []);

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('BookEase - Booking Receipt', 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text(`Date: ${date}`, 20, 60);
    doc.text(`Time Slot: ${time}`, 20, 70);
    doc.text(`Payment ID: ${paymentId}`, 20, 80);
    doc.text(`Amount Paid: ₹1`, 20, 90);
    doc.text('Thank you for using BookEase!', 20, 110);

    doc.save('booking-receipt.pdf');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-black relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white/20 backdrop-blur-md p-8 rounded-2xl border border-white/30 shadow-2xl max-w-xl w-full text-center text-white relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          className="text-6xl mb-4"
        >
          ✅
        </motion.div>

        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-white/80 mb-6">
          Your slot has been booked successfully. A receipt is available for download below.
        </p>

        <div className="text-left mb-6 bg-white/10 p-4 rounded-lg border border-white/20">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Payment ID:</strong> {paymentId}</p>
          <p><strong>Amount:</strong> ₹1</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={downloadReceipt}
            className="px-6 py-2 rounded-full bg-green-500 hover:bg-green-600 transition"
          >
            📄 Download Receipt
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition"
          >
            🔙 Go to Dashboard
          </button>
        </div>
      </motion.div>
      <StarsBackground />
    </div>
  );
};

export default BookingSuccess;
