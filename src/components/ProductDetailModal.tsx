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
  Clock,
  Minus,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight
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
  const [selectedSize, setSelectedSize] = React.useState('Medium');
  const [quantity, setQuantity] = React.useState(1);
  const [selectedColor, setSelectedColor] = React.useState(0);

  if (!isOpen || !product) return null;

  const handlePurchase = () => {
    if (product.status !== 'Out of Stock') {
      purchaseProduct(product.id);
      onClose();
    }
  };

  const handleAddToCart = () => {
    if (product.status !== 'Out of Stock') {
      addToCart(product.id, quantity);
      onClose();
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

  const sizes = ['Small', 'Medium', 'Large'];
  const colors = [
    { name: 'Silver', class: 'bg-gray-300' },
    { name: 'Black', class: 'bg-gray-900' },
    { name: 'Blue', class: 'bg-blue-500' },
    { name: 'Rose Gold', class: 'bg-pink-400' },
    { name: 'White', class: 'bg-white border-2 border-gray-200' }
  ];

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
        className={`w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        } shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? 'hover:bg-gray-700 text-gray-400'
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Back to products
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-700 text-gray-400'
                : 'hover:bg-gray-100 text-gray-500'
            }`}>
              <Heart className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-700 text-gray-400'
                : 'hover:bg-gray-100 text-gray-500'
            }`}>
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? 'hover:bg-gray-700 text-gray-400'
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Side - Product Image */}
          <div className={`relative p-8 flex items-center justify-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="relative w-full max-w-md">
              {/* Product Image */}
              {product.image ? (
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                  <Package className={`w-24 h-24 ${
                    isDarkMode ? 'text-gray-600' : 'text-gray-400'
                  }`} />
                </div>
              )}

              {/* Navigation Arrows */}
              <button className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
              } shadow-lg hover:shadow-xl transition-all`}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
              } shadow-lg hover:shadow-xl transition-all`}>
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Discount Badge */}
              {activeDiscount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{activeDiscount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className={`p-8 overflow-y-auto ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            {/* Product Title & Status */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Subtotal Size
                </span>
              </div>
              
              <h1 className={`text-3xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {product.name}
              </h1>
              
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {product.types}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {renderStars(product.rate)}
              </div>
              <span className={`font-semibold ${
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

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className={`text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Size
              </h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        : isDarkMode
                        ? 'border-gray-600 text-gray-300 hover:border-gray-500'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-xs font-medium">{size}</div>
                    <div className="text-xs opacity-70">
                      {size === 'Small' ? '40x30x20' : size === 'Medium' ? '50x35x25' : '60x40x30'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className={`text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Color & Pattern
              </h3>
              <div className="flex gap-3 mb-2">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-8 h-8 rounded-full ${color.class} ${
                      selectedColor === index
                        ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900'
                        : ''
                    }`}
                  />
                ))}
              </div>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {colors[selectedColor].name}
              </p>
            </div>

            {/* Handle Options */}
            <div className="mb-6">
              <h3 className={`text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Handle Options
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className={`p-3 rounded-lg border text-left ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-800 text-gray-300'
                    : 'border-gray-300 bg-white text-gray-700'
                }`}>
                  <div className="text-sm font-medium">Telescopic</div>
                  <div className="text-xs opacity-70">Adjustable height</div>
                </button>
                <button className={`p-3 rounded-lg border text-left ${
                  isDarkMode
                    ? 'border-blue-500 bg-blue-900/20 text-blue-400'
                    : 'border-blue-500 bg-blue-50 text-blue-700'
                }`}>
                  <div className="text-sm font-medium">360° spin</div>
                  <div className="text-xs opacity-70">Heavy-duty</div>
                </button>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className={`text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Quantity
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`p-2 rounded-lg border ${
                    isDarkMode
                      ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className={`px-4 py-2 border rounded-lg min-w-[60px] text-center ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-800 text-white'
                    : 'border-gray-300 bg-white text-gray-900'
                }`}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={`p-2 rounded-lg border ${
                    isDarkMode
                      ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pricing */}
            <div className={`p-6 rounded-xl border mb-6 ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Total Price
                  </div>
                  {activeDiscount > 0 && (
                    <span className={`text-lg line-through ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      ${(product.amount * quantity).toLocaleString()}
                    </span>
                  )}
                  <div className={`text-3xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    ${(finalPrice * quantity).toLocaleString()}
                  </div>
                  {activeDiscount > 0 && (
                    <span className="text-red-600 font-medium text-sm">
                      Save ${(discountAmount * quantity).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                    <Award className="w-4 h-4" />
                    <span className="font-semibold">{product.miles * quantity}</span>
                  </div>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    miles earned
                  </div>
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
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
                  Order Suitcase
                </motion.button>
              </div>

              {product.status === 'Out of Stock' && (
                <p className="text-center text-red-600 dark:text-red-400 mt-3 font-medium text-sm">
                  This item is currently out of stock
                </p>
              )}
            </div>

            {/* Additional Info */}
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
            }`}>
              <h4 className={`font-semibold mb-2 text-sm ${
                isDarkMode ? 'text-blue-400' : 'text-blue-800'
              }`}>
                Need to Know
              </h4>
              <p className={`text-xs ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                Personalized monogramming takes 3 to 5 working days.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};