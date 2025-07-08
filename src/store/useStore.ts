import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, User, Bonus } from '../types';
import { demoProducts, bonusRewards } from '../data/demoData';

interface StoreState {
  products: Product[];
  user: User;
  bonuses: Bonus[];
  activeDiscount: number;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  purchaseProduct: (productId: string) => void;
  redeemBonus: (bonusId: string) => void;
  clearDiscount: () => void;
  addMiles: (miles: number) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: demoProducts,
      user: {
        id: 'user-1',
        name: 'John Doe',
        miles: 1250
      },
      bonuses: bonusRewards,
      activeDiscount: 0,
      
      addProduct: (product) => {
        const newProduct: Product = {
          ...product,
          id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
        set((state) => ({
          products: [...state.products, newProduct]
        }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map(product =>
            product.id === id ? { ...product, ...updates } : product
          )
        }));
      },

      purchaseProduct: (productId) => {
        const state = get();
        const product = state.products.find(p => p.id === productId);
        if (!product || product.status === 'Out of Stock') return;

        // Calculate final price with discount
        const discountAmount = (product.amount * state.activeDiscount) / 100;
        const finalPrice = product.amount - discountAmount;

        // Update product orders
        set((state) => ({
          products: state.products.map(p =>
            p.id === productId
              ? { ...p, orders: p.orders + 1 }
              : p
          ),
          user: {
            ...state.user,
            miles: state.user.miles + product.miles
          },
          activeDiscount: 0 // Clear discount after use
        }));
        
        // Show success feedback (you can add toast notifications here)
        console.log(`Purchased ${product.name} and earned ${product.miles} miles!`);
      },

      redeemBonus: (bonusId) => {
        const state = get();
        const bonus = state.bonuses.find(b => b.id === bonusId);
        if (!bonus || state.user.miles < bonus.milesRequired || state.activeDiscount > 0) return;

        set((state) => ({
          user: {
            ...state.user,
            miles: state.user.miles - bonus.milesRequired
          },
          activeDiscount: bonus.discount
        }));
        
        // Show success feedback
        console.log(`Redeemed ${bonus.name} for ${bonus.milesRequired} miles!`);
      },

      clearDiscount: () => {
        set({ activeDiscount: 0 });
      },

      addMiles: (miles) => {
        set((state) => ({
          user: {
            ...state.user,
            miles: state.user.miles + miles
          }
        }));
      }
    }),
    {
      name: 'miles-shop-storage',
      partialize: (state) => ({
        products: state.products,
        user: state.user,
        activeDiscount: state.activeDiscount
      })
    }
  )
);