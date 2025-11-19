'use client';

// =====================================================
// Simplified Navigation - Clean & Professional
// =====================================================
// Simple menu: Home | Dashboard | Analytics | About
// No complex sub-menus - direct navigation
// =====================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface NavigationProps {
  userName?: string;
  userCountry?: string;
  onLogout?: () => void;
}

export const Navigation = ({ userName, userCountry, onLogout }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/', active: pathname === '/' },
    { label: 'Dashboard', path: '/dashboard', active: pathname === '/dashboard' },
    { label: 'About', path: '/about', active: pathname === '/about' }
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-surface-primary/95 backdrop-blur-md shadow-md border-b border-surface-border' 
          : 'bg-surface-primary'
        }
      `}
    >
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200">
            <motion.div 
              className="w-10 h-10 bg-accent-navy rounded-md flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </motion.div>
            <div>
              <span className="text-text-primary font-bold text-lg tracking-tight">STABLE INDEX</span>
              <p className="text-text-muted text-xs">Risk Intelligence Platform</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 rounded-md transition-all duration-200 font-medium text-sm tracking-wide ${
                    item.active 
                      ? 'text-accent-navy bg-accent-navy/10 border border-accent-navy/20' 
                      : 'text-text-secondary hover:text-accent-navy hover:bg-accent-navy/5'
                  }`}
                >
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            {userName && (
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-text-primary">{userName}</p>
                <p className="text-xs text-text-muted">{userCountry || 'Analyst'}</p>
              </div>
            )}
            
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-accent-navy 
                         border border-surface-border hover:border-accent-navy rounded-md 
                         transition-all duration-200"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};