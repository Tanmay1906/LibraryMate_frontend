import { mockStudents } from '../../utils/mockData';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Building, Lock, Save, Edit3, X } from 'lucide-react';
import Navbar from '../../components/Layout/Navbar';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useAuth } from '../../utils/AuthContext';
/**
 * Library Owner Profile Page Component
 * Allows library owners to view and edit their profile information
 * Includes password change functionality and account settings
 */
const LibraryOwnerProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    libraryName: '',
    libraryAddress: ''
  });
  React.useEffect(() => {
    // Fetch owner profile and library info from backend
    fetch('http://localhost:4000/api/admin/profile')
      .then(res => res.json())
      .then(data => setProfileData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        libraryName: data.library?.name || '',
        libraryAddress: data.library?.address || ''
      }))
      .catch(() => {});
  }, [user?.id]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  /**
   * Handle profile input changes
   */
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      libraryName: 'Central City Library',
      libraryAddress: '123 Main Street, Central City, CC 12345'
    });
    setIsEditing(false);
    setError('');
  };

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
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight drop-shadow-lg">Profile Settings</h1>
          <p className="text-lg text-slate-600 mt-3">Manage your account information and preferences.</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg max-w-xl mx-auto">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-xl mx-auto">
            {error}
          </div>
        )}

        {/* Main Layout: Sidebar (Account Overview & Quick Actions) + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar: Account Overview & Quick Actions */}
          <div className="lg:col-span-1 space-y-10">
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Account Overview</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Account Type</label>
                  <p className="text-slate-900">Library Owner</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Member Since</label>
                  <p className="text-slate-900">January 2024</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Last Login</label>
                  <p className="text-slate-900">Today at 2:30 PM</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Status</label>
                  <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Active</span>
                </div>
              </div>
            </Card>
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 rounded-xl shadow flex items-center gap-3 text-indigo-900 font-semibold"
                  onClick={() => navigate('/owner/dashboard')}
                >
                  View Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-emerald-100 to-emerald-50 hover:from-emerald-200 hover:to-emerald-100 rounded-xl shadow flex items-center gap-3 text-emerald-900 font-semibold"
                  onClick={() => navigate('/owner/students')}
                >
                  Manage Students
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 rounded-xl shadow flex items-center gap-3 text-amber-900 font-semibold"
                  onClick={() => navigate('/owner/library-info')}
                >
                  Library Settings
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content: Profile Information & Password Change */}
          <div className="lg:col-span-3 space-y-12">
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 p-4 rounded-xl">
                    <User className="h-7 w-7 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Personal Information</h3>
                </div>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                    <Edit3 size={18} /> Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="success" onClick={handleSaveProfile} loading={loading} className="flex items-center gap-2">
                      <Save size={18} /> Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel} disabled={loading} className="flex items-center gap-2">
                      <X size={18} /> Cancel
                    </Button>
                  </div>
                )}
              </div>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input name="name" label="Full Name" value={profileData.name} onChange={handleProfileChange} leftIcon={<User size={20} />} disabled={!isEditing} />
                  <Input name="email" type="email" label="Email Address" value={profileData.email} onChange={handleProfileChange} leftIcon={<Mail size={20} />} disabled={!isEditing} />
                  <Input name="phone" type="tel" label="Phone Number" value={profileData.phone} onChange={handleProfileChange} leftIcon={<Phone size={20} />} disabled={!isEditing} />
                  <Input name="libraryName" label="Library Name" value={profileData.libraryName} onChange={handleProfileChange} leftIcon={<Building size={20} />} disabled={!isEditing} />
                </div>
                <Input name="libraryAddress" label="Library Address" value={profileData.libraryAddress} onChange={handleProfileChange} leftIcon={<Building size={20} />} disabled={!isEditing} />
              </div>
            </Card>
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-amber-100 p-4 rounded-xl">
                    <Lock className="h-7 w-7 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Password & Security</h3>
                </div>
                {!isChangingPassword && (
                  <Button variant="outline" onClick={() => setIsChangingPassword(true)} className="flex items-center gap-2">Change Password</Button>
                )}
              </div>
              {isChangingPassword ? (
                <div className="space-y-8">
                  <Input name="currentPassword" type="password" label="Current Password" placeholder="Enter current password" value={passwordData.currentPassword} onChange={handlePasswordChange} leftIcon={<Lock size={20} />} required />
                  <Input name="newPassword" type="password" label="New Password" placeholder="Enter new password" value={passwordData.newPassword} onChange={handlePasswordChange} leftIcon={<Lock size={20} />} helperText="At least 6 characters" required />
                  <Input name="confirmPassword" type="password" label="Confirm New Password" placeholder="Confirm new password" value={passwordData.confirmPassword} onChange={handlePasswordChange} leftIcon={<Lock size={20} />} required />
                  <div className="flex gap-4">
                    <Button variant="primary" onClick={handleChangePassword} loading={loading} className="flex items-center gap-2">Update Password</Button>
                    <Button variant="outline" onClick={() => { setIsChangingPassword(false); setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); setError(''); }} disabled={loading} className="flex items-center gap-2">Cancel</Button>
                  </div>
                </div>
              ) : (
                <p className="text-slate-600">Keep your account secure by using a strong password and changing it regularly.</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryOwnerProfile;