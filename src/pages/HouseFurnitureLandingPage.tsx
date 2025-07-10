import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Sofa, 
  Key,
  ArrowRight, 
  MapPin, 
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

export const HouseFurnitureLandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { products, user } = useStore();
  const { isDarkMode } = useTheme();

  const houseRentProducts = products.filter(p => p.category === 'House & Furniture' && p.subcategory === 'House Rent');
  const houseSaleProducts = products.filter(p => p.category === 'House & Furniture' && p.subcategory === 'House Sale');
  const furnitureProducts = products.filter(p => p.category === 'House & Furniture' && p.subcategory === 'Furniture');

  const rentStats = {
    count: houseRentProducts.length,
    avgPrice: Math.round(houseRentProducts.reduce((sum, p) => sum + p.amount, 0) / houseRentProducts.length),
    avgMiles: Math.round(houseRentProducts.reduce((sum, p) => sum + p.miles, 0) / houseRentProducts.length),
    avgRating: (houseRentProducts.reduce((sum, p) => sum + p.rate, 0) / houseRentProducts.length).toFixed(1)
  };

  const saleStats = {
    count: houseSaleProducts.length,
    avgPrice: Math.round(houseSaleProducts.reduce((sum, p) => sum + p.amount, 0) / houseSaleProducts.length),
    avgMiles: Math.round(houseSaleProducts.reduce((sum, p) => sum + p.miles, 0) / houseSaleProducts.length),
    avgRating: (houseSaleProducts.reduce((sum, p) => sum + p.rate, 0) / houseSaleProducts.length).toFixed(1)
  };

  const furnitureStats = {
    count: furnitureProducts.length,
    avgPrice: Math.round(furnitureProducts.reduce((sum, p) => sum + p.amount, 0) / furnitureProducts.length),
    avgMiles: Math.round(furnitureProducts.reduce((sum, p) => sum + p.miles, 0) / furnitureProducts.length),
    avgRating: (furnitureProducts.reduce((sum, p) => sum + p.rate, 0) / furnitureProducts.length).toFixed(1)
  };

  const neighborhoods = [
    { name: 'Downtown', image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400', properties: '45 properties' },
    { name: 'Suburbs', image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400', properties: '67 properties' },
    { name: 'Waterfront', image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400', properties: '23 properties' },
    { name: 'Historic District', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400', properties: '34 properties' }
  ];

  const features = [
    { icon: Shield, title: 'Verified Properties', description: 'All listings verified' },
    { icon: Award, title: 'Miles Rewards', description: 'Earn with every transaction' },
    { icon: Star, title: 'Premium Service', description: 'Expert guidance' },
    { icon: Heart, title: 'Customer Care', description: '24/7 support' }
  ];

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-orange-100 to-white dark:from-amber-800 dark:via-orange-900/30 dark:to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-amber-800'
            }`}>
              Find Your Perfect Home
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${
              isDarkMode ? 'text-amber-300' : 'text-amber-700'
            }`}>
              Discover your dream home for rent or sale, plus premium furniture to make it perfect. 
              Earn miles with every transaction and unlock exclusive real estate benefits.
            </p>
            
            {/* Miles Display */}
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-12 ${
              isDarkMode ? 'bg-amber-800/50 text-amber-400' : 'bg-white/80 text-amber-600'
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
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
              Explore Our Services
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Whether you're looking to rent, buy, or furnish your space
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* House Rent Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to="/house-furniture/rent"
                className={`block p-8 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white hover:bg-gray-50 shadow-lg'
                } transform hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                    <Key className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Houses for Rent
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Find your perfect rental home
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
                      {rentStats.count}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Available Rentals
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {rentStats.avgRating}★
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
                    From ${rentStats.avgPrice.toLocaleString()}/mo • Earn {rentStats.avgMiles} miles avg
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Verified Listings
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Virtual Tours
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Quick Move-in
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* House Sale Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to="/house-furniture/sale"
                className={`block p-8 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white hover:bg-gray-50 shadow-lg'
                } transform hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Houses for Sale
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Invest in your dream home
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
                      {saleStats.count}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Properties for Sale
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-emerald-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      {saleStats.avgRating}★
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
                    From ${saleStats.avgPrice.toLocaleString()} • Earn {saleStats.avgMiles} miles avg
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    Market Analysis
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    Financing Help
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    Expert Agents
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Furniture Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to="/house-furniture/furniture"
                className={`block p-8 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white hover:bg-gray-50 shadow-lg'
                } transform hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <Sofa className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Premium Furniture
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Complete your perfect space
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
                      {furnitureStats.count}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Furniture Items
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-purple-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      {furnitureStats.avgRating}★
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
                    From ${furnitureStats.avgPrice.toLocaleString()} • Earn {furnitureStats.avgMiles} miles avg
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                  }`}>
                    Designer Brands
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                  }`}>
                    Free Delivery
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                  }`}>
                    Assembly Service
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Neighborhoods */}
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
              Popular Neighborhoods
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Explore trending areas with the best properties
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {neighborhoods.map((neighborhood, index) => (
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
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{neighborhood.name}</h3>
                    <p className="text-sm opacity-90">{neighborhood.properties}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <MapPin className="w-5 h-5 text-white" />
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
                : 'bg-gradient-to-r from-amber-50 to-orange-50'
            }`}
          >
            <Compass className={`w-16 h-16 mx-auto mb-6 ${
              isDarkMode ? 'text-amber-400' : 'text-amber-600'
            }`} />
            <h2 className={`text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Find Your Perfect Home?
            </h2>
            <p className={`text-lg mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Start your journey today and earn valuable miles with every transaction
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/house-furniture/rent"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Key className="w-5 h-5" />
                Browse Rentals
              </Link>
              <Link
                to="/house-furniture/sale"
                className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Browse Sales
              </Link>
              <Link
                to="/house-furniture/furniture"
                className={`px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <Sofa className="w-5 h-5" />
                Browse Furniture
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};