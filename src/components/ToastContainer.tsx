import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
          info: <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />,
          error: <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
        };

        const borders = {
          success: 'border-emerald-100 bg-white',
          info: 'border-blue-100 bg-white',
          warning: 'border-amber-100 bg-white',
          error: 'border-rose-100 bg-white'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border ${borders[toast.type]} transform transition-all duration-300 animate-slide-up`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm">{toast.title}</h4>
              {toast.description && (
                <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
