import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingBag, 
  Award, 
  TrendingUp, 
  Users,
  ArrowRight,
  Star,
  Plane,
  Smartphone,
  Hotel,
  Car,
  Sofa,
  Coffee
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { Product } from '../types';

const categories = [
  { name: 'Flights', path: '/flights', icon: Plane, color: 'from-blue-500 to-blue-600', description: 'Book flights and earn travel miles' },
  { name: 'Electronics', path: '/electronics', icon: Smartphone, color: 'from-purple-500 to-purple-600', description: 'Latest gadgets and tech' },
  { name: 'Hotels', path: '/hotels', icon: Hotel, color: 'from-emerald-500 to-emerald-600', description: 'Luxury stays worldwide' },
  { name: 'Cars', path: '/cars', icon: Car, color: 'from-red-500 to-red-600', description: 'Premium vehicles and rentals' },
  { name: 'Furniture', path: '/furniture', icon: Sofa, color: 'from-amber-500 to-amber-600', description: 'Modern home furnishing' },
  { name: 'Beverage', path: '/beverage', icon: Coffee, color: 'from-pink-500 to-pink-600', description: 'Premium drinks and more' },
];

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { products, user } = useStore();
  const { isDarkMode } = useTheme();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = React.useState(false);

  const featuredProducts = products.slice(0, 6);
  const totalProducts = products.length;
  const totalOrders = products.reduce((sum, product) => sum + product.orders, 0);
  const averageRating = products.reduce((sum, product) => sum + product.rate, 0) / products.length;

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  return (
    <>
      <div className={`min-h-screen transition-colors ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/house"
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {t('home.hero.startShopping')}
                </Link>
                <div className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-white/20 rounded-lg text-white">
                  <Award className="w-5 h-5" />
                  <span className="font-semibold">{user.miles.toLocaleString()} {t('home.hero.milesAvailable')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`text-center p-8 rounded-xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-sm`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg mb-4">
                  <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {totalProducts}
                </h3>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {t('home.stats.productsAvailable')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className={`text-center p-8 rounded-xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-sm`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg mb-4">
                  <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {totalOrders.toLocaleString()}
                </h3>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {t('home.stats.ordersCompleted')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className={`text-center p-8 rounded-xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-sm`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg mb-4">
                  <Star className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {averageRating.toFixed(1)}
                </h3>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {t('home.stats.averageRating')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
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
                {t('home.categories.title')}
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t('home.categories.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={category.path}
                      className={`group block p-6 rounded-xl transition-all duration-300 hover:shadow-lg ${
                        isDarkMode
                          ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                          : 'bg-white hover:bg-gray-50 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-lg font-semibold mb-1 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {t(`header.categories.${category.name.toLowerCase()}`)}
                          </h3>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {t(`home.categories.descriptions.${category.name.toLowerCase()}`)}
                          </p>
                        </div>
                        <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
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
                {t('home.featured.title')}
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t('home.featured.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => handleViewDetails(product)}
                  className={`group p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer ${
                    isDarkMode
                      ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                      : 'bg-white hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.status === 'Available'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
                    }`}>
                      {product.status}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {product.name}
                  </h3>
                  
                  <p className={`text-sm mb-3 line-clamp-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {product.text}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${product.amount.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-amber-400' : 'text-amber-600'
                      }`}>
                        {product.miles} miles
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/house"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t('home.featured.viewAll')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <ProductDetailModal
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setSelectedProduct(null);
        }}
      />
    </>
  );
};