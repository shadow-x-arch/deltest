import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Star, 
  ShoppingCart, 
  Plus, 
  Award, 
  Package, 
  TrendingUp,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { purchaseProduct, addToCart, activeDiscount } = useStore();
  const { isDarkMode } = useTheme();

  if (!isOpen || !product) return null;

  const handlePurchase = () => {
    if (product.status !== 'Out of Stock') {
      purchaseProduct(product.id);
      onClose();
    }
  };

  const handleAddToCart = () => {
    if (product.status !== 'Out of Stock') {
      addToCart(product.id);
      onClose();
    }
  };

  const discountAmount = (product.amount * activeDiscount) / 100;
  const finalPrice = product.amount - discountAmount;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
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

  const getCategoryIcon = (category: Product['category']) => {
    switch (category) {
      case 'Flights':
        return <MapPin className="w-4 h-4" />;
      case 'Electronics':
        return <Package className="w-4 h-4" />;
      case 'Hotels':
        return <Calendar className="w-4 h-4" />;
      case 'Cars':
        return <TrendingUp className="w-4 h-4" />;
      case 'Furniture':
        return <Package className="w-4 h-4" />;
      case 'Beverage':
        return <Clock className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b backdrop-blur-sm bg-opacity-95 rounded-t-xl">
          <h2 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Product Details
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-700 text-gray-400'
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              {product.image ? (
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Package className={`w-24 h-24 ${
                    isDarkMode ? 'text-gray-600' : 'text-gray-400'
                  }`} />
                </div>
              )}

              {/* Discount Badge */}
              {activeDiscount > 0 && (
                <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-center font-semibold">
                  🎉 {activeDiscount}% OFF Applied!
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title and Category */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                    isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getCategoryIcon(product.category)}
                    <span className="text-sm font-medium">{product.category}</span>
                  </div>
                </div>
                <h1 className={`text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {product.name}
                </h1>
                <p className={`text-lg mt-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {product.types}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {renderStars(product.rate)}
                </div>
                <span className={`text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {product.rate}
                </span>
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  ({product.orders.toLocaleString()} orders)
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Description
                </h3>
                <p className={`text-base leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {product.text}
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Miles Reward
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {product.miles.toLocaleString()}
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <span className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Popularity
                    </span>
                  </div>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {product.orders > 1000 ? 'Best Seller' : 
                     product.orders > 500 ? 'Popular' : 'New'}
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className={`p-6 rounded-xl border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {activeDiscount > 0 && (
                      <span className={`text-lg line-through ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        ${product.amount.toLocaleString()}
                      </span>
                    )}
                    <div className={`text-3xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${finalPrice.toLocaleString()}
                    </div>
                    {activeDiscount > 0 && (
                      <span className="text-red-600 font-medium">
                        Save ${discountAmount.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={product.status === 'Out of Stock'}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      product.status === 'Out of Stock'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : isDarkMode
                        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                    Add to Cart
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePurchase}
                    disabled={product.status === 'Out of Stock'}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      product.status === 'Out of Stock'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now
                  </motion.button>
                </div>

                {product.status === 'Out of Stock' && (
                  <p className="text-center text-red-600 dark:text-red-400 mt-3 font-medium">
                    This item is currently out of stock
                  </p>
                )}
              </div>

              {/* Additional Info */}
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
              }`}>
                <h4 className={`font-semibold mb-2 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-800'
                }`}>
                  💡 Did you know?
                </h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-700'
                }`}>
                  You'll earn {product.miles} miles with this purchase, bringing you closer to exclusive rewards and discounts!
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};