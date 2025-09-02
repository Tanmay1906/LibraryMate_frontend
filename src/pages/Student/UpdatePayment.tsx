import { mockStudents } from '../../utils/mockData';
import React from 'react';
import Card from '../../components/UI/Card';
import Navbar from '../../components/Layout/Navbar';
const UpdatePayment: React.FC = () => {
  const [method, setMethod] = React.useState('card');
  const [cardNumber, setCardNumber] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [error, setError] = React.useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'card' && cardNumber.length < 12) {
      setError('Please enter a valid card number.');
      return;
    }
    setSuccess('Payment method updated successfully!');
    setError('');
    setTimeout(() => {
      window.location.href = '/student/my-library';
    }, 1500);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-emerald-50">
      <Navbar />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <Card className="p-8 bg-white/80 backdrop-blur-lg border border-slate-100 shadow-2xl rounded-2xl">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Update Payment</h1>
          <p className="text-slate-700 mb-6">Update your payment method for future subscription payments.</p>
          {success && <div className="mb-4 p-3 bg-emerald-100 text-emerald-800 rounded-lg">{success}</div>}
          {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Select Payment Method</label>
              <select
                value={method}
                onChange={e => setMethod(e.target.value)}
                className="w-full px-4 py-3 border border-indigo-200 rounded-lg bg-white/60 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            {method === 'card' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-indigo-200 rounded-lg bg-white/60 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter card number"
                  maxLength={16}
                  required
                />
              </div>
            )}
            {method === 'upi' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">UPI ID</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-indigo-200 rounded-lg bg-white/60 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter UPI ID"
                  required
                />
              </div>
            )}
            {method === 'paypal' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">PayPal Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-indigo-200 rounded-lg bg-white/60 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter PayPal email"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl shadow hover:bg-indigo-700 transition"
            >
              Update Payment
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UpdatePayment;
