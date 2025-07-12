import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api.get('/bookings/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  return (
    <BookingContext.Provider value={{ bookings, loading, fetchBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
