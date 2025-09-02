import { mockStudents } from '../../utils/mockData';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, CreditCard, Heart, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import Navbar from '../../components/Layout/Navbar';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

/**
 * Student Dashboard Component
 * Provides overview of student's library activity, reading progress, and subscription status
 * Features reading statistics, recent activity, and quick access to books
 */
const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  // State for books and library info
  const [books, setBooks] = React.useState<any[]>([]);
  const [library, setLibrary] = React.useState<any>(null);
  const [recentActivity, setRecentActivity] = React.useState<any[]>([]);

  // Calculate reading statistics
  const totalBooks = books.length;
  const completedBooks = books.filter(book => book.isCompleted).length;
  const wishlistedBooks = books.filter(book => book.isWishlisted).length;
  const currentlyReading = books.filter(book => book.readingProgress > 0 && !book.isCompleted).length;

  React.useEffect(() => {
    // Fetch books from backend
    fetch('http://localhost:4000/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(() => setBooks([]));
    // Fetch library info from backend
    fetch('http://localhost:4000/api/libraries')
      .then(res => res.json())
      .then(data => setLibrary(data[0] || null))
      .catch(() => setLibrary(null));
    // Fetch recent activity from backend (if available)
    // fetch('http://localhost:4000/api/activity')
    //   .then(res => res.json())
    //   .then(data => setRecentActivity(data))
    //   .catch(() => setRecentActivity([]));
  }, []);

  /**
   * Reading stats for dashboard overview
   */
  const readingStats = [
    {
      title: 'Books Available',
      value: totalBooks,
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-blue-500',
      description: 'Total books in library'
    },
    {
      title: 'Completed',
      value: completedBooks,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'bg-emerald-500',
      description: 'Books completed'
    },
    {
      title: 'Currently Reading',
      value: currentlyReading,
      icon: <Clock className="h-6 w-6" />,
      color: 'bg-amber-500',
      description: 'Books in progress'
    },
    {
      title: 'Wishlist',
      value: wishlistedBooks,
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-red-500',
      description: 'Books saved for later'
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
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight drop-shadow-lg">Welcome back, Reader!</h1>
          <p className="text-lg text-slate-600 mt-3">Continue your learning journey with <span className="font-semibold text-indigo-600">{library?.name || 'Library'}</span>.</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {readingStats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`inline-flex p-4 rounded-xl ${stat.color} shadow-lg mb-4`}>{stat.icon}</div>
                  <p className="text-3xl font-extrabold text-slate-900 drop-shadow-sm">{stat.value}</p>
                  <p className="text-base text-slate-500 mt-1 font-medium">{stat.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{stat.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content: Current Reading & Recent Activity */}
          <div className="lg:col-span-2 space-y-10">
            {/* Currently Reading */}
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Currently Reading</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/60 border border-indigo-200 hover:bg-indigo-50 transition-colors shadow"
                  onClick={() => navigate('/student/books')}
                >
                  View All Books
                </Button>
              </div>
              <div className="space-y-5">
                {books.filter(book => book.readingProgress > 0 && !book.isCompleted).slice(0, 2).map((book) => (
                  <div key={book.id} className="flex items-center space-x-6 p-6 bg-gradient-to-r from-slate-50 via-white to-indigo-50 rounded-xl shadow-sm hover:scale-[1.01] transition-transform">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-20 h-28 object-cover rounded-xl shadow-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 text-lg">{book.title}</h4>
                      <p className="text-sm text-slate-600">{book.author}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm text-slate-600 mb-1">
                          <span>Progress</span>
                          <span>{book.readingProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${book.readingProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate('/book-reader/' + book.id)}
                    >
                      Continue Reading
                    </Button>
                  </div>
                ))}
                {books.filter(book => book.readingProgress > 0 && !book.isCompleted).length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500">No books currently in progress</p>
                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-4"
                      onClick={() => navigate('/student/books')}
                    >
                      Browse Books
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Recent Activity</h3>
                <TrendingUp className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="space-y-5">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-5 bg-gradient-to-r from-slate-50 via-white to-indigo-50 rounded-xl shadow-sm">
                    <div className="mt-1 p-3 bg-indigo-100 text-indigo-600 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-current" />
                    </div>
                    <div className="flex-1">
                      <p className="text-base text-slate-900 font-semibold">
                        <span className="font-medium">{activity.action}</span>{' '}
                        <span className="text-indigo-600">{activity.book}</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            {/* Library Info */}
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-emerald-100 p-4 rounded-xl">
                  <BookOpen className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">My Library</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Library</label>
                  <p className="text-slate-900">{library?.name || 'Library'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Member Since</label>
                  <p className="text-slate-900">January 2024</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Subscription</label>
                  <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Monthly Plan - Active</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/student/my-library')}
              >
                View Library Details
              </Button>
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
                  <BookOpen className="h-5 w-5 mr-2" />Browse All Books
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-emerald-100 to-emerald-50 hover:from-emerald-200 hover:to-emerald-100 rounded-xl shadow flex items-center gap-3 text-emerald-900 font-semibold"
                  onClick={() => navigate('/student/wishlist')}
                >
                  <Heart className="h-5 w-5 mr-2" />View Wishlist
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 rounded-xl shadow flex items-center gap-3 text-amber-900 font-semibold"
                  onClick={() => navigate('/student/completed-books')}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />Completed Books
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 rounded-xl shadow flex items-center gap-3 text-blue-900 font-semibold"
                  onClick={() => navigate('/student/payment-history')}
                >
                  <CreditCard className="h-5 w-5 mr-2" />Payment History
                </Button>
              </div>
            </Card>

            {/* Subscription Status */}
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-amber-100 p-4 rounded-xl">
                  <Calendar className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Subscription</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Current Plan</span>
                  <span className="font-medium text-slate-900">Monthly</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Amount</span>
                  <span className="font-medium text-slate-900">$29.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Next Payment</span>
                  <span className="font-medium text-slate-900">Feb 15, 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Status</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Active</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;