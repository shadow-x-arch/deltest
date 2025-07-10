import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Car, 
  Zap, 
  Key,
  ArrowRight, 
  Fuel, 
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

export const CarsLandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { products, user } = useStore();
  const { isDarkMode } = useTheme();

  const luxuryProducts = products.filter(p => p.category === 'Cars' && p.subcategory === 'Luxury Cars');
  const electricProducts = products.filter(p => p.category === 'Cars' && p.subcategory === 'Electric Cars');
  const rentalProducts = products.filter(p => p.category === 'Cars' && p.subcategory === 'Car Rental');

  const luxuryStats = {
    count: luxuryProducts.length,
    avgPrice: Math.round(luxuryProducts.reduce((sum, p) => sum + p.amount, 0) / luxuryProducts.length) || 0,
    avgMiles: Math.round(luxuryProducts.reduce((sum, p) => sum + p.miles, 0) / luxuryProducts.length) || 0,
    avgRating: luxuryProducts.length > 0 ? (luxuryProducts.reduce((sum, p) => sum + p.rate, 0) / luxuryProducts.length).toFixed(1) : '0.0'
  };

  const electricStats = {
    count: electricProducts.length,
    avgPrice: Math.round(electricProducts.reduce((sum, p) => sum + p.amount, 0) / electricProducts.length) || 0,
    avgMiles: Math.round(electricProducts.reduce((sum, p) => sum + p.miles, 0) / electricProducts.length) || 0,
    avgRating: electricProducts.length > 0 ? (electricProducts.reduce((sum, p) => sum + p.rate, 0) / electricProducts.length).toFixed(1) : '0.0'
  };

  const rentalStats = {
    count: rentalProducts.length,
    avgPrice: Math.round(rentalProducts.reduce((sum, p) => sum + p.amount, 0) / rentalProducts.length) || 0,
    avgMiles: Math.round(rentalProducts.reduce((sum, p) => sum + p.miles, 0) / rentalProducts.length) || 0,
    avgRating: rentalProducts.length > 0 ? (rentalProducts.reduce((sum, p) => sum + p.rate, 0) / rentalProducts.length).toFixed(1) : '0.0'
  };

  const carBrands = [
    { name: 'Tesla', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400', models: '8 models' },
    { name: 'BMW', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400', models: '12 models' },
    { name: 'Mercedes', image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=400', models: '10 models' },
    { name: 'Porsche', image: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=400', models: '6 models' }
  ];

  const features = [
    { icon: Shield, title: 'Insurance Included', description: 'Full coverage protection' },
    { icon: Award, title: 'Miles Rewards', description: 'Earn with every purchase' },
    { icon: Star, title: 'Premium Fleet', description: 'Luxury vehicles only' },
    { icon: Heart, title: '24/7 Support', description: 'Roadside assistance' }
  ];

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-300 via-orange-100 to-white dark:from-red-800 dark:via-orange-900/30 dark:to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-red-800'
            }`}>
              Drive in Style
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${
              isDarkMode ? 'text-red-300' : 'text-red-700'
            }`}>
              Experience luxury and performance with our premium vehicle collection. 
              From electric supercars to luxury rentals, find your perfect ride and earn miles with every journey.
            </p>
            
            {/* Miles Display */}
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-12 ${
              isDarkMode ? 'bg-red-800/50 text-amber-400' : 'bg-white/80 text-amber-600'
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-red-600 dark:text-red-400" />
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
              Choose Your Experience
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Whether you're buying, renting, or going electric
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Luxury Cars Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to="/cars/luxury"
                className={`block p-8 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white hover:bg-gray-50 shadow-lg'
                } transform hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                    <Car className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Luxury Cars
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Premium vehicles for sale
                    </p>
                  </div>
                  <ArrowRight className={`w-6 h-6 ml-auto transition-transform group-hover:translate-x-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-amber-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-amber-400' : 'text-amber-600'
                    }`}>
                      {luxuryStats.count || '20+'}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Luxury Models
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-amber-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-amber-400' : 'text-amber-600'
                    }`}>
                      {luxuryStats.avgRating || '4.8'}★
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
                    From ${luxuryStats.avgPrice.toLocaleString() || '75,000'} • Earn {luxuryStats.avgMiles || '15,000'} miles avg
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-100 text-amber-700'
                  }`}>
                    Premium Brands
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-100 text-amber-700'
                  }`}>
                    Certified Pre-owned
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-100 text-amber-700'
                  }`}>
                    Financing Available
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Electric Cars Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to="/cars/electric"
                className={`block p-8 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white hover:bg-gray-50 shadow-lg'
                } transform hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Electric Cars
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Sustainable future driving
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
                      {electricStats.count || '15+'}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Electric Models
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-emerald-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      {electricStats.avgRating || '4.9'}★
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
                    From ${electricStats.avgPrice.toLocaleString() || '45,000'} • Earn {electricStats.avgMiles || '9,000'} miles avg
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    Zero Emissions
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    Fast Charging
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    Tax Incentives
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Car Rental Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to="/cars/rental"
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
                      Car Rentals
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Flexible rental options
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
                      {rentalStats.count || '50+'}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Rental Options
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {rentalStats.avgRating || '4.7'}★
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
                    From ${rentalStats.avgPrice.toLocaleString() || '89'}/day • Earn {rentalStats.avgMiles || '180'} miles avg
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Hourly & Daily
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Airport Pickup
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    No Hidden Fees
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Car Brands */}
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
              Premium Brands
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Drive the world's most prestigious automotive brands
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {carBrands.map((brand, index) => (
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
                    <p className="text-sm opacity-90">{brand.models}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Car className="w-5 h-5 text-white" />
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
                : 'bg-gradient-to-r from-red-50 to-orange-50'
            }`}
          >
            <Compass className={`w-16 h-16 mx-auto mb-6 ${
              isDarkMode ? 'text-red-400' : 'text-red-600'
            }`} />
            <h2 className={`text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Hit the Road?
            </h2>
            <p className={`text-lg mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Find your perfect vehicle and earn valuable miles with every purchase or rental
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/cars/luxury"
                className="px-8 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Car className="w-5 h-5" />
                Browse Luxury Cars
              </Link>
              <Link
                to="/cars/electric"
                className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Browse Electric Cars
              </Link>
              <Link
                to="/cars/rental"
                className={`px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <Key className="w-5 h-5" />
                Browse Rentals
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};