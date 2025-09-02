import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  BookOpen,
  Users,
  Plus,
  Bell,
  Settings,
  LogOut,
  Home,
  CreditCard,
} from 'lucide-react';
import { useAuth } from '../../utils/AuthContext';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getNavItems = (): NavItem[] => {
    if (user?.role === 'owner') {
      return [
        { name: 'Dashboard', path: '/owner/dashboard', icon: <Home size={18} /> },
        { name: 'Add Student', path: '/owner/add-student', icon: <Plus size={18} /> },
        { name: 'Students List', path: '/owner/students', icon: <Users size={18} /> },
        { name: 'Library Info', path: '/owner/library-info', icon: <BookOpen size={18} /> },
        { name: 'Notifications', path: '/owner/notifications', icon: <Bell size={18} /> },
        { name: 'Profile', path: '/owner/profile', icon: <Settings size={18} /> },
      ];
    } else {
      return [
        { name: 'Dashboard', path: '/student/dashboard', icon: <Home size={18} /> },
        { name: 'My Library', path: '/student/my-library', icon: <BookOpen size={18} /> },
        { name: 'Books', path: '/student/books', icon: <BookOpen size={18} /> },
        { name: 'Payment History', path: '/student/payment-history', icon: <CreditCard size={18} /> },
        { name: 'Profile', path: '/student/profile', icon: <Settings size={18} /> },
      ];
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = getNavItems();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-teal-600 shadow-xl">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar Container */}
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <BookOpen className="h-10 w-10 text-yellow-400 drop-shadow-md" />
            <span className="text-2xl font-extrabold text-white tracking-wide">
              Library mate
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-yellow-400 text-blue-900 shadow-md'
                    : 'text-white/90 hover:text-yellow-300 hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* User Info + Logout */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-sm text-white/90">
              <span className="font-bold text-white">{user?.name}</span>
              <span className="ml-2 px-2 py-1 bg-yellow-400 text-blue-900 rounded-full text-xs font-semibold shadow">
                {user?.role === 'owner' ? 'Library Owner' : 'Student'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/90 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-all shadow-md"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl text-white hover:bg-white/20 focus:ring-2 focus:ring-yellow-400"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="px-2 pt-3 pb-4 space-y-2 bg-white/95 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
                    location.pathname === item.path
                      ? 'bg-yellow-400 text-blue-900 shadow-md'
                      : 'text-blue-900 hover:bg-yellow-100 hover:text-yellow-600'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              {/* Mobile User Info + Logout */}
              <div className="pt-3 border-t border-slate-300 flex flex-col gap-2 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-900">{user?.name}</span>
                  <span className="ml-1 px-2 py-1 bg-yellow-400 text-blue-900 rounded-full text-xs font-semibold shadow">
                    {user?.role === 'owner' ? 'Library Owner' : 'Student'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 rounded-lg transition shadow-sm"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
