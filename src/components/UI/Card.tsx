import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;

}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
  subtitle,
  actions,
}) => {
  return (
    <div
      className={`bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-2xl shadow-xl border border-slate-200 p-6 transition-all hover:shadow-2xl ${className}`}
      style={{ minWidth: 280 }}
    >
      {(title || subtitle || actions) && (
        <div className="mb-4 flex items-center justify-between">
          <div>
            {title && (
              <h3 className="text-xl font-semibold text-indigo-700 mb-1">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-slate-500">{subtitle}</p>
            )}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className="text-slate-700">{children}</div>
    </div>
  );
};

export default Card;
