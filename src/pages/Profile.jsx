import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarsBackground from '../components/StarsBackground';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://bookease-server.onrender.com';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ phone: '', address: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError('You are not logged in.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || data.error || 'Failed to fetch user data');
        } else {
          setUser(data.user);
          setFormData({
            phone: data.user.phone || '',
            address: data.user.address || '',
          });
          setBookings(data.bookings || []);
        }
      } catch (err) {
        console.error('Profile Fetch Error:', err);
        setError('Something went wrong while loading your profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || data.error || 'Update failed');
      } else {
        alert('Profile updated successfully');
        setUser(data.user);
        setEditMode(false);
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarsBackground />

      <div className="relative z-10 max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8">
          {loading ? (
            <div className="text-center">
              <span className="animate-spin inline-block w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full"></span>
            </div>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <>
              {/* Profile Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8"
              >
                <div className="w-24 h-24 rounded-full bg-blue-400 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>

                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-1">{user?.name}</h1>
                  <p className="text-white/80">{user.email}</p>
                  <p className="text-sm text-white/60 mt-1">
                    Joined: {new Date(user.joined).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-white/60">Role: {user.role}</p>

                  <button
                    onClick={handleLogout}
                    className="mt-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>

                <div className="bg-white rounded-xl p-4 text-center shadow-md">
                  <p className="text-sm text-gray-500">Total Bookings</p>
                  <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
                </div>
              </motion.div>

              {/* Editable Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 text-white"
              >
                {!editMode ? (
                  <>
                    <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                    <p><strong>Address:</strong> {user.address || 'N/A'}</p>
                    <button
                      onClick={() => setEditMode(true)}
                      className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone"
                      className="w-full p-2 border rounded text-black"
                    />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="w-full p-2 border rounded mt-2 text-black"
                    />
                    <div className="mt-2 space-x-2">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </motion.div>

              {/* Bookings */}
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">📅 Your Bookings</h2>
                {bookings.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {bookings.map((booking, i) => (
                      <motion.div
                        key={booking.id || i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 bg-white/20 backdrop-blur rounded-lg shadow border border-white/10 text-white"
                      >
                        <p><strong>Date:</strong> {booking.date}</p>
                        <p><strong>Time:</strong> {booking.time}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/70">No bookings yet.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
