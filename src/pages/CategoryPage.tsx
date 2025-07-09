import React, { useMemo, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { RewardsPanel } from '../components/RewardsPanel';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';
import { Product } from '../types';

const categoryMapping: Record<string, Product['category']> = {
  '/flights': 'Flights',
  '/electronics': 'Electronics',
  '/hotels': 'Hotels',
  '/cars': 'Cars',
  '/furniture': 'Furniture',
  '/beverage': 'Beverage'
};

const getCategoryColors = (category: Product['category']) => {
  switch (category) {
    case 'Flights':
      return {
        gradient: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-700 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-700'
      };
    case 'Electronics':
      return {
        gradient: 'from-purple-500 to-purple-600',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        text: 'text-purple-700 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-700'
      };
    case 'Hotels':
      return {
        gradient: 'from-emerald-500 to-emerald-600',
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-700'
      };
    case 'Cars':
      return {
        gradient: 'from-red-500 to-red-600',
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-700 dark:text-red-400',
        border: 'border-red-200 dark:border-red-700'
      };
    case 'Furniture':
      return {
        gradient: 'from-amber-500 to-amber-600',
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-700'
      };
    case 'Beverage':
      return {
        gradient: 'from-pink-500 to-pink-600',
        bg: 'bg-pink-50 dark:bg-pink-900/20',
        text: 'text-pink-700 dark:text-pink-400',
        border: 'border-pink-200 dark:border-pink-700'
      };
    default:
      return {
        gradient: 'from-gray-500 to-gray-600',
        bg: 'bg-gray-50 dark:bg-gray-900/20',
        text: 'text-gray-700 dark:text-gray-400',
        border: 'border-gray-200 dark:border-gray-700'
      };
  }
};

export const CategoryPage: React.FC = () => {
  const location = useLocation();
  const { products } = useStore();
  const { isDarkMode } = useTheme();
  const [sortBy, setSortBy] = React.useState<'name' | 'price' | 'rating' | 'miles'>('name');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const [filterBy, setFilterBy] = React.useState<'all' | 'available' | 'limited'>('all');
  const [priceRange, setPriceRange] = React.useState<'all' | 'low' | 'mid' | 'high'>('all');

  const categoryName = categoryMapping[location.pathname];
  const categoryColors = getCategoryColors(categoryName);
  
  if (!categoryName) {
    return <Navigate to="/electronics" replace />;
  }
  
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => product.category === categoryName);

    // Apply status filter
    if (filterBy !== 'all') {
      if (filterBy === 'available') {
        filtered = filtered.filter(product => product.status === 'Available');
      } else if (filterBy === 'limited') {
        filtered = filtered.filter(product => product.status === 'Limited');
      }
    }

    // Apply price range filter
    if (priceRange !== 'all') {
      if (priceRange === 'low') {
        filtered = filtered.filter(product => product.amount < 100);
      } else if (priceRange === 'mid') {
        filtered = filtered.filter(product => product.amount >= 100 && product.amount < 1000);
      } else if (priceRange === 'high') {
        filtered = filtered.filter(product => product.amount >= 1000);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.amount - b.amount;
          break;
        case 'rating':
          comparison = a.rate - b.rate;
          break;
        case 'miles':
          comparison = a.miles - b.miles;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [products, categoryName, sortBy, sortOrder, filterBy, priceRange]);

  const categoryDisplayName = categoryName.toLowerCase();

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className={`p-6 rounded-xl border ${categoryColors.bg} ${categoryColors.border}`}>
                <h1 className={`text-3xl font-bold mb-2 ${categoryColors.text}`}>
                  {categoryName}
                </h1>
                <p className={`text-lg ${categoryColors.text} opacity-80`}>
                  Discover amazing {categoryDisplayName} and earn miles with every purchase
                </p>
                <div className={`mt-4 text-sm ${categoryColors.text} opacity-70`}>
                  {filteredProducts.length} products available
                </div>
              </div>
            </motion.div>

            {/* Filters and Sorting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-4 rounded-xl border mb-6 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className={`w-4 h-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Filters:
                  </span>
                </div>

                {/* Status Filter */}
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className={`px-3 py-1 rounded-lg border text-sm ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="limited">Limited</option>
                </select>

                {/* Price Range Filter */}
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value as any)}
                  className={`px-3 py-1 rounded-lg border text-sm ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under $100</option>
                  <option value="mid">$100 - $1,000</option>
                  <option value="high">Over $1,000</option>
                </select>

                {/* Sort Options */}
                <div className="flex items-center gap-2 ml-auto">
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className={`px-3 py-1 rounded-lg border text-sm ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                    <option value="miles">Miles</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className={`p-1 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'hover:bg-gray-700 text-gray-400'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center py-16 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p>Try browsing other categories or add some products!</p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <RewardsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};