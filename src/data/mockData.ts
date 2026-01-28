// Mock Data for FoodFlow Platform

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  distance: string;
  priceRange: 1 | 2 | 3;
  isOpen: boolean;
  offers: string[];
  featured: boolean;
  address: string;
  phone: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isBestseller: boolean;
  isAvailable: boolean;
  addons?: Addon[];
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedAddons: Addon[];
  specialInstructions?: string;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  label: string;
  full: string;
  lat: number;
  lng: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  status: 'placed' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'out_for_delivery' | 'delivered' | 'cancelled';
  total: number;
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  address: Address;
  paymentMethod: string;
  placedAt: Date;
  estimatedDelivery: Date;
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  deliveryPartnerPhone?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  favorites: string[];
}

export interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  rating: number;
  totalDeliveries: number;
  isOnline: boolean;
  currentOrderId?: string;
  earnings: {
    today: number;
    week: number;
    month: number;
  };
  vehicle: string;
}

// Cuisine categories
export const cuisineCategories = [
  { id: 'pizza', name: 'Pizza', icon: '🍕', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop' },
  { id: 'burger', name: 'Burgers', icon: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
  { id: 'biryani', name: 'Biryani', icon: '🍚', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop' },
  { id: 'chinese', name: 'Chinese', icon: '🥡', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&h=200&fit=crop' },
  { id: 'indian', name: 'North Indian', icon: '🍛', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop' },
  { id: 'south', name: 'South Indian', icon: '🥘', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200&h=200&fit=crop' },
  { id: 'dessert', name: 'Desserts', icon: '🍰', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop' },
  { id: 'healthy', name: 'Healthy', icon: '🥗', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop' },
];

// Mock restaurants
export const restaurants: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Pizza Paradise',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop',
    cuisine: ['Pizza', 'Italian', 'Fast Food'],
    rating: 4.5,
    reviewCount: 1250,
    deliveryTime: '25-30 min',
    deliveryFee: 30,
    minOrder: 199,
    distance: '2.5 km',
    priceRange: 2,
    isOpen: true,
    offers: ['50% off up to ₹100', 'Free delivery'],
    featured: true,
    address: '123 Food Street, Downtown',
    phone: '+91 9876543210',
  },
  {
    id: 'rest-2',
    name: 'Biryani Blues',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=400&fit=crop',
    cuisine: ['Biryani', 'Mughlai', 'North Indian'],
    rating: 4.7,
    reviewCount: 2340,
    deliveryTime: '35-40 min',
    deliveryFee: 25,
    minOrder: 249,
    distance: '3.2 km',
    priceRange: 2,
    isOpen: true,
    offers: ['20% off on first order'],
    featured: true,
    address: '456 Spice Lane, Midtown',
    phone: '+91 9876543211',
  },
  {
    id: 'rest-3',
    name: 'Dragon Wok',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&h=400&fit=crop',
    cuisine: ['Chinese', 'Thai', 'Asian'],
    rating: 4.3,
    reviewCount: 890,
    deliveryTime: '30-35 min',
    deliveryFee: 35,
    minOrder: 199,
    distance: '1.8 km',
    priceRange: 2,
    isOpen: true,
    offers: [],
    featured: false,
    address: '789 Noodle Avenue, Eastside',
    phone: '+91 9876543212',
  },
  {
    id: 'rest-4',
    name: 'Burger Barn',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=400&fit=crop',
    cuisine: ['Burgers', 'American', 'Fast Food'],
    rating: 4.4,
    reviewCount: 1560,
    deliveryTime: '20-25 min',
    deliveryFee: 20,
    minOrder: 149,
    distance: '1.2 km',
    priceRange: 1,
    isOpen: true,
    offers: ['Buy 1 Get 1 Free'],
    featured: true,
    address: '321 Grill Road, Westside',
    phone: '+91 9876543213',
  },
  {
    id: 'rest-5',
    name: 'Dosa Corner',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&h=400&fit=crop',
    cuisine: ['South Indian', 'Breakfast', 'Healthy'],
    rating: 4.6,
    reviewCount: 2100,
    deliveryTime: '25-30 min',
    deliveryFee: 15,
    minOrder: 99,
    distance: '2.0 km',
    priceRange: 1,
    isOpen: true,
    offers: ['₹50 off on orders above ₹300'],
    featured: false,
    address: '555 Temple Street, Southside',
    phone: '+91 9876543214',
  },
  {
    id: 'rest-6',
    name: 'Sweet Tooth Bakery',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=400&fit=crop',
    cuisine: ['Desserts', 'Bakery', 'Cafe'],
    rating: 4.8,
    reviewCount: 780,
    deliveryTime: '30-35 min',
    deliveryFee: 40,
    minOrder: 199,
    distance: '4.0 km',
    priceRange: 3,
    isOpen: true,
    offers: [],
    featured: true,
    address: '888 Sweet Lane, Uptown',
    phone: '+91 9876543215',
  },
  {
    id: 'rest-7',
    name: 'Tandoori Nights',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=400&fit=crop',
    cuisine: ['North Indian', 'Mughlai', 'Kebabs'],
    rating: 4.4,
    reviewCount: 1890,
    deliveryTime: '40-45 min',
    deliveryFee: 30,
    minOrder: 299,
    distance: '3.5 km',
    priceRange: 2,
    isOpen: false,
    offers: ['Flat 30% off'],
    featured: false,
    address: '999 Curry Circle, Northside',
    phone: '+91 9876543216',
  },
  {
    id: 'rest-8',
    name: 'Green Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop',
    cuisine: ['Healthy', 'Salads', 'Bowls'],
    rating: 4.5,
    reviewCount: 560,
    deliveryTime: '20-25 min',
    deliveryFee: 25,
    minOrder: 199,
    distance: '1.5 km',
    priceRange: 2,
    isOpen: true,
    offers: ['Free delivery on first order'],
    featured: false,
    address: '111 Health Avenue, Central',
    phone: '+91 9876543217',
  },
];

// Mock menu items
export const menuItems: MenuItem[] = [
  // Pizza Paradise menu
  {
    id: 'item-1',
    restaurantId: 'rest-1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
    price: 299,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    category: 'Pizzas',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    addons: [
      { id: 'addon-1', name: 'Extra Cheese', price: 50, category: 'Toppings' },
      { id: 'addon-2', name: 'Jalapenos', price: 30, category: 'Toppings' },
      { id: 'addon-3', name: 'Olives', price: 40, category: 'Toppings' },
    ],
  },
  {
    id: 'item-2',
    restaurantId: 'rest-1',
    name: 'Pepperoni Pizza',
    description: 'Loaded with spicy pepperoni and melted cheese',
    price: 399,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    category: 'Pizzas',
    isVeg: false,
    isBestseller: true,
    isAvailable: true,
    addons: [
      { id: 'addon-1', name: 'Extra Cheese', price: 50, category: 'Toppings' },
      { id: 'addon-4', name: 'BBQ Sauce', price: 25, category: 'Sauces' },
    ],
  },
  {
    id: 'item-3',
    restaurantId: 'rest-1',
    name: 'Garlic Bread',
    description: 'Crispy bread with garlic butter and herbs',
    price: 129,
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400&h=300&fit=crop',
    category: 'Sides',
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
  },
  {
    id: 'item-4',
    restaurantId: 'rest-1',
    name: 'Pasta Alfredo',
    description: 'Creamy white sauce pasta with mushrooms',
    price: 249,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop',
    category: 'Pasta',
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
  },
  // Biryani Blues menu
  {
    id: 'item-5',
    restaurantId: 'rest-2',
    name: 'Hyderabadi Chicken Biryani',
    description: 'Aromatic basmati rice with tender chicken and authentic spices',
    price: 349,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    category: 'Biryani',
    isVeg: false,
    isBestseller: true,
    isAvailable: true,
    addons: [
      { id: 'addon-5', name: 'Extra Raita', price: 30, category: 'Sides' },
      { id: 'addon-6', name: 'Egg', price: 20, category: 'Add-ons' },
    ],
  },
  {
    id: 'item-6',
    restaurantId: 'rest-2',
    name: 'Veg Dum Biryani',
    description: 'Mixed vegetables cooked with fragrant rice',
    price: 249,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop',
    category: 'Biryani',
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
  },
  {
    id: 'item-7',
    restaurantId: 'rest-2',
    name: 'Chicken Kebab',
    description: 'Juicy grilled chicken kebabs with mint chutney',
    price: 199,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    category: 'Starters',
    isVeg: false,
    isBestseller: true,
    isAvailable: true,
  },
  // Burger Barn menu
  {
    id: 'item-8',
    restaurantId: 'rest-4',
    name: 'Classic Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce',
    price: 199,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'Burgers',
    isVeg: false,
    isBestseller: true,
    isAvailable: true,
    addons: [
      { id: 'addon-7', name: 'Extra Patty', price: 80, category: 'Add-ons' },
      { id: 'addon-8', name: 'Cheese Slice', price: 30, category: 'Add-ons' },
      { id: 'addon-9', name: 'Bacon', price: 50, category: 'Add-ons' },
    ],
  },
  {
    id: 'item-9',
    restaurantId: 'rest-4',
    name: 'Crispy Chicken Burger',
    description: 'Crispy fried chicken with coleslaw and mayo',
    price: 179,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop',
    category: 'Burgers',
    isVeg: false,
    isBestseller: false,
    isAvailable: true,
  },
  {
    id: 'item-10',
    restaurantId: 'rest-4',
    name: 'Loaded Fries',
    description: 'Crispy fries topped with cheese and jalapenos',
    price: 129,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    category: 'Sides',
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
  },
  // Dosa Corner menu
  {
    id: 'item-11',
    restaurantId: 'rest-5',
    name: 'Masala Dosa',
    description: 'Crispy crepe with spiced potato filling',
    price: 99,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop',
    category: 'Dosas',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
  },
  {
    id: 'item-12',
    restaurantId: 'rest-5',
    name: 'Idli Sambar',
    description: 'Steamed rice cakes with lentil soup',
    price: 79,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
    category: 'Breakfast',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
  },
  // Sweet Tooth Bakery menu
  {
    id: 'item-13',
    restaurantId: 'rest-6',
    name: 'Chocolate Truffle Cake',
    description: 'Rich chocolate cake with ganache frosting',
    price: 499,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    category: 'Cakes',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
  },
  {
    id: 'item-14',
    restaurantId: 'rest-6',
    name: 'Red Velvet Cupcake',
    description: 'Moist red velvet with cream cheese frosting',
    price: 129,
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=300&fit=crop',
    category: 'Cupcakes',
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
  },
];

// Promotional banners
export const promoBanners = [
  {
    id: 'promo-1',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=300&fit=crop',
    title: '50% OFF on First Order',
    subtitle: 'Use code: WELCOME50',
    bgColor: 'from-primary to-secondary',
  },
  {
    id: 'promo-2',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=300&fit=crop',
    title: 'Free Delivery Weekend',
    subtitle: 'No minimum order required',
    bgColor: 'from-success to-emerald-600',
  },
  {
    id: 'promo-3',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=300&fit=crop',
    title: 'Dessert Festival',
    subtitle: 'Buy 2 Get 1 Free',
    bgColor: 'from-pink-500 to-rose-500',
  },
];

// Mock user
export const currentUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 9876543210',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  addresses: [
    {
      id: 'addr-1',
      type: 'home',
      label: 'Home',
      full: '123 Main Street, Apartment 4B, Downtown, City 123456',
      lat: 12.9716,
      lng: 77.5946,
    },
    {
      id: 'addr-2',
      type: 'work',
      label: 'Work',
      full: '456 Office Park, Tower A, 5th Floor, Business District, City 123457',
      lat: 12.9816,
      lng: 77.6046,
    },
  ],
  favorites: ['rest-1', 'rest-2', 'rest-6'],
};

// Mock orders
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    restaurantId: 'rest-1',
    restaurantName: 'Pizza Paradise',
    items: [
      {
        menuItem: menuItems[0],
        quantity: 2,
        selectedAddons: [{ id: 'addon-1', name: 'Extra Cheese', price: 50, category: 'Toppings' }],
      },
      {
        menuItem: menuItems[2],
        quantity: 1,
        selectedAddons: [],
      },
    ],
    status: 'out_for_delivery',
    subtotal: 727,
    deliveryFee: 30,
    taxes: 36,
    discount: 100,
    total: 693,
    address: currentUser.addresses[0],
    paymentMethod: 'UPI',
    placedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
    estimatedDelivery: new Date(Date.now() + 10 * 60 * 1000), // 10 mins from now
    deliveryPartnerId: 'dp-1',
    deliveryPartnerName: 'Rahul Kumar',
    deliveryPartnerPhone: '+91 9876543220',
  },
  {
    id: 'order-2',
    restaurantId: 'rest-2',
    restaurantName: 'Biryani Blues',
    items: [
      {
        menuItem: menuItems[4],
        quantity: 1,
        selectedAddons: [],
      },
    ],
    status: 'delivered',
    subtotal: 349,
    deliveryFee: 25,
    taxes: 17,
    discount: 70,
    total: 321,
    address: currentUser.addresses[0],
    paymentMethod: 'Card',
    placedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    estimatedDelivery: new Date(Date.now() - 23 * 60 * 60 * 1000),
  },
  {
    id: 'order-3',
    restaurantId: 'rest-4',
    restaurantName: 'Burger Barn',
    items: [
      {
        menuItem: menuItems[7],
        quantity: 2,
        selectedAddons: [{ id: 'addon-8', name: 'Cheese Slice', price: 30, category: 'Add-ons' }],
      },
    ],
    status: 'delivered',
    subtotal: 458,
    deliveryFee: 20,
    taxes: 23,
    discount: 0,
    total: 501,
    address: currentUser.addresses[1],
    paymentMethod: 'Cash',
    placedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    estimatedDelivery: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 40 * 60 * 1000),
  },
];

// Mock delivery partner
export const currentDeliveryPartner: DeliveryPartner = {
  id: 'dp-1',
  name: 'Rahul Kumar',
  phone: '+91 9876543220',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  rating: 4.8,
  totalDeliveries: 1247,
  isOnline: true,
  currentOrderId: 'order-1',
  earnings: {
    today: 850,
    week: 4520,
    month: 18500,
  },
  vehicle: 'Bike',
};

// Restaurant dashboard mock data
export const restaurantDashboardData = {
  todayOrders: 45,
  todayRevenue: 28500,
  avgRating: 4.5,
  newOrders: [
    { ...mockOrders[0], status: 'placed' as const, id: 'new-order-1' },
  ],
  preparingOrders: [
    { ...mockOrders[0], status: 'preparing' as const, id: 'prep-order-1' },
  ],
  readyOrders: [
    { ...mockOrders[0], status: 'ready' as const, id: 'ready-order-1' },
  ],
};

// Quick filters
export const quickFilters = [
  { id: 'fast', label: 'Fast Delivery', icon: '⚡' },
  { id: 'offers', label: 'Offers', icon: '🏷️' },
  { id: 'rating', label: 'Rating 4.0+', icon: '⭐' },
  { id: 'veg', label: 'Pure Veg', icon: '🥬' },
  { id: 'new', label: 'New', icon: '✨' },
];
