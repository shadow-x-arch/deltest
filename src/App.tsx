import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { TravelLandingPage } from './pages/TravelLandingPage';
import { FlightsPage } from './pages/FlightsPage';
import { HotelsPage } from './pages/HotelsPage';
import { HouseFurnitureLandingPage } from './pages/HouseFurnitureLandingPage';
import { HouseRentPage } from './pages/HouseRentPage';
import { HouseSalePage } from './pages/HouseSalePage';
import { FurniturePage } from './pages/FurniturePage';
import { ElectronicsLandingPage } from './pages/ElectronicsLandingPage';
import { SmartphonesPage } from './pages/SmartphonesPage';
import { LaptopsPage } from './pages/LaptopsPage';
import { GadgetsPage } from './pages/GadgetsPage';
import { CarsLandingPage } from './pages/CarsLandingPage';
import { LuxuryCarsPage } from './pages/LuxuryCarsPage';
import { ElectricCarsPage } from './pages/ElectricCarsPage';
import { CarRentalPage } from './pages/CarRentalPage';
import { BeverageLandingPage } from './pages/BeverageLandingPage';
import { CategoryPage } from './pages/CategoryPage';
import { CartPage } from './pages/CartPage';
import { AccountPage } from './pages/AccountPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { ContactPage } from './pages/ContactPage';
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
    <Router>
      <div className={`min-h-screen transition-colors ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/travel" element={<TravelLandingPage />} />
            <Route path="/travel/flights" element={<FlightsPage />} />
            <Route path="/travel/hotels" element={<HotelsPage />} />
            <Route path="/house-furniture" element={<HouseFurnitureLandingPage />} />
            <Route path="/house-furniture/rent" element={<HouseRentPage />} />
            <Route path="/house-furniture/sale" element={<HouseSalePage />} />
            <Route path="/house-furniture/furniture" element={<FurniturePage />} />
            <Route path="/electronics" element={<ElectronicsLandingPage />} />
            <Route path="/electronics/smartphones" element={<SmartphonesPage />} />
            <Route path="/electronics/laptops" element={<LaptopsPage />} />
            <Route path="/electronics/gadgets" element={<GadgetsPage />} />
            <Route path="/cars" element={<CarsLandingPage />} />
            <Route path="/cars/luxury" element={<LuxuryCarsPage />} />
            <Route path="/cars/electric" element={<ElectricCarsPage />} />
            <Route path="/cars/rental" element={<CarRentalPage />} />
            <Route path="/beverage" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Toaster 
          position="top-right"
          richColors
          closeButton
          theme={isDarkMode ? 'dark' : 'light'}
        />
      </div>
    </Router>
  );
}

export default App;