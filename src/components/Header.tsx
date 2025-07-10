import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingBag,
  Shield,
  UserPlus,
  Moon, 
  Sun, 
  Menu, 
  X,
  Plane,
  Smartphone,
  Hotel,
  Car,
  Sofa,
  Coffee,
  User,
  MessageCircle
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';
import { LanguageSelector } from './LanguageSelector';
import { RegisterModal } from './RegisterModal';

const categories = [
  { name: 'Travel', path: '/travel', icon: Plane },
  { name: 'Electronics', path: '/electronics', icon: Smartphone },
  { name: 'Cars', path: '/cars', icon: Car },
  { name: 'House & Furniture', path: '/house-furniture', icon: Sofa },
  { name: 'Beverage', path: '/beverage', icon: Coffee },
];

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { isAdminAuthenticated } = useStore();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);


  return (
    <>
      <header className={`sticky top-0 z-40 border-b transition-colors ${
        isDarkMode
          ? 'bg-gray-900/95 backdrop-blur-sm border-gray-700'
          : 'bg-white/95 backdrop-blur-sm border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"
              >
                <ShoppingBag className="w-6 h-6 text-white" />
              </motion.div>
              <span className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {t('header.brand')}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = location.pathname === category.path;
                return (
                  <Link
                    key={category.name}
                    to={category.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{t(`header.categories.${category.name.toLowerCase()}`)}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">

              {/* Language Selector */}
              <LanguageSelector />

              {/* Register Button */}
              <button
                onClick={() => setShowRegisterModal(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:block">{t('header.register')}</span>
              </button>

              {/* Admin Login Button */}
              <Link
                to="/admin"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isAdminAuthenticated
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : isDarkMode
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {isAdminAuthenticated ? t('header.admin') : t('header.login')}
                </span>
              </Link>

              {/* Dashboard Button */}
              <Link
                to="/dashboard"
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Contact Button */}
              <Link
                to="/contact"
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`md:hidden border-t py-4 ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className="grid grid-cols-2 gap-2 mb-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = location.pathname === category.path;
                  return (
                    <Link
                      key={category.name}
                      to={category.path}
                      onClick={() => setShowMobileMenu(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                        isActive
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                          : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{t(`header.categories.${category.name.toLowerCase()}`)}</span>
                    </Link>
                  );
                })}
              </div>
              <Link
                to="/dashboard"
                onClick={() => setShowMobileMenu(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User className="w-4 h-4" />
                {t('header.dashboard')}
              </Link>
            </motion.div>
          )}
        </div>
      </header>
      
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={() => {
          // Handle successful registration
          console.log('Registration successful!');
        }}
      />
    </>
  );
};