import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Smartphone, 
  Laptop, 
  Gamepad2,
  ArrowRight, 
  Zap, 
  Cpu, 
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

export const ElectronicsLandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { products, user } = useStore();
  const { isDarkMode } = useTheme();

  const smartphoneProducts = products.filter(p => p.category === 'Electronics' && p.subcategory === 'Smartphones');
  const laptopProducts = products.filter(p => p.category === 'Electronics' && p.subcategory === 'Laptops');
  const gadgetProducts = products.filter(p => p.category === 'Electronics' && p.subcategory === 'Gadgets');

  const smartphoneStats = {
    count: smartphoneProducts.length,
    avgPrice: Math.round(smartphoneProducts.reduce((sum, p) => sum + p.amount, 0) / smartphoneProducts.length) || 0,
    avgMiles: Math.round(smartphoneProducts.reduce((sum, p) => sum + p.miles, 0) / smartphoneProducts.length) || 0,
    avgRating: smartphoneProducts.length > 0 ? (smartphoneProducts.reduce((sum, p) => sum + p.rate, 0) / smartphoneProducts.length).toFixed(1) : '0.0'
  };

  const laptopStats = {
    count: laptopProducts.length,
    avgPrice: Math.round(laptopProducts.reduce((sum, p) => sum + p.amount, 0) / laptopProducts.length) || 0,
    avgMiles: Math.round(laptopProducts.reduce((sum, p) => sum + p.miles, 0) / laptopProducts.length) || 0,
    avgRating: laptopProducts.length > 0 ? (laptopProducts.reduce((sum, p) => sum + p.rate, 0) / laptopProducts.length).toFixed(1) : '0.0'
  };

  const gadgetStats = {
    count: gadgetProducts.length,
    avgPrice: Math.round(gadgetProducts.reduce((sum, p) => sum + p.amount, 0) / gadgetProducts.length) || 0,
    avgMiles: Math.round(gadgetProducts.reduce((sum, p) => sum + p.miles, 0) / gadgetProducts.length) || 0,
    avgRating: gadgetProducts.length > 0 ? (gadgetProducts.reduce((sum, p) => sum + p.rate, 0) / gadgetProducts.length).toFixed(1) : '0.0'
  };

  const brands = [
    { name: 'Apple', image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400', products: '15 products' },
    { name: 'Samsung', image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400', products: '12 products' },
    { name: 'Sony', image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400', products: '8 products' },
    { name: 'Microsoft', image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400', products: '6 products' }
  ];

  const features = [
    { icon: Shield, title: 'Warranty Included', description: 'Full manufacturer warranty' },
    { icon: Award, title: 'Miles Rewards', description: 'Earn with every purchase' },
    { icon: Star, title: 'Latest Models', description: 'Cutting-edge technology' },
    { icon: Heart, title: 'Expert Support', description: '24/7 technical assistance' }
  ];

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-indigo-100 to-white dark:from-purple-800 dark:via-indigo-900/30 dark:to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-purple-800'
            }`}>
              Latest Technology
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${
              isDarkMode ? 'text-purple-300' : 'text-purple-700'
            }`}>
              Stay ahead with cutting-edge electronics and innovative gadgets. 
              From smartphones to smart home devices, find everything you need to upgrade your digital life.
            </p>
            
            {/* Miles Display */}
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-12 ${
              isDarkMode ? 'bg-purple-800/50 text-amber-400' : 'bg-white/80 text-amber-600'
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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

      {/* Main Categories */}
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
              Shop by Category
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Find the perfect tech for your lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Smartphones Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to="/electronics/smartphones"
                className={`block p-8 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white hover:bg-gray-50 shadow-lg'
                } transform hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Smartphones
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Latest flagship devices
                    </p>
                  </div>
                  <ArrowRight className={`w-6 h-6 ml-auto transition-transform group-hover:translate-x-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {smartphoneStats.count || '20+'}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Models Available
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {smartphoneStats.avgRating || '4.8'}★
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Average Rating
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    From ${smartphoneStats.avgPrice.toLocaleString() || '599'} • Earn {smartphoneStats.avgMiles || '1200'} miles avg
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    5G Ready
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Pro Cameras
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Fast Charging
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Laptops Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to="/electronics/laptops"
                className={`block p-8 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white hover:bg-gray-50 shadow-lg'
                } transform hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                    <Laptop className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Laptops
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Professional computing power
                    </p>
                  </div>
                  <ArrowRight className={`w-6 h-6 ml-auto transition-transform group-hover:translate-x-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-emerald-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      {laptopStats.count || '15+'}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Models Available
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-emerald-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      {laptopStats.avgRating || '4.7'}★
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Average Rating
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    From ${laptopStats.avgPrice.toLocaleString() || '999'} • Earn {laptopStats.avgMiles || '2000'} miles avg
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    Latest Processors
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    High-Res Displays
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    All-Day Battery
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Gadgets Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to="/electronics/gadgets"
                className={`block p-8 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white hover:bg-gray-50 shadow-lg'
                } transform hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <Gamepad2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Smart Gadgets
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Innovative tech accessories
                    </p>
                  </div>
                  <ArrowRight className={`w-6 h-6 ml-auto transition-transform group-hover:translate-x-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-purple-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      {gadgetStats.count || '25+'}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Gadgets Available
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-purple-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      {gadgetStats.avgRating || '4.6'}★
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Average Rating
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    From ${gadgetStats.avgPrice.toLocaleString() || '149'} • Earn {gadgetStats.avgMiles || '300'} miles avg
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                  }`}>
                    Smart Home
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                  }`}>
                    Gaming Gear
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                  }`}>
                    Audio Tech
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Popular Brands
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Shop from the world's leading technology brands
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{brand.name}</h3>
                    <p className="text-sm opacity-90">{brand.products}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
                : 'bg-gradient-to-r from-purple-50 to-indigo-50'
            }`}
          >
            <Cpu className={`w-16 h-16 mx-auto mb-6 ${
              isDarkMode ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <h2 className={`text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Upgrade Your Tech?
            </h2>
            <p className={`text-lg mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover the latest technology and earn valuable miles with every purchase
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/electronics/smartphones"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Smartphone className="w-5 h-5" />
                Browse Smartphones
              </Link>
              <Link
                to="/electronics/laptops"
                className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Laptop className="w-5 h-5" />
                Browse Laptops
              </Link>
              <Link
                to="/electronics/gadgets"
                className={`px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <Gamepad2 className="w-5 h-5" />
                Browse Gadgets
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};