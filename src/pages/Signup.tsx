import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, BookOpen, Building, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

import { useAuth } from '../utils/AuthContext';

/**
 * Premium Signup Page Component
 * Professional registration interface for Library Management System
 */
const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'owner' | 'student',
    libraryName: '',
    libraryDescription: '',
    registrationNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.role === 'owner' && !formData.libraryName) {
      setError('Library name is required for library owners');
      return false;
    }
    if (formData.role === 'student' && !formData.registrationNumber) {
      setError('Registration number is required for students');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const success = await signup(formData);
      if (success) {
        navigate('/otp-verification');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-blue-500/10"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute bottom-1/3 left-1/5 w-80 h-80 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse delay-1500"></div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Benefits & Features */}
        <div className="hidden lg:flex lg:w-2/5 flex-col justify-center px-12 xl:px-16">
          <div className="max-w-lg">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="relative">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl shadow-lg">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-green-400 rounded-full p-1">
                  <Sparkles className="h-4 w-4 text-green-800" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Library mate
                </h1>
                <p className="text-slate-500 text-sm">Join the Revolution</p>
              </div>
            </div>

            {/* Hero Content */}
            <div className="space-y-6">
              <h2 className="text-4xl xl:text-5xl font-bold text-slate-800 leading-tight">
                Start Your
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent block">
                  Digital Library
                </span>
                Journey
              </h2>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                Join thousands of institutions and students already transforming their library experience with Library mate.
              </p>

              {/* Benefits List */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg mt-0.5">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">For Library Owners</h4>
                    <p className="text-slate-600 text-sm">Complete management dashboard, analytics, and automation tools</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg mt-0.5">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">For Students</h4>
                    <p className="text-slate-600 text-sm">Easy book search, reservations, and digital library access</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg mt-0.5">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Free to Start</h4>
                    <p className="text-slate-600 text-sm">Begin with our generous free tier, upgrade as you grow</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">500+</div>
                  <div className="text-sm text-slate-600">Active Libraries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">50k+</div>
                  <div className="text-sm text-slate-600">Happy Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-3/5 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg w-full space-y-6">
            
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex justify-center items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Library mate</h1>
            </div>

            {/* Signup Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Your Account</h2>
              <p className="text-slate-600">Start managing your library like a pro</p>
            </div>

            {/* Signup Card */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50/80 backdrop-blur border border-red-200/50 text-red-700 px-4 py-3 rounded-2xl text-sm">
                    {error}
                  </div>
                )}

                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">I am a...</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                      className={`group p-4 border-2 rounded-2xl text-center transition-all duration-200 ${
                        formData.role === 'student'
                          ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-lg'
                          : 'border-slate-200/50 hover:border-slate-300 bg-white/40'
                      }`}
                    >
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center transition-all ${
                        formData.role === 'student' 
                          ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white' 
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}>
                        <User className="h-6 w-6" />
                      </div>
                      <div className={`text-sm font-medium transition-colors ${
                        formData.role === 'student' ? 'text-indigo-700' : 'text-slate-700'
                      }`}>Student</div>
                      <div className="text-xs text-slate-500 mt-1">Access books & resources</div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: 'owner' }))}
                      className={`group p-4 border-2 rounded-2xl text-center transition-all duration-200 ${
                        formData.role === 'owner'
                          ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                          : 'border-slate-200/50 hover:border-slate-300 bg-white/40'
                      }`}
                    >
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center transition-all ${
                        formData.role === 'owner' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}>
                        <Building className="h-6 w-6" />
                      </div>
                      <div className={`text-sm font-medium transition-colors ${
                        formData.role === 'owner' ? 'text-purple-700' : 'text-slate-700'
                      }`}>Library Owner</div>
                      <div className="text-xs text-slate-500 mt-1">Manage your library</div>
                    </button>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 text-slate-900 placeholder-slate-400"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 text-slate-900 placeholder-slate-400"
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 text-slate-900 placeholder-slate-400"
                      placeholder="your.email@domain.com"
                      required
                    />
                  </div>
                </div>

                {/* Conditional Fields */}
                {formData.role === 'owner' && (
                  <div className="space-y-4 p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-2xl border border-purple-200/30">
                    <h4 className="text-sm font-semibold text-purple-700 flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>Library Details</span>
                    </h4>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">Library Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          name="libraryName"
                          type="text"
                          value={formData.libraryName}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 bg-white/60 border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 text-slate-900 placeholder-slate-400"
                          placeholder="Your library name"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">Library Description</label>
                      <textarea
                        name="libraryDescription"
                        rows={3}
                        value={formData.libraryDescription}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/60 border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 text-slate-900 placeholder-slate-400 resize-none"
                        placeholder="Tell us about your library..."
                      />
                    </div>
                  </div>
                )}

                {formData.role === 'student' && (
                  <div className="space-y-2 p-4 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 rounded-2xl border border-indigo-200/30">
                    <h4 className="text-sm font-semibold text-indigo-700 flex items-center space-x-2 mb-3">
                      <BookOpen className="h-4 w-4" />
                      <span>Student Information</span>
                    </h4>
                    <label className="block text-sm font-medium text-slate-700">Registration Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <BookOpen className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        name="registrationNumber"
                        type="text"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/60 border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 text-slate-900 placeholder-slate-400"
                        placeholder="Your registration number"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 text-slate-900 placeholder-slate-400"
                        placeholder="Create password"
                        required
                      />
                    </div>
                    <p className="text-xs text-slate-500">At least 6 characters</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 text-slate-900 placeholder-slate-400"
                        placeholder="Confirm password"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create My Account</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Sign In Link */}
              <div className="text-center mt-6 pt-6 border-t border-slate-200/30">
                <p className="text-sm text-slate-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="text-center text-xs text-slate-500 space-y-2">
              <p>🔒 Your data is secure and encrypted</p>
              <p className="flex justify-center space-x-4">
                <span>✨ Free to start</span>
                <span>⚡ Instant setup</span>
                <span>📱 Mobile ready</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;