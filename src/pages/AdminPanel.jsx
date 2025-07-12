import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // 🔁 Fetch bookings
  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/admin/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error('Unauthorized or server error');
      }

      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching admin bookings:', err);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [navigate]);

  // ❌ Delete booking
 const handleDelete = async (id) => {
  const confirm = window.confirm(`Are you sure you want to delete booking ID: ${id}?`);
  if (!confirm) return;

  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`http://localhost:5000/api/admin/bookings/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const contentType = res.headers.get("content-type");
    if (!res.ok) {
      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete booking');
      } else {
        const text = await res.text();
        console.error("Non-JSON error:", text);
        throw new Error('Received non-JSON response from server');
      }
    }

    // Refresh bookings after delete
    fetchBookings();
  } catch (err) {
    console.error(err);
    alert(err.message || 'Failed to delete booking');
  }
};


  const filtered = bookings.filter(
    (b) =>
      b.username?.toLowerCase().includes(search.toLowerCase()) ||
      b.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <h2 className="text-3xl font-bold mb-6">📋 Admin Booking Panel</h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md mb-6 px-4 py-2 border border-white/20 rounded bg-slate-800 text-white"
      />

      {loading ? (
        <p>Loading bookings...</p>
      ) : filtered.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto border border-white/10 rounded-lg shadow">
          <table className="min-w-full text-sm table-auto">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Service ID</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-900 divide-y divide-white/10">
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td className="px-4 py-2">{b.id}</td>
                  <td className="px-4 py-2">{b.username}</td>
                  <td className="px-4 py-2">{b.email}</td>
                  <td className="px-4 py-2">{new Date(b.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{b.time || b.time_slot}</td>
                  <td className="px-4 py-2">{b.duration || '30 mins'}</td>
                  <td className="px-4 py-2">{b.service_id}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
