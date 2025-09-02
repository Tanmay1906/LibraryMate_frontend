import React from 'react';
import Card from '../components/UI/Card';

const NotFound: React.FC = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-teal-500">
        <Card className="w-full max-w-md mx-auto text-center bg-white/90">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4">404</h1>
          <p className="text-xl text-blue-900 mb-6">Page Not Found</p>
          <a href="/" className="text-yellow-400 hover:text-yellow-500 font-semibold underline">Go Home</a>
        </Card>
      </div>
    );
};

export default NotFound;
