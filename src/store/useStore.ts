import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { Product, User, Bonus, CartItem, Order } from '../types';
import { demoProducts, bonusRewards } from '../data/demoData';

interface StoreState {
  products: Product[];
  user: User;
  language: string;
  isAdminAuthenticated: boolean;
  bonuses: Bonus[];
  cart: CartItem[];
  orders: Order[];
  activeDiscount: number;
  setLanguage: (language: string) => void;
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
      language: 'en',
      isAdminAuthenticated: false,
      bonuses: bonusRewards,
      cart: [],
      orders: [],
      activeDiscount: 0,
      
      setLanguage: (language) => {
        set({ language });
      },

      registerUser: (userData) => {
        // Simple registration - in production, use proper authentication
        // Check if email already exists (mock check)
        if (userData.email === 'existing@example.com') {
          toast.error('Email already exists');
          return false;
        }
        
        // In a real app, you would send this to your backend
        toast.success(`Welcome ${userData.name}! Your account has been created successfully.`);
        return true;
      },

      adminLogin: (password) => {
        // Simple password check - in production, use proper authentication
        if (password === 'admin123') {
          set({ isAdminAuthenticated: true });
          toast.success('Admin login successful');
          return true;
        }
        toast.error('Invalid admin password');
        return false;
      },

      adminLogout: () => {
        set({ isAdminAuthenticated: false });
        toast.info('Admin logged out successfully');
      },

      addProduct: (product) => {
        const newProduct: Product = {
          ...product,
          id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
        set((state) => ({
          products: [...state.products, newProduct]
        }));
        toast.success(`Product "${product.name}" added successfully`);
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map(product =>
            product.id === id ? { ...product, ...updates } : product
          )
        }));
        toast.success('Product updated successfully');
      },

      deleteProduct: (id) => {
        const state = get();
        const product = state.products.find(p => p.id === id);
        set((state) => ({
          products: state.products.filter(product => product.id !== id)
        }));
        if (product) {
          toast.success(`Product "${product.name}" deleted successfully`);
        }
      },

      purchaseProduct: (productId) => {
        const state = get();
        const product = state.products.find(p => p.id === productId);
        if (!product || product.status === 'Out of Stock') {
          toast.error('Product is not available for purchase');
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
        
        toast.success(`🎉 Purchased ${product.name} and earned ${product.miles} miles!`, {
          description: `Total spent: $${finalPrice.toLocaleString()}`
        });
      },

      addToCart: (productId, quantity = 1) => {
        const state = get();
        const product = state.products.find(p => p.id === productId);
        if (!product || product.status === 'Out of Stock') {
          toast.error('Product is not available');
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
          toast.success(`Updated ${product.name} quantity in cart`);
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
          toast.success(`Added ${product.name} to cart`, {
            description: `${quantity} item${quantity > 1 ? 's' : ''} added`
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
          toast.info(`Removed ${item.name} from cart`);
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
          toast.info(`Updated ${item.name} quantity to ${quantity}`);
        }
      },

      clearCart: () => {
        set({ cart: [] });
        toast.info('Cart cleared');
      },

      checkout: () => {
        const state = get();
        if (state.cart.length === 0) {
          toast.error('Your cart is empty');
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
      },
        toast.success('🎉 Order placed successfully!', {
          description: `Order #${newOrder.id.slice(-8)} • Earned ${finalMiles} miles`
        });

      redeemBonus: (bonusId) => {
        const state = get();
        const bonus = state.bonuses.find(b => b.id === bonusId);
        if (!bonus || state.user.miles < bonus.milesRequired) {
          toast.error('Not enough miles to redeem this bonus');
          return;
        }
        if (state.activeDiscount > 0) {
          toast.error('You already have an active discount');
          return;
        }

        set((state) => ({
          user: {
            ...state.user,
            miles: state.user.miles - bonus.milesRequired
          },
          activeDiscount: bonus.discount
        }));
        
        toast.success(`🎁 Redeemed ${bonus.name}!`, {
          description: `Used ${bonus.milesRequired} miles • ${bonus.discount}% discount applied`
        });
      },

      clearDiscount: () => {
        set({ activeDiscount: 0 });
        toast.info('Discount cleared');
      },

      addMiles: (miles) => {
        set((state) => ({
          user: {
            ...state.user,
            miles: state.user.miles + miles
          }
        }));
        toast.success(`+${miles} miles added to your account!`);
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
        language: state.language,
        isAdminAuthenticated: state.isAdminAuthenticated,
        cart: state.cart,
        orders: state.orders,
        activeDiscount: state.activeDiscount
      })
    }
  )
);