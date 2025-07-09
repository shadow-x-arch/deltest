import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingBag,
  ShoppingCart as CartIcon,
  Award, 
  Plus, 
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
  User
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';
import { ProductForm } from './ProductForm';

const categories = [
  { name: 'Flights', path: '/flights', icon: Plane },
  { name: 'Electronics', path: '/electronics', icon: Smartphone },
  { name: 'Hotels', path: '/hotels', icon: Hotel },
  { name: 'Cars', path: '/cars', icon: Car },
  { name: 'Furniture', path: '/furniture', icon: Sofa },
  { name: 'Beverage', path: '/beverage', icon: Coffee },
];

export const Header: React.FC = () => {
  const { user, activeDiscount, getCartTotal } = useStore();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { totalItems } = getCartTotal();

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
                MilesShop
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
                    <span className="text-sm font-medium">{category.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Miles Display */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${
                isDarkMode
                  ? 'bg-gray-800 text-amber-400'
                  : 'bg-amber-50 text-amber-700'
              }`}>
                <Award className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {user.miles.toLocaleString()} miles
                </span>
              </motion.div>

              {/* Active Discount */}
              {activeDiscount > 0 && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-lg"
                >
                  <span className="text-sm font-semibold">
                    {activeDiscount}% OFF
                  </span>
                </motion.div>
              )}

              {/* Add Product Button */}
              <button
                onClick={() => setShowForm(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>

              {/* Cart Button */}
              <Link
                to="/cart"
                className={`relative p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <CartIcon className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Account Button */}
              <Link
                to="/account"
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <User className="w-5 h-5" />
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
                      <span className="text-sm font-medium">{category.name}</span>
                    </Link>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  setShowForm(true);
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </motion.div>
          )}
        </div>
      </header>

      <ProductForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </>
  );
};