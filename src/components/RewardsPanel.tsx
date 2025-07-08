import React from 'react';
import { motion } from 'framer-motion';
import { Award, Gift, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';

export const RewardsPanel: React.FC = () => {
  const { user, bonuses, redeemBonus, clearDiscount, activeDiscount } = useStore();
  const { isDarkMode } = useTheme();

  const handleRedeemBonus = (bonusId: string) => {
    if (activeDiscount === 0) {
      redeemBonus(bonusId);
    }
  };

  const availableBonuses = bonuses.filter(bonus => user.miles >= bonus.milesRequired);
  const unavailableBonuses = bonuses.filter(bonus => user.miles < bonus.milesRequired);

  return (
    <div className={`rounded-xl border p-6 ${
      isDarkMode
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
          <Gift className="w-6 h-6 text-white" />
        </div>
        <h2 className={`text-xl font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Miles Rewards
        </h2>
      </div>

      {/* Current Discount */}
      {activeDiscount > 0 && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6 p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg text-white"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">Active Discount: {activeDiscount}% OFF</span>
            </div>
            <button
              onClick={clearDiscount}
              className="text-sm underline hover:no-underline"
            >
              Clear
            </button>
          </div>
          <p className="text-sm mt-1 opacity-90">
            Your discount will be applied to your next purchase
          </p>
        </motion.div>
      )}

      {/* Available Bonuses */}
      {availableBonuses.length > 0 && (
        <div className="mb-6">
          <h3 className={`text-lg font-medium mb-3 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Available Rewards
          </h3>
          <div className="space-y-3">
            {availableBonuses.map((bonus) => (
              <motion.div
                key={bonus.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-lg border transition-all ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 hover:border-emerald-500'
                    : 'bg-gray-50 border-gray-200 hover:border-emerald-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {bonus.name}
                    </h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {bonus.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {bonus.milesRequired} miles
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRedeemBonus(bonus.id)}
                    disabled={activeDiscount > 0}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                  >
                    Redeem
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Unavailable Bonuses */}
      {unavailableBonuses.length > 0 && (
        <div>
          <h3 className={`text-lg font-medium mb-3 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Upcoming Rewards
          </h3>
          <div className="space-y-3">
            {unavailableBonuses.map((bonus) => (
              <div
                key={bonus.id}
                className={`p-4 rounded-lg border transition-all opacity-50 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {bonus.name}
                    </h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {bonus.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {bonus.milesRequired} miles
                      </span>
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        (Need {bonus.milesRequired - user.miles} more)
                      </span>
                    </div>
                  </div>
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-sm font-medium"
                  >
                    Locked
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {availableBonuses.length === 0 && unavailableBonuses.length === 0 && (
        <div className={`text-center py-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <Gift className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No rewards available at the moment</p>
        </div>
      )}
    </div>
  );
};