# FoodFlow - Full-Stack Food Delivery Platform

A modern, full-stack food delivery application built with React, TypeScript, and Tailwind CSS. This project implements dual-role architecture supporting Customer and Restaurant user flows with real-time order management.

## 🚀 Project Overview

**FoodFlow** is a comprehensive food delivery platform that demonstrates production-grade React development, state management, component architecture, and user experience design. The application showcases both frontend excellence and full-stack thinking through dual role-based interfaces.

## 📋 Key Features

### 🛒 Customer Features
- **Role-Based Authentication**: Seamless user role selection (Customer, Restaurant, Delivery Partner)
- **Restaurant Discovery**: Browse restaurants with filtering, search, and real-time sorting
- **Advanced Search & Filtering**: Cuisine-based categories, quick filters, and dynamic filtering logic
- **Menu Management**: Comprehensive menu item browsing with pricing, ratings, and dietary indicators
- **Shopping Cart System**: Add/remove items, quantity management, addon selection with real-time calculation
- **Checkout Flow**: Address selection, payment method integration, order summary review
- **Order Tracking**: Real-time order status tracking with visual progress indicators and delivery partner details
- **Order History**: View previous orders, reorder functionality, and order analytics
- **User Profile**: Profile management, address book, saved preferences
- **Responsive Design**: Mobile-first design with adaptive layouts using Tailwind CSS

### 🏢 Restaurant Features
- **Dashboard Analytics**: Revenue insights, order trends, and performance metrics
- **Order Management**: Real-time order queue, order status updates, collision handling
- **Menu Management**: Create, edit, and manage menu items with categories
- **Restaurant Settings**: Operating hours, delivery zones, cuisine types, ratings management
- **Online Status Toggle**: Control restaurant availability with instant updates

### 🎨 Technical Features
- **Component Architecture**: Modular, reusable components (UI, shared, customer, restaurant)
- **State Management**: Context API with useReducer for complex state handling
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Form Management**: React Hook Form with validation and error handling
- **Responsive UI**: Tailwind CSS with mobile-first design approach
- **Accessibility**: ARIA attributes, keyboard navigation, semantic HTML
- **Error Handling**: Graceful error boundaries and user feedback mechanisms
- **Code Quality**: ESLint configuration, TypeScript strict mode, best practices

---

## 💻 Technology Stack

### Frontend Framework
- **React 18+**: Component-based UI development with hooks
- **TypeScript**: Static typing for improved code reliability and developer experience
- **Vite**: Lightning-fast build tool and dev server

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **shadcn/ui**: High-quality, customizable React components (40+ components)
- **Radix UI**: Unstyled, accessible primitive components

### State Management & Data
- **Context API**: Global state management with useContext and useReducer
- **React Query**: Server state management and data fetching (v5.83.0)
- **Custom Hooks**: use-toast, use-mobile for cross-cutting concerns

### Development & Testing
- **Vitest**: Unit testing framework for fast test execution
- **ESLint**: Code quality and consistency enforcement
- **React Router**: Client-side routing for multi-page application

---

## 🏗️ Architecture & Project Structure

```
src/
├── components/
│   ├── customer/          # Customer-specific components
│   ├── restaurant/        # Restaurant-specific components
│   ├── shared/           # Reusable components (AddressCard, OfferBadge, etc.)
│   └── ui/              # Base UI components (shadcn/ui primitives)
├── pages/
│   ├── customer/        # Customer pages (Home, Cart, Checkout, Orders, etc.)
│   ├── restaurant/      # Restaurant pages (Dashboard, Menu, Orders, Analytics)
│   └── RoleSelector.tsx # Role-based routing
├── context/             # Global state (AppContext with useReducer)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and helpers
└── data/               # Mock data and types
```

---

## 📊 Interview-Ready Features & Implementation Details

### State Management Architecture
- **Centralized State**: AppContext with TypeScript-defined actions
- **Reducer Pattern**: Scalable action-based updates for cart, orders, and user roles
- **Type Safety**: Discriminated unions for action types ensuring compiler safety

### Component Design Patterns
- **Presentational Components**: Pure functional components with props
- **Container Components**: Logic-heavy components managing state and side effects
- **Custom Hooks**: Reusable hooks for toast notifications and responsive design
- **Composition**: Component nesting for flexible and maintainable UI

### Data Flow
- **Unidirectional**: Props flow down, events flow up pattern
- **Mock Data**: Realistic data structures mimicking API responses
- **Type Definitions**: Interfaces for MenuItem, CartItem, Order, Address, Addon

### User Experience
- **Skeleton Loading**: SkeletonCard component for perceived performance
- **Toast Notifications**: Real-time user feedback using sonner and custom hooks
- **Order Status Tracking**: Visual progress indicators with status mapping
- **Responsive Navigation**: CustomerBottomNav, CustomerHeader for mobile-first design

### Form Handling
- **React Hook Form Integration**: Efficient, performant form management
- **Validation**: Input validation with error messaging
- **Multi-step Forms**: Checkout flow with address selection and confirmation

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation & Setup

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd foodflow-frontend

# Install dependencies
npm install

# Start development server (port 5173)
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Watch mode for tests
npm test:watch

# Linting
npm run lint
```

---

## 📱 Application Routes

### Customer Routes
- `/` - Role selector
- `/customer` - Home with restaurant listings
- `/customer/restaurant/:id` - Restaurant detail page
- `/customer/search` - Search restaurants and items
- `/customer/cart` - Shopping cart
- `/customer/checkout` - Checkout process
- `/customer/tracking` - Order tracking
- `/customer/orders` - Order history
- `/customer/profile` - User profile

### Restaurant Routes
- `/restaurant` - Restaurant dashboard
- `/restaurant/orders` - Order management
- `/restaurant/menu` - Menu management
- `/restaurant/analytics` - Sales analytics
- `/restaurant/settings` - Restaurant settings

---

## 🎯 Key Implementation Highlights

### ✅ State Management
- Context API with useReducer for predictable state updates
- Discriminated union types for type-safe actions
- Separation of concerns: UI state vs. application state

### ✅ Component Modularity
- 40+ shadcn/ui components integrated
- Shared components for cross-feature usage
- Feature-specific components in dedicated folders

### ✅ TypeScript Excellence
- Strict mode enabled
- Full type coverage for all state and props
- Custom types for domain models (MenuItem, Order, CartItem)

### ✅ Responsive Design
- Mobile-first approach with Tailwind CSS
- use-mobile hook for responsive behavior
- Adaptive layouts for different screen sizes

### ✅ Code Quality
- ESLint configuration for consistency
- React best practices (hooks, functional components)
- Proper error handling and edge cases

---

## 📈 Performance Optimizations

- **Lazy Loading**: Route-based code splitting with React Router
- **Component Memoization**: React.memo for expensive components
- **Efficient Re-renders**: Proper dependency arrays in hooks
- **CSS-in-JS**: Tailwind CSS for optimized styling
- **Tree Shaking**: Vite enables unused code elimination

---

## 🧪 Testing

```sh
# Run all tests
npm test

# Watch mode
npm test:watch

# Coverage report (when configured)
npm test -- --coverage
```

---

## 📚 Resources & Documentation

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)

---

## 🤝 Contributing

Guidelines for contributing to this project will be added here.

---

## 📄 License

This project is part of a learning/portfolio initiative.

---

## 📝 Notes

This is a frontend-focused implementation showcasing modern React patterns, component architecture, and state management. The backend integration points are prepared with TypeScript types for seamless API connection.
