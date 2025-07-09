import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, User, Bonus, CartItem, Order } from '../types';
import { demoProducts, bonusRewards } from '../data/demoData';

interface StoreState {
  products: Product[];
  user: User;
  bonuses: Bonus[];
  cart: CartItem[];
  orders: Order[];
  activeDiscount: number;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  purchaseProduct: (productId: string) => void;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => void;
  redeemBonus: (bonusId: string) => void;
  clearDiscount: () => void;
  addMiles: (miles: number) => void;
  getCartTotal: () => { totalAmount: number; totalMiles: number; totalItems: number };
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
      cart: [],
      orders: [],
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

      addToCart: (productId, quantity = 1) => {
        const state = get();
        const product = state.products.find(p => p.id === productId);
        if (!product || product.status === 'Out of Stock') return;

        const existingItem = state.cart.find(item => item.productId === productId);
        
        if (existingItem) {
          // Update quantity if item already exists
          set((state) => ({
            cart: state.cart.map(item =>
              item.productId === productId
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                    total: (item.quantity + quantity) * item.amount
                  }
                : item
            )
          }));
        } else {
          // Add new item to cart
          const cartItem: CartItem = {
            productId: product.id,
            name: product.name,
            amount: product.amount,
            quantity,
            total: product.amount * quantity,
            miles: product.miles * quantity,
            image: product.image,
            category: product.category
          };
          
          set((state) => ({
            cart: [...state.cart, cartItem]
          }));
        }
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter(item => item.productId !== productId)
        }));
      },

      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set((state) => ({
          cart: state.cart.map(item =>
            item.productId === productId
              ? {
                  ...item,
                  quantity,
                  total: quantity * item.amount,
                  miles: (item.miles / item.quantity) * quantity
                }
              : item
          )
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      checkout: () => {
        const state = get();
        if (state.cart.length === 0) return;

        const { totalAmount, totalMiles } = state.getCartTotal();
        const discountAmount = (totalAmount * state.activeDiscount) / 100;
        const finalAmount = totalAmount - discountAmount;
        const finalMiles = Math.floor(totalMiles * (1 + state.activeDiscount / 100));

        const newOrder: Order = {
          id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          items: [...state.cart],
          totalAmount: finalAmount,
          totalMiles: finalMiles,
          date: new Date().toISOString(),
          status: 'completed'
        };

        // Update product orders count
        const productUpdates: { [key: string]: number } = {};
        state.cart.forEach(item => {
          productUpdates[item.productId] = (productUpdates[item.productId] || 0) + item.quantity;
        });

        set((state) => ({
          orders: [newOrder, ...state.orders],
          user: {
            ...state.user,
            miles: state.user.miles + finalMiles
          },
          products: state.products.map(product => ({
            ...product,
            orders: product.orders + (productUpdates[product.id] || 0)
          })),
          cart: [],
          activeDiscount: 0
        }));
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
      },

      getCartTotal: () => {
        const state = get();
        const totalAmount = state.cart.reduce((sum, item) => sum + item.total, 0);
        const totalMiles = state.cart.reduce((sum, item) => sum + item.miles, 0);
        const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        return { totalAmount, totalMiles, totalItems };
      }
    }),
    {
      name: 'miles-shop-storage',
      partialize: (state) => ({
        products: state.products,
        user: state.user,
        cart: state.cart,
        orders: state.orders,
        activeDiscount: state.activeDiscount
      })
    }
  )
);