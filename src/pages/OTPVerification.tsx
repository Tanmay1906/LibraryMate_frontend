import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { useAuth } from '../utils/AuthContext';

/**
 * OTP Verification Page Component
 * Handles 4-digit OTP input with auto-focus and validation
 * Default OTP is 0000 for demonstration purposes
 */
const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const { verifyOTP, pendingUser } = useAuth();
  const navigate = useNavigate();

  /**
   * Focus first input on component mount
   */
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  /**
   * Redirect if no pending user
   */
  useEffect(() => {
    if (!pendingUser) {
      navigate('/signup');
    }
  }, [pendingUser, navigate]);

  /**
   * Handle OTP input change
   */
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Handle key down events
   */
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /**
   * Handle paste event
   */
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').slice(0, 4);
      while (newOtp.length < 4) newOtp.push('');
      setOtp(newOtp);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 4) {
      setError('Please enter complete OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await verifyOTP(otpString);
      if (success) {
        const redirectPath = pendingUser?.role === 'owner' ? '/owner/dashboard' : '/student/dashboard';
        navigate(redirectPath);
      } else {
        setError('Invalid OTP. Try 0000 for demo.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <div className="bg-indigo-600 p-3 rounded-xl">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Verify Your Account</h2>
          <p className="text-slate-600">
            Enter the 4-digit code sent to {pendingUser?.email}
          </p>
        </div>

        {/* OTP Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* OTP Input Fields */}
            <div className="flex justify-center space-x-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-colors duration-200"
                />
              ))}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Verify Account
            </Button>

            {/* Demo Notice */}
            <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg">
              <p className="text-sm">
                <strong>Demo:</strong> Use OTP <strong>0000</strong> to continue
              </p>
            </div>
          </form>

          {/* Back to Signup Link */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/signup')}
              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Sign Up
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OTPVerification;