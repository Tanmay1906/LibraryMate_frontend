
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', icon, ...props }) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label className="text-sm font-medium text-blue-900 mb-1">{label}</label>}
        <input
          className={`bg-white/80 border border-slate-300 rounded-xl px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all duration-200 ${className}`}
          {...props}
        />
      </div>
    );
};

export default Input;