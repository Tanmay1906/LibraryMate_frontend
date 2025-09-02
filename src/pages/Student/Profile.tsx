import { mockStudents } from '../../utils/mockData';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Save, Edit3, X, Calendar } from 'lucide-react';
import Navbar from '../../components/Layout/Navbar';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useAuth } from '../../utils/AuthContext';
/**
 * Student Profile Page Component
 * Allows students to view and edit their profile information
 * Includes reading preferences, account settings, and password management
 */
const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    registrationNumber: user?.registrationNumber || '',
    joinDate: '2024-01-15',
    favoriteGenres: ['Classic Literature', 'Science Fiction'],
    readingGoal: 24
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  /**
   * Handle profile input changes
   */
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Handle password input changes
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Save profile changes
   */
  const handleSaveProfile = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Change password
   */
  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccess('Password changed successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancel editing
   */
  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      registrationNumber: user?.registrationNumber || '',
      joinDate: '2024-01-15',
      favoriteGenres: ['Classic Literature', 'Science Fiction'],
      readingGoal: 24
    });
    setIsEditing(false);
    setError('');
  };

  // Reading statistics from backend
  const [readingStats, setReadingStats] = useState<any[]>([]);
  React.useEffect(() => {
    fetch('http://localhost:4000/api/students/' + user?.id + '/stats')
      .then(res => res.json())
      .then(data => setReadingStats(data))
      .catch(() => setReadingStats([]));
  }, [user?.id]);

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
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight drop-shadow-lg">My Profile</h1>
          <p className="text-lg text-slate-600 mt-3">Manage your account information and reading preferences.</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl shadow">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-0 lg:gap-0">
          {/* Sidebar - shorter, only Account Overview and Quick Actions */}
          <aside className="lg:w-96 flex-shrink-0 space-y-12 lg:sticky lg:top-24 h-fit bg-transparent lg:border-r lg:border-slate-200 lg:pr-12 pb-12 mb-12 lg:mb-0">
            {/* Account Overview */}
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-2xl p-8 rounded-2xl mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Account Overview</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-600">Account Type</label>
                  <p className="text-slate-900">Student</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Member Since</label>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-slate-400" />
                    <span className="text-slate-900">{new Date(profileData.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Subscription</label>
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                    Monthly Plan - Active
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Status</label>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    Active Reader
                  </span>
                </div>
              </div>
            </Card>
            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-2xl p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 rounded-xl shadow flex items-center gap-3 text-indigo-900 font-semibold"
                  onClick={() => navigate('/student/dashboard')}
                >
                  View Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-emerald-100 to-emerald-50 hover:from-emerald-200 hover:to-emerald-100 rounded-xl shadow flex items-center gap-3 text-emerald-900 font-semibold"
                  onClick={() => navigate('/student/books')}
                >
                  Browse Books
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 rounded-xl shadow flex items-center gap-3 text-amber-900 font-semibold"
                  onClick={() => navigate('/student/payment-history')}
                >
                  Payment History
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 rounded-xl shadow flex items-center gap-3 text-blue-900 font-semibold"
                  onClick={() => navigate('/support')}
                >
                  Contact Support
                </Button>
              </div>
            </Card>
          </aside>
          {/* Main Profile Information */}
          <main className="flex-1 flex flex-col items-center justify-center py-2 px-0 lg:px-16">
            <div className="w-full max-w-4xl space-y-12">
              {/* Personal Information */}
              <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-2xl p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-100 p-4 rounded-xl">
                      <User className="h-7 w-7 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Personal Information</h3>
                  </div>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2"
                    >
                      <Edit3 size={18} />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-3">
                      <Button
                        variant="success"
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2"
                      >
                        <Save size={18} />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={loading}
                        className="flex items-center gap-2"
                      >
                        <X size={18} />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input
                      name="name"
                      label="Full Name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="bg-white/60 border border-indigo-200 rounded-lg"
                    />
                    <Input
                      name="registrationNumber"
                      label="Registration Number"
                      value={profileData.registrationNumber}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="bg-white/60 border border-indigo-200 rounded-lg"
                    />
                    <Input
                      name="email"
                      type="email"
                      label="Email Address"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="bg-white/60 border border-indigo-200 rounded-lg"
                    />
                    <Input
                      name="phone"
                      type="tel"
                      label="Phone Number"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="bg-white/60 border border-indigo-200 rounded-lg"
                    />
                  </div>
                  {/* Reading Preferences */}
                  {isEditing && (
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-6">Reading Preferences</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Annual Reading Goal</label>
                          <input
                            name="readingGoal"
                            type="number"
                            min="1"
                            max="100"
                            value={profileData.readingGoal}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-3 border border-indigo-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/60"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Favorite Genres</label>
                          <select
                            multiple
                            className="w-full px-4 py-3 border border-indigo-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/60"
                          >
                            <option value="classic">Classic Literature</option>
                            <option value="sci-fi">Science Fiction</option>
                            <option value="mystery">Mystery</option>
                            <option value="romance">Romance</option>
                            <option value="non-fiction">Non-Fiction</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
                {/* Reading Statistics (moved from sidebar) */}
                <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-2xl p-8 rounded-2xl">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Reading Statistics</h3>
                  <div className="space-y-6">
                    {readingStats.map((stat, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{stat.title}</p>
                          <p className="text-xs text-slate-500">{stat.period}</p>
                        </div>
                        <span className="text-xl font-bold text-slate-900">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              {/* Password Change */}
              <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-2xl p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-amber-100 p-4 rounded-xl">
                      <Lock className="h-7 w-7 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Password & Security</h3>
                  </div>
                  {!isChangingPassword && (
                    <Button
                      variant="outline"
                      onClick={() => setIsChangingPassword(true)}
                    >
                      Change Password
                    </Button>
                  )}
                </div>
                {isChangingPassword ? (
                  <div className="space-y-8">
                    <Input
                      name="currentPassword"
                      type="password"
                      label="Current Password"
                      placeholder="Enter current password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="bg-white/60 border border-indigo-200 rounded-lg"
                    />
                    <Input
                      name="newPassword"
                      type="password"
                      label="New Password"
                      placeholder="Enter new password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="bg-white/60 border border-indigo-200 rounded-lg"
                    />
                    <Input
                      name="confirmPassword"
                      type="password"
                      label="Confirm New Password"
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className="bg-white/60 border border-indigo-200 rounded-lg"
                    />
                    <div className="flex gap-4">
                      <Button
                        variant="primary"
                        onClick={handleChangePassword}
                      >
                        Update Password
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsChangingPassword(false);
                          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                          setError('');
                        }}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-600">
                    Keep your account secure by using a strong password and changing it regularly.
                  </p>
                )}
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;