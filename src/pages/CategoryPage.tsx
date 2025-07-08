import React, { useMemo } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

export const CategoryPage: React.FC = () => {
  const location = useLocation();
  const { products } = useStore();
  const { isDarkMode } = useTheme();

  const categoryName = categoryMapping[location.pathname];
  
  if (!categoryName) {
    return <Navigate to="/electronics" replace />;
  }
  
  const filteredProducts = useMemo(() => {
    return products.filter(product => product.category === categoryName);
  }, [products, categoryName]);

  const categoryDisplayName = categoryName.toLowerCase();

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className={`text-3xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {categoryName}
              </h1>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Discover amazing {categoryDisplayName} and earn miles with every purchase
              </p>
              <div className={`mt-4 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {filteredProducts.length} products available
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