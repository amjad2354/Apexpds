import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User as UserIcon, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<'buyer' | 'seller' | 'agent'>('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = fullName.trim() || (isRegister ? 'New Member' : email.split('@')[0] || 'Luxury Client');
    login({
      name,
      email: email || 'member@apexpds.com',
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    });
  };

  const handleDemoLogin = (demoRole: 'buyer' | 'seller' | 'agent') => {
    const demos = {
      buyer: {
        name: 'Alexander Wright',
        email: 'alex.wright@privateclient.com',
        role: 'buyer' as const,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
      },
      seller: {
        name: 'Victoria Sterling',
        email: 'victoria@sterlingholdings.com',
        role: 'seller' as const,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
      },
      agent: {
        name: 'Sophia Montgomery (Agent)',
        email: 'sophia@apexpds.com',
        role: 'agent' as const,
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
      }
    };
    login(demos[demoRole]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 relative">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-blue-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {isRegister ? 'Create Your Account' : 'Welcome to Apex PDS'}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              {isRegister
                ? 'Join our network to save properties, receive private off-market listings, and manage inquiries.'
                : 'Sign in to access your saved homes, private portfolio, and scheduled tours.'}
            </p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl mb-6 text-sm font-medium">
            {(['buyer', 'seller', 'agent'] as const).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-2 rounded-lg capitalize transition ${
                  role === r ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition mt-2"
            >
              {isRegister ? 'Register Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-center text-gray-500 mb-3 font-medium">Or quick demo sign in as:</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('buyer')}
                className="flex-1 text-xs py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-semibold transition"
              >
                Demo Buyer
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('seller')}
                className="flex-1 text-xs py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg font-semibold transition"
              >
                Demo Seller
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('agent')}
                className="flex-1 text-xs py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-semibold transition"
              >
                Demo Agent
              </button>
            </div>
          </div>

          <div className="text-center mt-5 text-sm text-gray-600">
            {isRegister ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Create One
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
