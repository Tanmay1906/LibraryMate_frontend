import { mockStudents } from '../../utils/mockData';
import React, { useState } from 'react';
import { Building, Mail, Phone, MapPin, Users, BookOpen, Edit3, Save, X } from 'lucide-react';
import Navbar from '../../components/Layout/Navbar';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
/** Library data type */
interface LibraryData {
  name?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  totalStudents?: number;
  activeSubscriptions?: number;
  monthlyRevenue?: number;
}

 /**
  * Library Info Page Component
  * Modern, clean, and sell-ready UI
  */
const LibraryInfo: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [library, setLibrary] = useState<any>(null);
  React.useEffect(() => {
    // If user is logged in and has owner role, use their info for library
    if (user && user.role === 'owner') {
      setLibrary({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.libraryId ? `Library ID: ${user.libraryId}` : '',
        description: '',
        totalStudents: 0,
        activeSubscriptions: 0,
        monthlyRevenue: 0
      });
    } else {
      // fallback to API fetch if not logged in as owner
      fetch('http://localhost:4000/api/libraries')
        .then(res => res.json())
        .then(data => setLibrary(data[0] || null))
        .catch(() => setLibrary(null));
    }
  }, [user]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(library);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData((prev: LibraryData | null) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLibrary(editData);
      setIsEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData(library);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-emerald-50 relative">
      <Navbar />

      {/* Glassmorphism Accent */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl absolute top-0 left-0" />
        <div className="w-72 h-72 bg-emerald-200/30 rounded-full blur-2xl absolute bottom-0 right-0" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight drop-shadow-lg">Library Information</h1>
            <p className="text-lg text-slate-600 mt-3">
              Manage your library's <span className="font-semibold text-indigo-600">basic information and settings.</span>
            </p>
          </div>
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)} className="flex items-center gap-2 shadow">
              <Edit3 size={20} />
              Edit Info
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button variant="success" onClick={handleSave} className="flex items-center gap-2 shadow">
                <Save size={20} />
                Save
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={loading} className="flex items-center gap-2 shadow">
                <X size={20} />
                Cancel
              </Button>
            </div>
          )}
        </div>

        {success && (
          <div className="mb-8 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl shadow">
            ✅ Library information updated successfully!
          </div>
        )}

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-indigo-100 p-4 rounded-xl shadow">
                  <Building className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  {isEditing ? (
                    <Input name="name" label="Library Name" value={editData?.name || ''} onChange={handleChange} />
                  ) : (
                    <InfoBlock label="Library Name" value={library?.name || ''} />
                  )}
                </div>

                <div className="md:col-span-2">
                  {isEditing ? (
                    <TextArea name="description" value={editData?.description || ''} onChange={handleChange} />
                  ) : (
                    <InfoBlock label="Description" value={library?.description || ''} />
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <Input name="email" type="email" label="Email" value={editData?.email || ''} onChange={handleChange} />
                  ) : (
                    <InfoBlock label="Email" value={library?.email || ''} />
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <Input name="phone" type="tel" label="Phone" value={editData?.phone || ''} onChange={handleChange} />
                  ) : (
                    <InfoBlock label="Phone" value={library?.phone || ''} />
                  )}
                </div>

                <div className="md:col-span-2">
                  {isEditing ? (
                    <Input name="address" label="Address" value={editData?.address || ''} onChange={handleChange} />
                  ) : (
                    <InfoBlock label="Address" value={library?.address || ''} />
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start shadow" onClick={() => navigate('/owner/students')}>📚 View Students</Button>
                <Button variant="outline" className="w-full justify-start shadow" onClick={() => navigate('/owner/add-student')}>➕ Add Student</Button>
                <Button variant="outline" className="w-full justify-start shadow" onClick={() => navigate('/owner/notifications')}>🔔 Send Notifications</Button>
              </div>
            </Card>
          </div>

          {/* Statistics */}
          <div className="lg:col-span-3">
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Library Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<Users className="h-6 w-6 text-blue-600" />} label="Total Students" value={library?.totalStudents ?? 0} color="blue" />
                <StatCard icon={<BookOpen className="h-6 w-6 text-emerald-600" />} label="Active Subscriptions" value={library?.activeSubscriptions ?? 0} color="emerald" />
                <StatCard icon={<span className="text-lg font-bold">$</span>} label="Monthly Revenue" value={`$${library?.monthlyRevenue ? library.monthlyRevenue.toLocaleString() : '0'}`} color="amber" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Reusable Info Display */
const InfoBlock = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
    <p className="text-base text-slate-900">{value}</p>
  </div>
);

/** Custom TextArea */
const TextArea = ({ name, value, onChange }: any) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
    <textarea
      name={name}
      rows={4}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-white/80 shadow"
    />
  </div>
);

/** Stat Card Component */
const StatCard = ({ icon, label, value, color }: any) => {
  const colorClasses: any = {
    blue: 'bg-blue-50 text-blue-900 border-blue-200',
    emerald: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    amber: 'bg-amber-50 text-amber-900 border-amber-200',
  };
  return (
    <div className={`flex items-center justify-between p-5 rounded-xl border shadow ${colorClasses[color]}`}>
      <div className="flex items-center space-x-4">
        {icon}
        <span className="text-base font-semibold">{label}</span>
      </div>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
};

export default LibraryInfo;
