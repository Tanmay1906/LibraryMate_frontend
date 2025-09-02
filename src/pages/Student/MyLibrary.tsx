import { mockStudents } from '../../utils/mockData';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Mail, Phone, MapPin, Calendar, Users, CreditCard, BookOpen } from 'lucide-react';
import Navbar from '../../components/Layout/Navbar';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

import { useAuth } from '../../utils/AuthContext';
/**
 * My Library Page Component
 * Displays detailed information about the student's assigned library
 * Includes subscription details, library contact info, and membership status
 */
const MyLibrary: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [library, setLibrary] = React.useState<any>(null);
  React.useEffect(() => {
    fetch('http://localhost:4000/api/libraries')
      .then(res => res.json())
      .then(data => setLibrary(data[0] || null))
      .catch(() => setLibrary(null));
  }, []);
  // You may want to fetch subscription details from backend as well
  const subscriptionDetails = {
    plan: 'Monthly Subscription',
    amount: 29.99,
    startDate: '2024-01-15',
    nextPayment: '2024-02-15',
    status: 'active',
    paymentMethod: 'Credit Card ending in 4532',
    features: [
      'Access to all digital books',
      'Mobile app access',
      'Email support',
      'Reading progress sync',
      'Offline reading capability'
    ]
  };

  /**
   * Membership statistics
   */
  const membershipStats = [
    {
      title: 'Member Since',
      value: 'January 2024',
      icon: <Calendar className="h-5 w-5" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Books Read',
      value: '12',
      icon: <BookOpen className="h-5 w-5" />,
      color: 'bg-emerald-500'
    },
    {
      title: 'Days Active',
      value: '28',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-amber-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-emerald-50 relative">
      <Navbar />
      {/* Glassmorphism background accent */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl absolute top-0 left-0" />
        <div className="w-72 h-72 bg-emerald-200/30 rounded-full blur-2xl absolute bottom-0 right-0" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight drop-shadow-lg">My Library</h1>
          <p className="text-lg text-slate-600 mt-3">Your library membership and subscription details.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Library Information */}
          <div className="lg:col-span-3 space-y-10">
            {/* Library Details */}
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <div className="flex items-start space-x-6 mb-8">
                <div className="bg-indigo-100 p-6 rounded-xl">
                  <Building className="h-10 w-10 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{library?.name || 'Library'}</h2>
                  <p className="text-slate-600 mt-2 text-lg">{library?.description || ''}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-slate-400" />
                    <div>
                      <p className="text-base font-medium text-slate-700">Address</p>
                      <p className="text-slate-900 text-lg">{library?.address || ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-slate-400" />
                    <div>
                      <p className="text-base font-medium text-slate-700">Phone</p>
                      <p className="text-slate-900 text-lg">{library?.phone || ''}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-slate-400" />
                    <div>
                      <p className="text-base font-medium text-slate-700">Email</p>
                      <p className="text-slate-900 text-lg">{library?.email || ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Users className="h-6 w-6 text-slate-400" />
                    <div>
                      <p className="text-base font-medium text-slate-700">Total Members</p>
                      <p className="text-slate-900 text-lg">{library?.totalStudents || 0} students</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Subscription Details */}
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-emerald-100 p-6 rounded-xl">
                    <CreditCard className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Subscription Details</h3>
                </div>
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-base font-semibold">
                  {subscriptionDetails.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-base font-medium text-slate-600">Current Plan</label>
                    <p className="text-lg font-semibold text-slate-900">{subscriptionDetails.plan}</p>
                  </div>
                  <div>
                    <label className="text-base font-medium text-slate-600">Monthly Amount</label>
                    <p className="text-lg font-semibold text-slate-900">${subscriptionDetails.amount}</p>
                  </div>
                  <div>
                    <label className="text-base font-medium text-slate-600">Payment Method</label>
                    <p className="text-slate-900 text-lg">{subscriptionDetails.paymentMethod}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-base font-medium text-slate-600">Start Date</label>
                    <p className="text-slate-900 text-lg">{new Date(subscriptionDetails.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-base font-medium text-slate-600">Next Payment</label>
                    <p className="text-slate-900 text-lg">{new Date(subscriptionDetails.nextPayment).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-base font-medium text-slate-600">Student ID</label>
                    <p className="text-slate-900 text-lg">{user?.registrationNumber || 'REG-2024-001'}</p>
                  </div>
                </div>
              </div>

              {/* Plan Features */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4">Plan Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subscriptionDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-base text-slate-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-8 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="font-semibold"
                  onClick={() => navigate('/student/upgrade-plan')}
                >
                  Upgrade Plan
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-semibold"
                  onClick={() => navigate('/student/update-payment')}
                >
                  Update Payment
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-semibold"
                  onClick={() => alert('Invoice downloaded!')}
                >
                  Download Invoice
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            {/* Membership Stats */}
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Membership Overview</h3>
              <div className="space-y-4">
                {membershipStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 via-white to-indigo-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg`}>{stat.icon}</div>
                      <span className="text-base font-semibold text-slate-700">{stat.title}</span>
                    </div>
                    <span className="font-bold text-slate-900 text-lg">{stat.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 rounded-xl shadow flex items-center gap-3 text-indigo-900 font-semibold"
                  onClick={() => navigate('/student/books')}
                >
                  <BookOpen size={18} className="mr-2" />Browse Books
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 rounded-xl shadow flex items-center gap-3 text-blue-900 font-semibold"
                  onClick={() => navigate('/student/payment-history')}
                >
                  <CreditCard size={18} className="mr-2" />Payment History
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-emerald-100 to-emerald-50 hover:from-emerald-200 hover:to-emerald-100 rounded-xl shadow flex items-center gap-3 text-emerald-900 font-semibold"
                  onClick={() => navigate('/support')}
                >
                  <Mail size={18} className="mr-2" />Contact Library
                </Button>
              </div>
            </Card>

            {/* Payment Reminder */}
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-amber-100 p-4 rounded-xl">
                  <Calendar className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Payment Reminder</h3>
              </div>
              <p className="text-base text-slate-600 mb-6">
                Your next payment of <span className="font-semibold">${subscriptionDetails.amount}</span> is due on{' '}
                <span className="font-semibold">{new Date(subscriptionDetails.nextPayment).toLocaleDateString()}</span>
              </p>
              <Button
                variant="primary"
                size="sm"
                className="w-full font-semibold"
                onClick={() => navigate('/student/payment-history')}
              >
                Pay Now
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLibrary;