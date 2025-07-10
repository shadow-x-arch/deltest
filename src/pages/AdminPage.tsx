import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Plus, 
  TrendingUp, 
  ShoppingBag, 
  Award,
  Package,
  DollarSign,
  LogOut,
  Plane,
  Smartphone,
  Hotel,
  Car,
  Sofa,
  Coffee
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';
import { Product } from '../types';
import { AdminLogin } from '../components/AdminLogin';
import { ProductTable } from '../components/ProductTable';
import { ProductForm } from '../components/ProductForm';

const categories = [
  { name: 'All Products', value: undefined, icon: Package, color: 'from-gray-500 to-gray-600' },
  { name: 'Flights', value: 'Flights' as const, icon: Plane, color: 'from-blue-500 to-blue-600' },
  { name: 'Electronics', value: 'Electronics' as const, icon: Smartphone, color: 'from-purple-500 to-purple-600' },
  { name: 'Hotels', value: 'Hotels' as const, icon: Hotel, color: 'from-emerald-500 to-emerald-600' },
  { name: 'Cars', value: 'Cars' as const, icon: Car, color: 'from-red-500 to-red-600' },
  { name: 'Furniture', value: 'Furniture' as const, icon: Sofa, color: 'from-amber-500 to-amber-600' },
  { name: 'Beverage', value: 'Beverage' as const, icon: Coffee, color: 'from-pink-500 to-pink-600' },
];

export const AdminPage: React.FC = () => {
  const { 
    products, 
    orders, 
    isAdminAuthenticated, 
    adminLogout,
    updateProduct,
    deleteProduct
  } = useStore();
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<Product['category'] | undefined>(undefined);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // If not authenticated, show login
  if (!isAdminAuthenticated) {
    return <AdminLogin onLogin={() => {}} />;
  }

  // Analytics calculations
  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalMilesIssued = orders.reduce((sum, order) => sum + order.totalMiles, 0);
  const totalOrders = orders.length;
  
  const productSales = products.map(product => ({
    ...product,
    totalSold: orders.reduce((sum, order) => 
      sum + order.items.filter(item => item.productId === product.id)
        .reduce((itemSum, item) => itemSum + item.quantity, 0), 0
    )
  })).sort((a, b) => b.totalSold - a.totalSold);

  const mostSoldProduct = productSales[0];

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleLogout = () => {
    adminLogout();
  };

  const getCategoryStats = (category?: Product['category']) => {
    const categoryProducts = category 
      ? products.filter(p => p.category === category)
      : products;
    
    return {
      count: categoryProducts.length,
      totalValue: categoryProducts.reduce((sum, p) => sum + p.amount, 0),
      avgRating: categoryProducts.reduce((sum, p) => sum + p.rate, 0) / categoryProducts.length || 0
    };
  };

  return (
    <>
      <div className={`min-h-screen transition-colors ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className={`text-3xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Admin Dashboard
                  </h1>
                  <p className={`text-lg ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Manage products, orders, and analytics
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
                
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>

          {/* Analytics Cards */}
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
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Total Sales
                </span>
              </div>
              <p className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                ${totalSales.toLocaleString()}
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
                <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                  <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Miles Issued
                </span>
              </div>
              <p className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {totalMilesIssued.toLocaleString()}
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
                  <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Total Products
                </span>
              </div>
              <p className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {products.length}
              </p>
            </motion.div>
          </div>

          {/* Best Selling Product */}
          {mostSoldProduct && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`p-6 rounded-xl border mb-8 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Best Selling Product
                </h2>
              </div>
              <div className="flex items-center gap-4">
                {mostSoldProduct.image && (
                  <img
                    src={mostSoldProduct.image}
                    alt={mostSoldProduct.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h3 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {mostSoldProduct.name}
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {mostSoldProduct.totalSold} units sold • ${mostSoldProduct.amount}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.value;
                const stats = getCategoryStats(category.value);
                
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : isDarkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{category.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {stats.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Product Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`p-6 rounded-xl border ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
                </h2>
                {selectedCategory && (
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {getCategoryStats(selectedCategory).count} products
                    </span>
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Avg. Rating: {getCategoryStats(selectedCategory).avgRating.toFixed(1)}
                    </span>
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Value: ${getCategoryStats(selectedCategory).totalValue.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <ProductTable
              products={products}
              category={selectedCategory}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </motion.div>
        </div>
      </div>

      <ProductForm 
        isOpen={showAddForm} 
        onClose={() => {
          setShowAddForm(false);
          setEditingProduct(null);
        }}
        editingProduct={editingProduct}
      />
    </>
  );
};