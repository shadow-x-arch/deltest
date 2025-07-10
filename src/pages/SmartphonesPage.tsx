import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, SortAsc, SortDesc, ArrowLeft, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { RewardsPanel } from '../components/RewardsPanel';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { SearchBar } from '../components/SearchBar';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';
import { Product } from '../types';

export const SmartphonesPage: React.FC = () => {
  const { products } = useStore();
  const { isDarkMode } = useTheme();
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'miles'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterBy, setFilterBy] = useState<'all' | 'available' | 'limited'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => 
      product.category === 'Electronics' && product.subcategory === 'Smartphones'
    );

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.text.toLowerCase().includes(query) ||
        product.types.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filterBy !== 'all') {
      if (filterBy === 'available') {
        filtered = filtered.filter(product => product.status === 'Available');
      } else if (filterBy === 'limited') {
        filtered = filtered.filter(product => product.status === 'Limited');
      }
    }

    // Apply price range filter
    if (priceRange !== 'all') {
      if (priceRange === 'low') {
        filtered = filtered.filter(product => product.amount < 500);
      } else if (priceRange === 'mid') {
        filtered = filtered.filter(product => product.amount >= 500 && product.amount < 1200);
      } else if (priceRange === 'high') {
        filtered = filtered.filter(product => product.amount >= 1200);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.amount - b.amount;
          break;
        case 'rating':
          comparison = a.rate - b.rate;
          break;
        case 'miles':
          comparison = a.miles - b.miles;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [products, sortBy, sortOrder, filterBy, priceRange, searchQuery]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  return (
    <>
      <div className={`min-h-screen transition-colors ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-6"
              >
                <Link
                  to="/electronics"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'hover:bg-gray-800 text-gray-400'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Electronics
                </Link>
              </motion.div>

              {/* Category Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className={`p-8 rounded-xl border bg-gradient-to-b from-blue-50 via-cyan-50 to-white dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-gray-900 border-blue-200 dark:border-blue-700 relative overflow-hidden`}>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h1 className={`text-4xl font-bold text-blue-700 dark:text-blue-300`}>
                          Latest Smartphones
                        </h1>
                        <p className={`text-lg text-blue-700 dark:text-blue-300 opacity-90`}>
                          Flagship devices with cutting-edge technology and premium features
                        </p>
                      </div>
                    </div>
                    
                    {/* Features Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {['5G Ready', 'Pro Cameras', 'Fast Charging', 'Miles Rewards'].map((feature, index) => (
                        <div key={index} className={`flex items-center gap-2 text-blue-700 dark:text-blue-300 opacity-80`}>
                          <div className={`w-2 h-2 rounded-full bg-blue-700 dark:bg-blue-300 opacity-60`} />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`text-sm text-blue-700 dark:text-blue-300 opacity-70`}>
                      {filteredProducts.length} smartphones available • Earn miles with every purchase
                    </div>
                  </div>
                  
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
                    <div className={`w-full h-full rounded-full bg-blue-700 dark:bg-blue-300 transform translate-x-32 -translate-y-32`} />
                  </div>
                </div>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <SearchBar
                  onSearch={setSearchQuery}
                  placeholder="Search smartphones by brand, model, or features..."
                />
              </motion.div>

              {/* Filters and Sorting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-4 rounded-xl border mb-6 ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <Filter className={`w-4 h-4 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`} />
                    <span className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Filters:
                    </span>
                  </div>

                  {/* Status Filter */}
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value as any)}
                    className={`px-3 py-1 rounded-lg border text-sm ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="limited">Limited</option>
                  </select>

                  {/* Price Range Filter */}
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value as any)}
                    className={`px-3 py-1 rounded-lg border text-sm ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="all">All Prices</option>
                    <option value="low">Under $500</option>
                    <option value="mid">$500 - $1,200</option>
                    <option value="high">Over $1,200</option>
                  </select>

                  {/* Sort Options */}
                  <div className="flex items-center gap-2 ml-auto">
                    <span className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Sort by:
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className={`px-3 py-1 rounded-lg border text-sm ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="name">Name</option>
                      <option value="price">Price</option>
                      <option value="rating">Rating</option>
                      <option value="miles">Miles</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className={`p-1 rounded-lg transition-colors ${
                        isDarkMode
                          ? 'hover:bg-gray-700 text-gray-400'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center py-16 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <div className="text-6xl mb-4">📱</div>
                  <h3 className="text-xl font-medium mb-2">No smartphones found</h3>
                  <p>Try adjusting your search or filters to find more options!</p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <RewardsPanel />
              </div>
            </div>
          </div>
        </div>
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