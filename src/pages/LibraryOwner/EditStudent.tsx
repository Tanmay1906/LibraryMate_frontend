import { mockStudents } from '../../utils/mockData';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
// import { subscriptionPlans } from '../../utils/mockData';
/**
 * Edit Student Page Component
 * Allows library owners to edit student details and subscription
 */
const EditStudent: React.FC = () => {
  const [plans, setPlans] = useState<any>({});
  React.useEffect(() => {
    fetch('http://localhost:4000/api/subscription-plans')
      .then(res => res.json())
      .then(data => setPlans(data))
      .catch(() => setPlans({}));
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  // Get student data from navigation state
  const student = location.state?.student;
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    phone: student?.phone || '',
    registrationNumber: student?.registrationNumber || '',
    subscriptionPlan: student?.subscriptionPlan || 'monthly',
    paymentStatus: student?.paymentStatus || 'active',
    joinDate: student?.joinDate || '',
    dueDate: student?.dueDate || '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => {
        navigate(-1); // Go back to students list
      }, 1500);
    } catch (err) {
      setError('Failed to update student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-emerald-50 relative">
      <Navbar />
      <div className="relative z-10 max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-16 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight drop-shadow-lg">Edit Student Details</h1>
          <p className="text-lg text-slate-600 mt-3">Update student information and subscription plan.</p>
        </div>
        {success && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl shadow">
            Student updated successfully!
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow">
            {error}
          </div>
        )}
        <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-2xl p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-white/60 border border-indigo-200 rounded-lg"
              />
              <Input
                name="registrationNumber"
                label="Registration Number"
                value={formData.registrationNumber}
                onChange={handleChange}
                required
                className="bg-white/60 border border-indigo-200 rounded-lg"
              />
              <Input
                name="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-white/60 border border-indigo-200 rounded-lg"
              />
              <Input
                name="phone"
                type="tel"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-white/60 border border-indigo-200 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subscription Plan</label>
                <select
                  name="subscriptionPlan"
                  value={formData.subscriptionPlan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-indigo-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80 shadow"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Status</label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-indigo-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80 shadow"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                name="joinDate"
                type="date"
                label="Join Date"
                value={formData.joinDate}
                onChange={handleChange}
                required
                className="bg-white/60 border border-indigo-200 rounded-lg"
              />
              <Input
                name="dueDate"
                type="date"
                label="Due Date"
                value={formData.dueDate}
                onChange={handleChange}
                required
                className="bg-white/60 border border-indigo-200 rounded-lg"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full md:w-auto mt-4 shadow-lg hover:scale-[1.03] transition-transform"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditStudent;
