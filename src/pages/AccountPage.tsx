import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Award, 
  ShoppingBag, 
  Calendar,
  TrendingUp,
  Gift,
  Clock,
  CheckCircle,
  Package
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';

export const AccountPage: React.FC = () => {
  const { user, orders, redeemBonus, bonuses } = useStore();
  const { isDarkMode } = useTheme();

  const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalMilesEarned = orders.reduce((sum, order) => sum + order.totalMiles, 0);
  const totalOrders = orders.length;

  const canRedeemBonus = user.miles >= 500;
  const availableBonus = bonuses.find(bonus => bonus.milesRequired <= user.miles && bonus.milesRequired >= 500);

  const handleRedeemBonus = () => {
    if (canRedeemBonus && availableBonus) {
      redeemBonus(availableBonus.id);
    }
  };

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Account Dashboard
              </h1>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Welcome back, {user.name}!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-xl border ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Current Miles
              </span>
            </div>
            <p className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {user.miles.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-xl border ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Orders
              </span>
            </div>
            <p className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {totalOrders}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-6 rounded-xl border ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Spent
              </span>
            </div>
            <p className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              ${totalSpent.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-6 rounded-xl border ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Miles Earned
              </span>
            </div>
            <p className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {totalMilesEarned.toLocaleString()}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bonus Redemption */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`p-6 rounded-xl border ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h2 className={`text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Bonus Rewards
              </h2>
            </div>

            {canRedeemBonus && availableBonus ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${
                  isDarkMode
                    ? 'bg-emerald-900/20 border-emerald-700'
                    : 'bg-emerald-50 border-emerald-200'
                }`}>
                  <h3 className={`font-medium mb-2 ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-800'
                  }`}>
                    {availableBonus.name}
                  </h3>
                  <p className={`text-sm mb-3 ${
                    isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
                  }`}>
                    {availableBonus.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      Cost: {availableBonus.milesRequired} miles
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRedeemBonus}
                  className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all font-medium"
                >
                  Redeem Bonus
                </motion.button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Gift className={`w-12 h-12 mx-auto mb-3 ${
                  isDarkMode ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {user.miles < 500 
                    ? `Earn ${500 - user.miles} more miles to unlock bonus rewards`
                    : 'No bonus rewards available at the moment'
                  }
                </p>
              </div>
            )}
          </motion.div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`p-6 rounded-xl border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h2 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Order History
                </h2>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {orders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <p className={`font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              Order #{order.id.slice(-8)}
                            </p>
                            <p className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            ${order.totalAmount.toLocaleString()}
                          </p>
                          <p className="text-sm text-amber-600 dark:text-amber-400">
                            +{order.totalMiles} miles
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.productId} className="flex items-center gap-3">
                            <Package className={`w-3 h-3 ${
                              isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`} />
                            <span className={`text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {item.name} × {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingBag className={`w-12 h-12 mx-auto mb-3 ${
                    isDarkMode ? 'text-gray-600' : 'text-gray-400'
                  }`} />
                  <p className={`${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    No orders yet. Start shopping to see your order history!
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};