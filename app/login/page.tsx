'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // TODO: Implement Supabase authentication
    try {
      // Placeholder for authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      // Redirect to dashboard after successful login
      window.location.href = '/dashboard';
    } catch (error) {
      setError('Login gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError('');
    
    // Demo login with demo credentials
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      window.location.href = '/dashboard';
    } catch (error) {
      setError('Demo login gagal.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen stable-gradient">
        <Navigation />
        
        <main className="flex items-center justify-center pt-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm"
          >
            <div className="stable-card p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-stable-navy-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-stable-navy-800 mb-2">
                  Masuk ke Stable Index
                </h1>
                <p className="text-gray-600">
                  Akses dashboard analisis risiko global
                </p>
              </div>

              {/* Demo Login */}
              <div className="mb-6">
                <button
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className="w-full stable-button-secondary py-3 flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-stable-navy-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                      Demo Login (tanpa akun)
                    </>
                  )}
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">atau masuk dengan email</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stable-navy-500 focus:border-transparent"
                    placeholder="nama@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Kata Sandi
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stable-navy-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full stable-button-primary py-3 flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Masuk'
                  )}
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  Belum punya akun?{' '}
                  <a href="#" className="text-stable-navy-600 hover:text-stable-navy-800 font-medium">
                    Daftar gratis
                  </a>
                </p>
                <p className="mt-2">
                  <a href="#" className="text-stable-navy-600 hover:text-stable-navy-800">
                    Lupa kata sandi?
                  </a>
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-8"
            >
              <p className="text-gray-600 text-sm">
                Dengan masuk, Anda menyetujui{' '}
                <a href="#" className="text-stable-navy-600 hover:text-stable-navy-800">
                  Syarat & Ketentuan
                </a>{' '}
                dan{' '}
                <a href="#" className="text-stable-navy-600 hover:text-stable-navy-800">
                  Kebijakan Privasi
                </a>
              </p>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </ErrorBoundary>
  );
}