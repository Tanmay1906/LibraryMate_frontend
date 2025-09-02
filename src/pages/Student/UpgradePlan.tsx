import { mockStudents } from '../../utils/mockData';
import React from 'react';
import Card from '../../components/UI/Card';
import Navbar from '../../components/Layout/Navbar';
const UpgradePlan: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = React.useState('monthly');
  const [success, setSuccess] = React.useState('');
  const [error] = React.useState('');
  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: 29.99,
      features: ['Access to all digital books', 'Mobile app access', 'Email support', 'Reading progress sync']
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      price: 299.99,
      features: ['All monthly features', '2 months free', 'Priority support']
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 499.99,
      features: ['All yearly features', 'Exclusive book releases', 'Personalized recommendations']
    }
  ];
  const handleUpgrade = () => {
    setSuccess('Plan upgraded successfully! Redirecting to payment update...');
    setTimeout(() => {
      window.location.href = '/student/update-payment';
    }, 1500);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-emerald-50">
      <Navbar />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <Card className="p-8 bg-white/80 backdrop-blur-lg border border-slate-100 shadow-2xl rounded-2xl">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Upgrade Plan</h1>
          <p className="text-slate-700 mb-6">Choose a new subscription plan to upgrade your library access.</p>
          {success && <div className="mb-4 p-3 bg-emerald-100 text-emerald-800 rounded-lg">{success}</div>}
          {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map(plan => (
              <div key={plan.id} className={`border rounded-xl p-6 shadow-lg bg-white/90 ${selectedPlan === plan.id ? 'border-indigo-500 ring-2 ring-indigo-300' : 'border-slate-200'}`}>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h2>
                <p className="text-2xl font-extrabold text-indigo-600 mb-2">${plan.price.toFixed(2)}</p>
                <ul className="mb-4 text-slate-700 list-disc pl-5">
                  {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold ${selectedPlan === plan.id ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-900'}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>
          <button
            className="w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl shadow hover:bg-emerald-700 transition"
            onClick={handleUpgrade}
          >
            Upgrade & Continue
          </button>
        </Card>
      </div>
    </div>
  );
};

export default UpgradePlan;
