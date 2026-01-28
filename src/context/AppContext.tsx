import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, MenuItem, Addon, Address, Order } from '@/data/mockData';

// App State Types
interface AppState {
  // User
  userRole: 'customer' | 'restaurant' | 'delivery';
  
  // Cart
  cart: CartItem[];
  cartRestaurantId: string | null;
  
  // Selected address
  selectedAddress: Address | null;
  
  // Active order for tracking
  activeOrder: Order | null;
  
  // Restaurant dashboard (for restaurant role)
  restaurantIsOpen: boolean;
  
  // Delivery partner (for delivery role)
  isDeliveryOnline: boolean;
}

type AppAction =
  | { type: 'SET_USER_ROLE'; payload: 'customer' | 'restaurant' | 'delivery' }
  | { type: 'ADD_TO_CART'; payload: { item: MenuItem; quantity: number; addons: Addon[] } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_SELECTED_ADDRESS'; payload: Address }
  | { type: 'SET_ACTIVE_ORDER'; payload: Order | null }
  | { type: 'UPDATE_ORDER_STATUS'; payload: Order['status'] }
  | { type: 'TOGGLE_RESTAURANT_STATUS' }
  | { type: 'TOGGLE_DELIVERY_STATUS' };

const initialState: AppState = {
  userRole: 'customer',
  cart: [],
  cartRestaurantId: null,
  selectedAddress: null,
  activeOrder: null,
  restaurantIsOpen: true,
  isDeliveryOnline: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER_ROLE':
      return { ...state, userRole: action.payload };
    
    case 'ADD_TO_CART': {
      const { item, quantity, addons } = action.payload;
      
      // Check if switching restaurants
      if (state.cartRestaurantId && state.cartRestaurantId !== item.restaurantId) {
        // Clear cart and add new item
        return {
          ...state,
          cart: [{ menuItem: item, quantity, selectedAddons: addons }],
          cartRestaurantId: item.restaurantId,
        };
      }
      
      // Check if item already in cart
      const existingIndex = state.cart.findIndex(
        (ci) => ci.menuItem.id === item.id && 
          JSON.stringify(ci.selectedAddons) === JSON.stringify(addons)
      );
      
      if (existingIndex >= 0) {
        const newCart = [...state.cart];
        newCart[existingIndex].quantity += quantity;
        return { ...state, cart: newCart };
      }
      
      return {
        ...state,
        cart: [...state.cart, { menuItem: item, quantity, selectedAddons: addons }],
        cartRestaurantId: item.restaurantId,
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const newCart = state.cart.filter((ci) => ci.menuItem.id !== action.payload);
      return {
        ...state,
        cart: newCart,
        cartRestaurantId: newCart.length > 0 ? state.cartRestaurantId : null,
      };
    }
    
    case 'UPDATE_CART_QUANTITY': {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        return appReducer(state, { type: 'REMOVE_FROM_CART', payload: itemId });
      }
      const newCart = state.cart.map((ci) =>
        ci.menuItem.id === itemId ? { ...ci, quantity } : ci
      );
      return { ...state, cart: newCart };
    }
    
    case 'CLEAR_CART':
      return { ...state, cart: [], cartRestaurantId: null };
    
    case 'SET_SELECTED_ADDRESS':
      return { ...state, selectedAddress: action.payload };
    
    case 'SET_ACTIVE_ORDER':
      return { ...state, activeOrder: action.payload };
    
    case 'UPDATE_ORDER_STATUS':
      if (!state.activeOrder) return state;
      return {
        ...state,
        activeOrder: { ...state.activeOrder, status: action.payload },
      };
    
    case 'TOGGLE_RESTAURANT_STATUS':
      return { ...state, restaurantIsOpen: !state.restaurantIsOpen };
    
    case 'TOGGLE_DELIVERY_STATUS':
      return { ...state, isDeliveryOnline: !state.isDeliveryOnline };
    
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Computed values
  cartTotal: number;
  cartItemCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Computed values
  const cartTotal = state.cart.reduce((total, item) => {
    const addonsTotal = item.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return total + (item.menuItem.price + addonsTotal) * item.quantity;
  }, 0);
  
  const cartItemCount = state.cart.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <AppContext.Provider value={{ state, dispatch, cartTotal, cartItemCount }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
