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
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Menu, X } from 'lucide-react';

interface NavigationProps {
  userName?: string;
  userCountry?: string;
  onLogout?: () => void;
}

export const Navigation = ({ userName, userCountry, onLogout }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { label: 'Countries', path: '/countries', active: pathname === '/countries' },
    { label: 'Data', path: '/data', active: pathname === '/data' },
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
          {/* Logo & Brand & Social */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200">
              <motion.div 
                className="w-10 h-10 rounded-md flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src="/logo.jpeg" 
                  alt="Stable Index Logo" 
                  className="w-6 h-6 object-contain"
                />
              </motion.div>
              <div>
                <span className="text-text-primary font-bold text-lg tracking-tight">STABLE INDEX</span>
                <p className="text-text-muted text-xs">Risk Intelligence Platform</p>
              </div>
            </Link>

            {/* X Icon - Desktop */}
            <a 
              href="https://x.com/stableindexai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:block p-2 text-text-secondary hover:text-accent-navy transition-colors duration-200"
              aria-label="Follow us on X (Twitter)"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          {/* Navigation Links - Desktop */}
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

          {/* Mobile Menu Button & User Info */}
          <div className="flex items-center gap-4">
            {/* X Icon - Mobile */}
            <a 
              href="https://x.com/stableindexai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="md:hidden p-2 text-text-secondary hover:text-accent-navy transition-colors duration-200"
              aria-label="Follow us on X (Twitter)"
            >
              <Twitter className="w-5 h-5" />
            </a>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-accent-navy transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* User Info & Logout - Desktop */}
            {userName && (
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-text-primary">{userName}</p>
                <p className="text-xs text-text-muted">{userCountry || 'Analyst'}</p>
              </div>
            )}
            
            {onLogout && (
              <button
                onClick={onLogout}
                className="hidden md:block px-4 py-2 text-sm font-medium text-text-secondary hover:text-accent-navy 
                         border border-surface-border hover:border-accent-navy rounded-md 
                         transition-all duration-200"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-surface-border bg-surface-primary/95 backdrop-blur-md"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Navigation Links */}
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path} onClick={() => setMobileMenuOpen(false)}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={`block px-4 py-3 rounded-md transition-all duration-200 font-medium text-sm tracking-wide ${
                        item.active 
                          ? 'text-accent-navy bg-accent-navy/10 border border-accent-navy/20' 
                          : 'text-text-secondary hover:text-accent-navy hover:bg-accent-navy/5'
                      }`}
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                ))}

                {/* Mobile User Info & Logout */}
                {userName && (
                  <div className="px-4 py-2 border-t border-surface-border">
                    <p className="text-sm font-medium text-text-primary">{userName}</p>
                    <p className="text-xs text-text-muted">{userCountry || 'Analyst'}</p>
                  </div>
                )}
                
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="w-full mt-4 px-4 py-3 text-sm font-medium text-text-secondary hover:text-accent-navy 
                             border border-surface-border hover:border-accent-navy rounded-md 
                             transition-all duration-200"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};