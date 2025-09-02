import React, { useState } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
// import { subscriptionPlans } from '../../utils/mockData';
/**
 * Add Student Page Component
 * Allows library owners to register new students with subscription plans
 * Features comprehensive form validation and payment configuration
 */
const AddStudent: React.FC = () => {
  // Helper to format price in INR
  const formatINR = (amount: number) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  // Set INR prices for dropdown (mock)
  const planPrices: Record<string, number> = {
    monthly: 2499,
    quarterly: 6499,
    yearly: 24999
  };
  const [plans, setPlans] = useState<any>({});
  React.useEffect(() => {
    fetch('http://localhost:4000/api/subscription-plans')
      .then(res => res.json())
      .then(data => setPlans(data))
      .catch(() => setPlans({}));
  }, []);
  // Get last registration number from localStorage or start at 1
  // Only increment registration number if a student is actually added
  const getNextRegNumber = () => {
    const assignedNumbers = JSON.parse(localStorage.getItem('assignedRegNumbers') || '[]');
    let nextNum = 1;
    while (assignedNumbers.includes(nextNum)) {
      nextNum++;
    }
    return `REG-2025-${String(nextNum).padStart(3, '0')}`;
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    registrationNumber: getNextRegNumber(),
    subscriptionPlan: 'monthly' as 'monthly' | 'quarterly' | 'yearly',
    paymentMethod: 'one_time' as 'one_time' | 'emi',
    emiUpgrade: '',
    startDate: new Date().toISOString().split('T')[0],
    aadharFile: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  /**
   * Handle input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      // Prevent manual change of registrationNumber
      if (name === 'registrationNumber') return;
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setError('');
    setSuccess(false);
  };

  /**
   * Validate form data
   */
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Student name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email address is required');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
  // Registration number is always auto-assigned
    return true;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Reset form and show success
      // Mark this registration number as assigned
      const regNum = parseInt(formData.registrationNumber.split('-')[2], 10);
      const assignedNumbers = JSON.parse(localStorage.getItem('assignedRegNumbers') || '[]');
      if (!assignedNumbers.includes(regNum)) {
        assignedNumbers.push(regNum);
        localStorage.setItem('assignedRegNumbers', JSON.stringify(assignedNumbers));
      }
      setFormData({
        name: '',
        email: '',
        phone: '',
        registrationNumber: getNextRegNumber(),
        subscriptionPlan: 'monthly',
        paymentMethod: 'one_time',
        emiUpgrade: '',
        startDate: new Date().toISOString().split('T')[0],
        aadharFile: null
      });
      setSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to add student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedPlan = plans[formData.subscriptionPlan] || { duration: '', price: 0, features: [] };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-emerald-50 relative">
      <Navbar />
      {/* Glassmorphism background accent */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl absolute top-0 left-0" />
        <div className="w-72 h-72 bg-emerald-200/30 rounded-full blur-2xl absolute bottom-0 right-0" />
      </div>
      <div className="relative z-10 max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-16 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight drop-shadow-lg">Add New Student</h1>
          <p className="text-lg text-slate-600 mt-3">Register a new student and <span className="font-semibold text-indigo-600">set up their subscription.</span></p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl shadow">
            Student added successfully! You can add another student or manage existing ones.
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-0 lg:gap-0">
          {/* Sidebar - Subscription Summary & Features */}
          <aside className="lg:w-96 flex-shrink-0 space-y-12 lg:sticky lg:top-24 h-fit bg-transparent lg:border-r lg:border-slate-200 lg:pr-12 pb-12 mb-12 lg:mb-0">
            {/* Subscription Summary */}
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-2xl p-8 rounded-2xl mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Subscription Summary</h3>
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Plan</span>
                  <span className="font-semibold text-slate-900 capitalize">{formData.subscriptionPlan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-semibold text-slate-900">{selectedPlan.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Price</span>
                  <span className="font-semibold text-slate-900">{formatINR(planPrices[formData.subscriptionPlan] || 0)}</span>
                </div>
                {formData.paymentMethod === 'emi' && formData.emiUpgrade && (
                  <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600">EMI Option</span>
                      <span className="font-semibold text-indigo-700">{
                        formData.emiUpgrade === '3_month' ? '3 Months - No Interest'
                          : formData.emiUpgrade === '6_month' ? '6 Months - 5% Interest'
                            : formData.emiUpgrade === '12_month' ? '12 Months - 10% Interest'
                              : ''
                      }</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Installment Amount</span>
                      <span className="font-semibold text-indigo-700">
                        {(() => {
                          const base = planPrices[formData.subscriptionPlan] || 0;
                          let months = 1;
                          let interest = 0;
                          if (formData.emiUpgrade === '3_month') { months = 3; interest = 0; }
                          if (formData.emiUpgrade === '6_month') { months = 6; interest = 0.05; }
                          if (formData.emiUpgrade === '12_month') { months = 12; interest = 0.10; }
                          const total = base * (1 + interest);
                          return `${formatINR(total / months)} x ${months} months`;
                        })()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2 font-bold text-lg">
                      <span className="text-slate-900">Total Payable</span>
                      <span className="text-indigo-600">
                        {(() => {
                          const base = planPrices[formData.subscriptionPlan] || 0;
                          let interest = 0;
                          if (formData.emiUpgrade === '3_month') interest = 0;
                          if (formData.emiUpgrade === '6_month') interest = 0.05;
                          if (formData.emiUpgrade === '12_month') interest = 0.10;
                          return formatINR(base * (1 + interest));
                        })()}
                      </span>
                    </div>
                  </div>
                )}
                <div className="border-t pt-5">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span className="text-slate-900">Total</span>
                    <span className="text-indigo-600">{formatINR(planPrices[formData.subscriptionPlan] || 0)}</span>
                  </div>
                </div>
              </div>
            </Card>
            {/* Plan Features */}
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-2xl p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Plan Features</h3>
              <ul className="space-y-4">
                {selectedPlan.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-base text-slate-600">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
          {/* Main Form */}
          <main className="flex-1 flex flex-col items-center justify-center py-2 px-0 lg:px-16">
            <div className="w-full max-w-4xl space-y-12">
              {/* Student Information */}
              <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-2xl p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Student Information</h3>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input
                      name="name"
                      label="Full Name"
                      placeholder="Enter student's full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/60 border border-indigo-200 rounded-lg"
                    />
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Aadhar Card (PDF or Image)</label>
                      <input
                        type="file"
                        name="aadharFile"
                        accept=".pdf,image/*"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-indigo-200 rounded-xl text-slate-900 bg-white/80 shadow"
                      />
                      {formData.aadharFile && (
                        <span className="text-xs text-emerald-700 mt-1 block">Selected: {formData.aadharFile.name}</span>
                      )}
                    </div>
                    <Input
                      name="registrationNumber"
                      label="Registration Number"
                      value={formData.registrationNumber}
                      readOnly
                      className="bg-white/60 border border-indigo-200 rounded-lg cursor-not-allowed"
                    />
                    <Input
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/60 border border-indigo-200 rounded-lg"
                    />
                    <Input
                      name="phone"
                      type="tel"
                      label="Phone Number"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-white/60 border border-indigo-200 rounded-lg"
                    />
                  </div>
                  {/* Subscription Setup */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Subscription Setup</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Subscription Plan
                        </label>
                        <select
                          name="subscriptionPlan"
                          value={formData.subscriptionPlan}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-indigo-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80 shadow"
                        >
                          <option value="monthly">Monthly - ₹2,499.00</option>
                          <option value="quarterly">Quarterly - ₹6,499.00 (10% off)</option>
                          <option value="yearly">Yearly - ₹24,999.00 (20% off)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Payment Method
                        </label>
                        <select
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-indigo-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80 shadow"
                        >
                          <option value="one_time">One-time Payment</option>
                          <option value="emi">EMI (Installments)</option>
                        </select>
                        {formData.paymentMethod === 'emi' && (
                          <div className="mt-4">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">EMI Upgrade Options</label>
                            <select
                              name="emiUpgrade"
                              value={formData.emiUpgrade || ''}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-indigo-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 shadow"
                            >
                              <option value="">Select EMI Option</option>
                              <option value="3_month">3 Months - No Interest</option>
                              <option value="6_month">6 Months - 5% Interest</option>
                              <option value="12_month">12 Months - 10% Interest</option>
                            </select>
                          </div>
                        )}
                      </div>
                      <Input
                        name="startDate"
                        type="date"
                        label="Start Date"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="bg-white/60 border border-indigo-200 rounded-lg"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full md:w-auto mt-4 shadow-lg hover:scale-[1.03] transition-transform"
                  >
                    Add Student
                  </Button>
                </form>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;