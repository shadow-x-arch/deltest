import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Plane, 
  Hotel, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Users, 
  Star,
  Award,
  Globe,
  Compass,
  Camera,
  Heart
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';

export const TravelLandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { products, user } = useStore();
  const { isDarkMode } = useTheme();

  const flightProducts = products.filter(p => p.category === 'Travel' && p.subcategory === 'Flights');
  const hotelProducts = products.filter(p => p.category === 'Travel' && p.subcategory === 'Hotels');

  const flightStats = {
    count: flightProducts.length,
    avgPrice: Math.round(flightProducts.reduce((sum, p) => sum + p.amount, 0) / flightProducts.length),
    avgMiles: Math.round(flightProducts.reduce((sum, p) => sum + p.miles, 0) / flightProducts.length),
    avgRating: (flightProducts.reduce((sum, p) => sum + p.rate, 0) / flightProducts.length).toFixed(1)
  };

  const hotelStats = {
    count: hotelProducts.length,
    avgPrice: Math.round(hotelProducts.reduce((sum, p) => sum + p.amount, 0) / hotelProducts.length),
    avgMiles: Math.round(hotelProducts.reduce((sum, p) => sum + p.miles, 0) / hotelProducts.length),
    avgRating: (hotelProducts.reduce((sum, p) => sum + p.rate, 0) / hotelProducts.length).toFixed(1)
  };

  const destinations = [
    { name: 'Paris', image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=400', deals: '12 deals' },
    { name: 'Tokyo', image: 'https://images.pexels.com/photos/248195/pexels-photo-248195.jpeg?auto=compress&cs=tinysrgb&w=400', deals: '8 deals' },
    { name: 'New York', image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=400', deals: '15 deals' },
    { name: 'London', image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=400', deals: '10 deals' }
  ];

  const features = [
    { icon: Globe, title: 'Global Coverage', description: 'Destinations worldwide' },
    { icon: Award, title: 'Miles Rewards', description: 'Earn with every booking' },
    { icon: Star, title: 'Premium Quality', description: 'Curated experiences' },
    { icon: Heart, title: 'Customer Care', description: '24/7 support' }
  ];

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-blue-100 to-white dark:from-slate-800 dark:via-blue-900/30 dark:to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              Explore the World
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Discover amazing destinations with premium flights and luxury accommodations. 
              Earn miles with every booking and unlock exclusive travel benefits.
            </p>
            
            {/* Miles Display */}
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-12 ${
              isDarkMode ? 'bg-slate-800/50 text-amber-400' : 'bg-white/80 text-amber-600'
            } backdrop-blur-sm border border-white/20`}>
              <Award className="w-6 h-6" />
              <span className="text-lg font-semibold">
                {user.miles.toLocaleString()} miles available
              </span>
            </div>

            {/* Cloud Background Elements */}
            <div className="absolute top-8 right-8 w-32 h-16 bg-white/20 rounded-full blur-sm opacity-60" />
            <div className="absolute top-16 right-16 w-24 h-12 bg-white/15 rounded-full blur-sm opacity-50" />
            <div className="absolute top-24 right-4 w-20 h-10 bg-white/25 rounded-full blur-sm opacity-40" />
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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

      {/* Main Travel Categories */}
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
              Plan Your Perfect Trip
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Choose from premium flights and luxury accommodations worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Flights Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to="/travel/flights"
                className={`block p-8 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white hover:bg-gray-50 shadow-lg'
                } transform hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                    <Plane className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Premium Flights
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Direct routes to global destinations
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
                      {flightStats.count}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Available Routes
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {flightStats.avgRating}★
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
                    From ${flightStats.avgPrice.toLocaleString()} • Earn {flightStats.avgMiles} miles avg
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Business Class
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Direct Routes
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Premium Service
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Hotels Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to="/travel/hotels"
                className={`block p-8 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white hover:bg-gray-50 shadow-lg'
                } transform hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <Hotel className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Luxury Hotels
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Premium accommodations worldwide
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
                      {hotelStats.count}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Properties
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-purple-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      {hotelStats.avgRating}★
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
                    From ${hotelStats.avgPrice.toLocaleString()} • Earn {hotelStats.avgMiles} miles avg
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                  }`}>
                    5-Star Luxury
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                  }`}>
                    Spa & Wellness
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                  }`}>
                    Concierge Service
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
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
              Popular Destinations
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover trending destinations with exclusive deals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
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
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{destination.name}</h3>
                    <p className="text-sm opacity-90">{destination.deals}</p>
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
                : 'bg-gradient-to-r from-blue-50 to-purple-50'
            }`}
          >
            <Compass className={`w-16 h-16 mx-auto mb-6 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <h2 className={`text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Start Your Journey?
            </h2>
            <p className={`text-lg mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Book your next adventure and earn valuable miles with every purchase
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/travel/flights"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Plane className="w-5 h-5" />
                Browse Flights
              </Link>
              <Link
                to="/travel/hotels"
                className={`px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <Hotel className="w-5 h-5" />
                Browse Hotels
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};