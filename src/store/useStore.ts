import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import i18n from '../i18n';
import { Product, User, Bonus, CartItem, Order } from '../types';
import { demoProducts, bonusRewards } from '../data/demoData';

interface StoreState {
  products: Product[];
  user: User;
  isAdminAuthenticated: boolean;
  bonuses: Bonus[];
  cart: CartItem[];
  orders: Order[];
  activeDiscount: number;
  registerUser: (userData: { name: string; email: string; password: string }) => boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
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
      isAdminAuthenticated: false,
      bonuses: bonusRewards,
      cart: [],
      orders: [],
      activeDiscount: 0,
      

      registerUser: (userData) => {
        // Simple registration - in production, use proper authentication
        // Check if email already exists (mock check)
        if (userData.email === 'existing@example.com') {
          toast.error(i18n.t('notifications.emailExists'));
          return false;
        }
        
        // In a real app, you would send this to your backend
        toast.success(i18n.t('notifications.welcome', { name: userData.name }));
        return true;
      },

      adminLogin: (password) => {
        // Simple password check - in production, use proper authentication
        if (password === 'admin123') {
          set({ isAdminAuthenticated: true });
          toast.success(i18n.t('notifications.adminLoginSuccess'));
          return true;
        }
        toast.error(i18n.t('notifications.adminLoginError'));
        return false;
      },

      adminLogout: () => {
        set({ isAdminAuthenticated: false });
        toast.info(i18n.t('notifications.adminLogout'));
      },

      addProduct: (product) => {
        const newProduct: Product = {
          ...product,
          id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
        set((state) => ({
          products: [...state.products, newProduct]
        }));
        toast.success(i18n.t('notifications.productAdded', { name: product.name }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map(product =>
            product.id === id ? { ...product, ...updates } : product
          )
        }));
        toast.success(i18n.t('notifications.productUpdated'));
      },

      deleteProduct: (id) => {
        const state = get();
        const product = state.products.find(p => p.id === id);
        set((state) => ({
          products: state.products.filter(product => product.id !== id)
        }));
        if (product) {
          toast.success(i18n.t('notifications.productDeleted', { name: product.name }));
        }
      },

      purchaseProduct: (productId) => {
        const state = get();
        const product = state.products.find(p => p.id === productId);
        if (!product || product.status === 'Out of Stock') {
          toast.error(i18n.t('notifications.productNotAvailable'));
          return;
        }

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
        
        toast.success(i18n.t('notifications.purchased', { name: product.name, miles: product.miles }), {
          description: i18n.t('notifications.purchasedDescription', { amount: finalPrice.toLocaleString() })
        });
      },

      addToCart: (productId, quantity = 1) => {
        const state = get();
        const product = state.products.find(p => p.id === productId);
        if (!product || product.status === 'Out of Stock') {
          toast.error(i18n.t('notifications.productNotAvailableCart'));
          return;
        }

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
          toast.success(i18n.t('notifications.updatedCartQuantity', { name: product.name }));
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
          toast.success(i18n.t('notifications.addedToCart', { name: product.name }), {
            description: i18n.t(`notifications.addedToCartDescription${quantity > 1 ? '_plural' : ''}`, { count: quantity })
          });
        }
      },

      removeFromCart: (productId) => {
        const state = get();
        const item = state.cart.find(item => item.productId === productId);
        set((state) => ({
          cart: state.cart.filter(item => item.productId !== productId)
        }));
        if (item) {
          toast.info(i18n.t('notifications.removedFromCart', { name: item.name }));
        }
      },

      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        const state = get();
        const item = state.cart.find(item => item.productId === productId);
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
        if (item) {
          toast.info(i18n.t('notifications.updatedQuantity', { name: item.name, quantity }));
        }
      },

      clearCart: () => {
        set({ cart: [] });
        toast.info(i18n.t('notifications.cartCleared'));
      },

      checkout: () => {
        const state = get();
        if (state.cart.length === 0) {
          toast.error(i18n.t('notifications.cartEmpty'));
          return;
        }

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
        toast.success(i18n.t('notifications.orderSuccess'), {
          description: i18n.t('notifications.orderSuccessDescription', { orderId: newOrder.id.slice(-8), miles: finalMiles })
        });
      },

      redeemBonus: (bonusId) => {
        const state = get();
        const bonus = state.bonuses.find(b => b.id === bonusId);
        if (!bonus || state.user.miles < bonus.milesRequired) {
          toast.error(i18n.t('notifications.notEnoughMiles'));
          return;
        }
        if (state.activeDiscount > 0) {
          toast.error(i18n.t('notifications.activeDiscountExists'));
          return;
        }

        set((state) => ({
          user: {
            ...state.user,
            miles: state.user.miles - bonus.milesRequired
          },
          activeDiscount: bonus.discount
        }));
        
        toast.success(i18n.t('notifications.bonusRedeemed', { name: bonus.name }), {
          description: i18n.t('notifications.bonusRedeemedDescription', { miles: bonus.milesRequired, discount: bonus.discount })
        });
      },

      clearDiscount: () => {
        set({ activeDiscount: 0 });
        toast.info(i18n.t('notifications.discountCleared'));
      },

      addMiles: (miles) => {
        set((state) => ({
          user: {
            ...state.user,
            miles: state.user.miles + miles
          }
        }));
        toast.success(i18n.t('notifications.milesAdded', { miles }));
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
        isAdminAuthenticated: state.isAdminAuthenticated,
        cart: state.cart,
        orders: state.orders,
        activeDiscount: state.activeDiscount
      })
    }
  )
);