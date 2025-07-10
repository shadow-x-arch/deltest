import React, { useMemo, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { RewardsPanel } from '../components/RewardsPanel';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { SearchBar } from '../components/SearchBar';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';
import { Product } from '../types';

const categoryMapping: Record<string, Product['category']> = {
  '/travel': 'Travel',
  '/electronics': 'Electronics',
  '/cars': 'Cars',
  '/house-furniture': 'House & Furniture',
  '/beverage': 'Beverage'
};

const getCategoryColors = (category: Product['category']) => {
  switch (category) {
    case 'Travel':
      return {
        gradient: 'from-slate-300 via-blue-100 to-white',
        bg: 'bg-gradient-to-b from-slate-200 via-blue-50 to-white dark:from-slate-800 dark:via-blue-900/30 dark:to-gray-900',
        text: 'text-slate-700 dark:text-slate-300',
        border: 'border-slate-200 dark:border-slate-700'
      };
    case 'Electronics':
      return {
        gradient: 'from-purple-500 to-purple-600',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        text: 'text-purple-700 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-700'
      };
    case 'Cars':
      return {
        gradient: 'from-red-500 to-red-600',
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-700 dark:text-red-400',
        border: 'border-red-200 dark:border-red-700'
      };
    case 'Furniture':
      return {
        gradient: 'from-amber-500 to-amber-600',
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-700'
      };
    case 'Beverage':
      return {
        gradient: 'from-pink-500 to-pink-600',
        bg: 'bg-pink-50 dark:bg-pink-900/20',
        text: 'text-pink-700 dark:text-pink-400',
        border: 'border-pink-200 dark:border-pink-700'
      };
    default:
      return {
        gradient: 'from-gray-500 to-gray-600',
        bg: 'bg-gray-50 dark:bg-gray-900/20',
        text: 'text-gray-700 dark:text-gray-400',
        border: 'border-gray-200 dark:border-gray-700'
      };
  }
};

export const CategoryPage: React.FC = () => {
  const location = useLocation();
  const { products } = useStore();
  const { isDarkMode } = useTheme();
  const [sortBy, setSortBy] = React.useState<'name' | 'price' | 'rating' | 'miles'>('name');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const [filterBy, setFilterBy] = React.useState<'all' | 'available' | 'limited'>('all');
  const [priceRange, setPriceRange] = React.useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const categoryName = categoryMapping[location.pathname];
  const categoryColors = getCategoryColors(categoryName);
  
  if (!categoryName) {
    return <Navigate to="/electronics" replace />;
  }
  
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => product.category === categoryName);

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
        filtered = filtered.filter(product => product.amount < 100);
      } else if (priceRange === 'mid') {
        filtered = filtered.filter(product => product.amount >= 100 && product.amount < 1000);
      } else if (priceRange === 'high') {
        filtered = filtered.filter(product => product.amount >= 1000);
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
  }, [products, categoryName, sortBy, sortOrder, filterBy, priceRange, searchQuery]);

  const categoryDisplayName = categoryName.toLowerCase();

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const getCategoryDescription = (category: Product['category']) => {
    switch (category) {
      case 'Travel':
        return {
          title: 'Explore the World with Premium Travel',
          description: 'Discover amazing destinations with our curated selection of premium flights and luxury accommodations. Earn miles with every booking and enjoy exclusive travel benefits.',
          features: ['Premium Flights & Hotels', 'Direct Routes Available', 'Luxury Accommodations', 'Exclusive Travel Benefits']
        };
      case 'Electronics':
        return {
          title: 'Latest Technology & Gadgets',
          description: 'Stay ahead with cutting-edge electronics and innovative gadgets. From smartphones to smart home devices, find everything you need.',
          features: ['Latest Models Available', 'Warranty Included', 'Expert Support', 'Fast Shipping']
        };
      case 'Cars':
        return {
          title: 'Premium Vehicles & Car Rentals',
          description: 'Drive in style with our collection of luxury vehicles and premium car rental options for every occasion.',
          features: ['Luxury Fleet', 'Flexible Rentals', 'Insurance Included', '24/7 Support']
        };
      case 'House & Furniture':
        return {
          title: 'Modern Home Furnishing',
          description: 'Transform your space with our curated collection of modern furniture and home decor from top designers.',
          features: ['Designer Collections', 'Quality Materials', 'Custom Options', 'White Glove Delivery']
        };
      case 'Beverage':
        return {
          title: 'Premium Drinks & Beverages',
          description: 'Indulge in our selection of premium beverages, from fine wines to artisanal coffee and craft spirits.',
          features: ['Curated Selection', 'Rare Finds', 'Expert Recommendations', 'Temperature Controlled Shipping']
        };
      default:
        return {
          title: 'Premium Products',
          description: 'Discover our curated selection of premium products.',
          features: ['Quality Guaranteed', 'Fast Shipping', 'Expert Support', 'Miles Rewards']
        };
    }
  };

  const categoryInfo = getCategoryDescription(categoryName);

  return (
    <>
      <div className={`min-h-screen transition-colors ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Category Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className={`p-8 rounded-xl border ${categoryColors.bg} ${categoryColors.border} relative overflow-hidden ${
                  categoryName === 'Flights' ? 'min-h-[300px]' : ''
                }`}>
                  <div className="relative z-10">
                    <h1 className={`text-4xl font-bold mb-4 ${categoryColors.text}`}>
                      {categoryInfo.title}
                    </h1>
                    <p className={`text-lg mb-6 ${categoryColors.text} opacity-90`}>
                      {categoryInfo.description}
                    </p>
                    
                    {/* Features Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {categoryInfo.features.map((feature, index) => (
                        <div key={index} className={`flex items-center gap-2 ${categoryColors.text} opacity-80`}>
                          <div className={`w-2 h-2 rounded-full ${categoryColors.text.replace('text-', 'bg-')} opacity-60`} />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`text-sm ${categoryColors.text} opacity-70`}>
                      {filteredProducts.length} products available • Earn miles with every purchase
                    </div>
                  </div>
                  
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
                    {categoryName === 'Travel' ? (
                      <div className="w-full h-full">
                        {/* Subtle cloud-like shapes for travel */}
                        <div className="absolute top-8 right-8 w-32 h-16 bg-white/30 rounded-full blur-sm" />
                        <div className="absolute top-16 right-16 w-24 h-12 bg-white/20 rounded-full blur-sm" />
                        <div className="absolute top-24 right-4 w-20 h-10 bg-white/25 rounded-full blur-sm" />
                      </div>
                    ) : (
                      <div className={`w-full h-full rounded-full ${categoryColors.text.replace('text-', 'bg-')} transform translate-x-32 -translate-y-32`} />
                    )}
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
                  placeholder={`Search ${categoryName === 'Travel' ? 'flights & hotels' : categoryName.toLowerCase()}...`}
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
                    <option value="low">Under $100</option>
                    <option value="mid">$100 - $1,000</option>
                    <option value="high">Over $1,000</option>
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
                  <div className="text-6xl mb-4">🛍️</div>
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p>Try browsing other categories or add some products!</p>
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