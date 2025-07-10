import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Award, Package, Plus } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';

interface ProductCardProps {
  product: Product;
  index: number;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index, onViewDetails }) => {
  const { purchaseProduct, addToCart, activeDiscount } = useStore();
  const { isDarkMode } = useTheme();

  const handlePurchase = () => {
    if (product.status !== 'Out of Stock') {
      purchaseProduct(product.id);
    }
  };

  const handleAddToCart = () => {
    if (product.status !== 'Out of Stock') {
      addToCart(product.id);
    }
  };

  const discountAmount = (product.amount * activeDiscount) / 100;
  const finalPrice = product.amount - discountAmount;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-amber-400 fill-amber-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'Limited':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onViewDetails?.(product)}
      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
          : 'bg-white border-gray-200 hover:border-gray-300'
      } cursor-pointer`}
    >
      {/* Discount Badge */}
      {activeDiscount > 0 && (
        <div className="absolute top-3 right-3 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          -{activeDiscount}%
        </div>
      )}

      {/* Product Image */}
      {product.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold truncate ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                {renderStars(product.rate)}
                <span className={`text-sm ml-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {product.rate}
                </span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(product.status)}`}>
                {product.status}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className={`text-sm mb-4 line-clamp-2 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {product.text}
        </p>

        {/* Product Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Package className={`w-4 h-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <span className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {product.types}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Award className={`w-4 h-4 ${
              isDarkMode ? 'text-amber-400' : 'text-amber-500'
            }`} />
            <span className={`text-sm font-medium ${
              isDarkMode ? 'text-amber-400' : 'text-amber-600'
            }`}>
              {product.miles} miles
            </span>
          </div>
        </div>

        {/* Orders */}
        <div className={`text-xs mb-4 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {product.orders.toLocaleString()} orders
        </div>

        {/* Price and Purchase */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            {activeDiscount > 0 && (
              <span className={`text-sm line-through ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                ${product.amount.toLocaleString()}
              </span>
            )}
            <span className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              ${finalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={product.status === 'Out of Stock'}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
              product.status === 'Out of Stock'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Plus className="w-4 h-4" />
            Cart
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePurchase}
            onClick={(e) => {
              e.stopPropagation();
              handlePurchase();
            }}
            disabled={product.status === 'Out of Stock'}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
              product.status === 'Out of Stock'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};