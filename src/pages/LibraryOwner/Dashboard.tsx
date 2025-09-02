import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, CreditCard, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import Navbar from '../../components/Layout/Navbar';
import Card from '../../components/UI/Card';


/**
 * Library Owner Dashboard Component
 * Provides overview of library statistics, student management, and recent activities
 * Features responsive grid layout and interactive charts placeholder
 */
const LibraryOwnerDashboard: React.FC = () => {
  const navigate = useNavigate();
  // State for students and library info
  const [students, setStudents] = React.useState<any[]>([]);
  const [library, setLibrary] = React.useState<any>(null);
  React.useEffect(() => {
    fetch('http://localhost:4000/api/students')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(() => setStudents([]));
    fetch('http://localhost:4000/api/libraries')
      .then(res => res.json())
      .then(data => setLibrary(data[0] || null))
      .catch(() => setLibrary(null));
  }, []);
  const totalStudents = students.length;
  const activeSubscriptions = students.filter(s => s.paymentStatus === 'paid').length;
  const pendingPayments = students.filter(s => s.paymentStatus === 'pending').length;
  const monthlyRevenue = library?.monthlyRevenue || 0;

  // Recent activities from backend (if available)
  const [recentActivities, setRecentActivities] = React.useState<any[]>([]);
  // Uncomment and implement backend endpoint for activities
  // React.useEffect(() => {
  //   fetch('http://localhost:4000/api/activities')
  //     .then(res => res.json())
  //     .then(data => setRecentActivities(data))
  //     .catch(() => setRecentActivities([]));
  // }, []);

  // Dashboard statistics data
  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: <Users className="h-8 w-8" />,
      color: 'bg-indigo-100 text-indigo-600',
      change: '+5%',
      changeType: 'positive',
    },
    {
      title: 'Active Subscriptions',
      value: activeSubscriptions,
      icon: <CreditCard className="h-8 w-8" />,
      color: 'bg-emerald-100 text-emerald-600',
      change: '+2%',
      changeType: 'positive',
    },
    {
      title: 'Pending Payments',
      value: pendingPayments,
      icon: <AlertCircle className="h-8 w-8" />,
      color: 'bg-amber-100 text-amber-600',
      change: '-1%',
      changeType: 'negative',
    },
    {
      title: 'Monthly Revenue',
      value: `₹${monthlyRevenue}`,
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'bg-blue-100 text-blue-600',
      change: '+8%',
      changeType: 'positive',
    },
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
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight drop-shadow-lg">Library Dashboard</h1>
              <p className="text-lg text-slate-600 mt-3">Welcome back! <span className="font-semibold text-indigo-600">Here's what's happening at your library.</span></p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 p-6 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`inline-flex p-4 rounded-xl ${stat.color} shadow-lg mb-4`}>{stat.icon}</div>
                      <p className="text-3xl font-extrabold text-slate-900 drop-shadow-sm">{stat.value}</p>
                      <p className="text-base text-slate-500 mt-1 font-medium">{stat.title}</p>
                    </div>
                    <div className={`text-base font-semibold ${
                      stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Recent Activities */}
              <div className="lg:col-span-2">
                <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">Recent Activities</h3>
                    <TrendingUp className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="space-y-5">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-5 bg-gradient-to-r from-slate-50 via-white to-indigo-50 rounded-xl shadow-sm">
                        <div className={`mt-1 p-3 rounded-full shadow ${
                          activity.type === 'student' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'payment' ? 'bg-emerald-100 text-emerald-600' :
                          activity.type === 'subscription' ? 'bg-amber-100 text-amber-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          <div className="w-2 h-2 rounded-full bg-current" />
                        </div>
                        <div className="flex-1">
                          <p className="text-base text-slate-900 font-semibold">{activity.message}</p>
                          <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Quick Actions & Upcoming */}
              <div className="space-y-10">
                {/* Quick Actions */}
                <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h3>
                  <div className="space-y-4">
                    <button
                      className="w-full text-left px-5 py-4 bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 rounded-xl shadow transition-all flex items-center space-x-4 group"
                      onClick={() => navigate('/owner/add-student')}
                    >
                      <Users className="h-6 w-6 text-indigo-600 group-hover:scale-110 transition-transform" />
                      <span className="text-base font-semibold text-indigo-900 group-hover:text-indigo-700">Add New Student</span>
                    </button>
                    <button
                      className="w-full text-left px-5 py-4 bg-gradient-to-r from-emerald-100 to-emerald-50 hover:from-emerald-200 hover:to-emerald-100 rounded-xl shadow transition-all flex items-center space-x-4 group"
                      onClick={() => navigate('/owner/library-info')}
                    >
                      <BookOpen className="h-6 w-6 text-emerald-600 group-hover:scale-110 transition-transform" />
                      <span className="text-base font-semibold text-emerald-900 group-hover:text-emerald-700">Manage Library</span>
                    </button>
                    <button
                      className="w-full text-left px-5 py-4 bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 rounded-xl shadow transition-all flex items-center space-x-4 group"
                      onClick={() => navigate('/owner/notifications')}
                    >
                      <AlertCircle className="h-6 w-6 text-amber-600 group-hover:scale-110 transition-transform" />
                      <span className="text-base font-semibold text-amber-900 group-hover:text-amber-700">Send Reminders</span>
                    </button>
                  </div>
                </Card>

                {/* Upcoming Payments */}
                <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Upcoming Payments</h3>
                  <div className="space-y-4">
                    {students.filter(s => s.paymentStatus === 'pending').slice(0, 3).map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 via-white to-amber-50 rounded-xl shadow-sm">
                        <div>
                          <p className="text-base font-semibold text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-500">{student.subscriptionPlan}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-xs text-amber-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{new Date(student.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
          </div>
      );
};

export default LibraryOwnerDashboard;