import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { CartPage } from './pages/CartPage';
import { AccountPage } from './pages/AccountPage';
import { useTheme } from './hooks/useTheme';

function App() {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
            {/* Loading Spinner */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              <span className="text-4xl font-black tracking-wide mb-6 text-white animate-pulse select-none">
                Toonga
              </span>
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          )}
        </AnimatePresence>
            {/* Curtain Animation */}
        {!loading && !animationDone && (
          <div className="absolute inset-0 z-40 flex">
            <motion.div
              className="bg-gray-900 w-1/2 h-full"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className="bg-gray-950 w-1/2 h-full"
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{ duration: 1 }}
              onAnimationComplete={() => setAnimationDone(true)}
            />
          </div>)}{/* Page Content */}
        {animationDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >  
    <Router>
      <div className={`min-h-screen transition-colors ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/flights" element={<CategoryPage />} />
            <Route path="/electronics" element={<CategoryPage />} />
            <Route path="/hotels" element={<CategoryPage />} />
            <Route path="/cars" element={<CategoryPage />} />
            <Route path="/furniture" element={<CategoryPage />} />
            <Route path="/beverage" element={<CategoryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;