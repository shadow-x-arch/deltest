import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Coffee, 
  Wine, 
  Droplets,
  ArrowRight, 
  Thermometer, 
  Calendar, 
  Users, 
  Star,
  Award,
  Shield,
  Compass,
  Camera,
  Heart,
  DollarSign
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';

export const BeverageLandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { products, user } = useStore();
  const { isDarkMode } = useTheme();

  const beverageProducts = products.filter(p => p.category === 'Beverage');

  const beverageStats = {
    count: beverageProducts.length,
    avgPrice: Math.round(beverageProducts.reduce((sum, p) => sum + p.amount, 0) / beverageProducts.length) || 0,
    avgMiles: Math.round(beverageProducts.reduce((sum, p) => sum + p.miles, 0) / beverageProducts.length) || 0,
    avgRating: beverageProducts.length > 0 ? (beverageProducts.reduce((sum, p) => sum + p.rate, 0) / beverageProducts.length).toFixed(1) : '0.0'
  };

  const beverageTypes = [
    { 
      name: 'Premium Coffee', 
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', 
      description: 'Artisanal coffee beans from around the world',
      icon: Coffee,
      color: 'from-amber-500 to-orange-500'
    },
    { 
      name: 'Fine Wines', 
      image: 'https://images.pexels.com/photos/434311/pexels-photo-434311.jpeg?auto=compress&cs=tinysrgb&w=400', 
      description: 'Curated selection of vintage wines',
      icon: Wine,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'Craft Spirits', 
      image: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=400', 
      description: 'Premium whiskeys and artisanal spirits',
      icon: Droplets,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Specialty Teas', 
      image: 'https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?auto=compress&cs=tinysrgb&w=400', 
      description: 'Rare and exotic tea collections',
      icon: Coffee,
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const features = [
    { icon: Shield, title: 'Quality Guaranteed', description: 'Premium sourcing only' },
    { icon: Award, title: 'Miles Rewards', description: 'Earn with every purchase' },
    { icon: Star, title: 'Expert Curation', description: 'Hand-selected products' },
    { icon: Heart, title: 'Temperature Control', description: 'Perfect storage & shipping' }
  ];

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-rose-100 to-white dark:from-pink-800 dark:via-rose-900/30 dark:to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-pink-800'
            }`}>
              Premium Beverages
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${
              isDarkMode ? 'text-pink-300' : 'text-pink-700'
            }`}>
              Indulge in our curated selection of premium beverages. From rare vintage wines to artisanal coffee, 
              discover exceptional drinks and earn miles with every sip.
            </p>
            
            {/* Miles Display */}
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-12 ${
              isDarkMode ? 'bg-pink-800/50 text-amber-400' : 'bg-white/80 text-amber-600'
            } backdrop-blur-sm border border-white/20`}>
              <Award className="w-6 h-6" />
              <span className="text-lg font-semibold">
                {user.miles.toLocaleString()} miles available
              </span>
            </div>

            {/* Background Pattern */}
            <div className="absolute top-8 right-8 w-32 h-16 bg-white/20 rounded-lg blur-sm opacity-60" />
            <div className="absolute top-16 right-16 w-24 h-12 bg-white/15 rounded-lg blur-sm opacity-50" />
            <div className="absolute top-24 right-4 w-20 h-10 bg-white/25 rounded-lg blur-sm opacity-40" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`text-center p-6 rounded-xl ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-sm`}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Beverage Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Explore Our Collection
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover premium beverages from around the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beverageTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link
                    to="/beverage"
                    className={`block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                      isDarkMode
                        ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                        : 'bg-white hover:bg-gray-50 shadow-lg'
                    } transform hover:-translate-y-2`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={type.image}
                        alt={type.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className={`absolute top-4 left-4 p-3 rounded-xl bg-gradient-to-r ${type.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold mb-1">{type.name}</h3>
                        <p className="text-sm opacity-90">{type.description}</p>
                      </div>
                      <ArrowRight className={`absolute bottom-4 right-4 w-6 h-6 text-white transition-transform group-hover:translate-x-2`} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Category Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group"
          >
            <Link
              to="/beverage"
              className={`block p-8 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                  : 'bg-white hover:bg-gray-50 shadow-lg'
              } transform hover:-translate-y-2`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
                  <Coffee className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    All Premium Beverages
                  </h3>
                  <p className={`${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Complete collection of curated drinks
                  </p>
                </div>
                <ArrowRight className={`w-6 h-6 ml-auto transition-transform group-hover:translate-x-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-pink-50'
                }`}>
                  <div className={`text-2xl font-bold ${
                    isDarkMode ? 'text-pink-400' : 'text-pink-600'
                  }`}>
                    {beverageStats.count || '50+'}
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Premium Beverages
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-pink-50'
                }`}>
                  <div className={`text-2xl font-bold ${
                    isDarkMode ? 'text-pink-400' : 'text-pink-600'
                  }`}>
                    {beverageStats.avgRating || '4.9'}★
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Average Rating
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-pink-50'
                }`}>
                  <div className={`text-2xl font-bold ${
                    isDarkMode ? 'text-pink-400' : 'text-pink-600'
                  }`}>
                    ${beverageStats.avgPrice.toLocaleString() || '89'}
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Average Price
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-pink-50'
                }`}>
                  <div className={`text-2xl font-bold ${
                    isDarkMode ? 'text-pink-400' : 'text-pink-600'
                  }`}>
                    {beverageStats.avgMiles || '180'}
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Miles Earned
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode ? 'bg-pink-900/20 text-pink-400' : 'bg-pink-100 text-pink-700'
                }`}>
                  Curated Selection
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode ? 'bg-pink-900/20 text-pink-400' : 'bg-pink-100 text-pink-700'
                }`}>
                  Rare Finds
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode ? 'bg-pink-900/20 text-pink-400' : 'bg-pink-100 text-pink-700'
                }`}>
                  Expert Recommendations
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode ? 'bg-pink-900/20 text-pink-400' : 'bg-pink-100 text-pink-700'
                }`}>
                  Temperature Controlled
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`p-12 rounded-2xl ${
              isDarkMode
                ? 'bg-gradient-to-r from-gray-800 to-gray-700'
                : 'bg-gradient-to-r from-pink-50 to-rose-50'
            }`}
          >
            <Compass className={`w-16 h-16 mx-auto mb-6 ${
              isDarkMode ? 'text-pink-400' : 'text-pink-600'
            }`} />
            <h2 className={`text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Discover Premium Beverages?
            </h2>
            <p className={`text-lg mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Explore our curated collection and earn valuable miles with every purchase
            </p>
            <Link
              to="/beverage"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Coffee className="w-5 h-5" />
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};