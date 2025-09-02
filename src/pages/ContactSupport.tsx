import React from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const ContactSupport: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-50 to-emerald-50">
      <Card className="max-w-lg w-full p-8 bg-white/80 backdrop-blur-lg border border-slate-100 shadow-2xl rounded-2xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Contact Support</h1>
        <p className="text-slate-700 mb-6">If you have any questions, issues, or need help, please fill out the form below and our support team will get back to you as soon as possible.</p>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Your Email</label>
            <input type="email" className="w-full px-4 py-3 border border-indigo-200 rounded-lg bg-white/60 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
            <textarea className="w-full px-4 py-3 border border-indigo-200 rounded-lg bg-white/60 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" rows={5} required />
          </div>
          <Button type="submit" variant="primary" className="w-full">Send Message</Button>
        </form>
      </Card>
    </div>
  );
};

export default ContactSupport;
