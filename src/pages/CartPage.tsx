import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Award,
  ArrowLeft,
  CreditCard
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    checkout, 
    getCartTotal,
    activeDiscount 
  } = useStore();
  const { isDarkMode } = useTheme();

  const { totalAmount, totalMiles, totalItems } = getCartTotal();
  const discountAmount = (totalAmount * activeDiscount) / 100;
  const finalAmount = totalAmount - discountAmount;

  const handleCheckout = () => {
    checkout();
  };

  if (cart.length === 0) {
    return (
      <div className={`min-h-screen transition-colors ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <ShoppingCart className={`w-24 h-24 mx-auto mb-6 ${
              isDarkMode ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h1 className={`text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Your Cart is Empty
            </h1>
            <p className={`text-lg mb-8 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Start shopping to add items to your cart and earn miles!
            </p>
            <Link
              to="/travel"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Link
              to="/electronics"
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'hover:bg-gray-800 text-gray-400'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Shopping Cart
            </h1>
          </div>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border transition-all ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    {item.image && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`font-semibold truncate ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {item.name}
                          </h3>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {item.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className={`p-1 rounded-lg transition-colors ${
                            isDarkMode
                              ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400'
                              : 'hover:bg-gray-100 text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                            className={`p-1 rounded-lg transition-colors ${
                              isDarkMode
                                ? 'hover:bg-gray-700 text-gray-400'
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className={`font-medium min-w-[2rem] text-center ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                            className={`p-1 rounded-lg transition-colors ${
                              isDarkMode
                                ? 'hover:bg-gray-700 text-gray-400'
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price and Miles */}
                        <div className="text-right">
                          <div className={`font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            ${item.total.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-amber-600">
                            <Award className="w-3 h-3" />
                            {item.miles} miles
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-xl border sticky top-24 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <h2 className={`text-xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className={`flex justify-between ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalAmount.toLocaleString()}</span>
                </div>

                {activeDiscount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Discount ({activeDiscount}%)</span>
                    <span>-${discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className={`flex justify-between text-amber-600 ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-600'
                }`}>
                  <span className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    Miles Earned
                  </span>
                  <span>{totalMiles.toLocaleString()}</span>
                </div>

                <hr className={`${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`} />

                <div className={`flex justify-between text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <span>Total</span>
                  <span>${finalAmount.toLocaleString()}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <CreditCard className="w-4 h-4" />
                Checkout
              </motion.button>

              <p className={`text-xs text-center mt-3 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Miles will be added to your account after checkout
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};