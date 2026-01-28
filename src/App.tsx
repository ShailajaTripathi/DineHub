import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import RoleSelector from "./pages/RoleSelector";
import CustomerLayout from "./pages/customer/CustomerLayout";
import CustomerHome from "./pages/customer/CustomerHome";
import RestaurantDetail from "./pages/customer/RestaurantDetail";
import Search from "./pages/customer/Search";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderTracking from "./pages/customer/OrderTracking";
import Orders from "./pages/customer/Orders";
import Profile from "./pages/customer/Profile";
import RestaurantLayout from "./pages/restaurant/RestaurantLayout";
import RestaurantDashboard from "./pages/restaurant/RestaurantDashboard";
import RestaurantOrders from "./pages/restaurant/RestaurantOrders";
import RestaurantMenu from "./pages/restaurant/RestaurantMenu";
import RestaurantAnalytics from "./pages/restaurant/RestaurantAnalytics";
import RestaurantSettings from "./pages/restaurant/RestaurantSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Role Selector */}
            <Route path="/" element={<RoleSelector />} />
            
            {/* Customer App */}
            <Route path="/customer" element={<CustomerLayout />}>
              <Route index element={<CustomerHome />} />
            </Route>
            <Route path="/customer/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/customer/search" element={<Search />} />
            <Route path="/customer/cart" element={<Cart />} />
            <Route path="/customer/checkout" element={<Checkout />} />
            <Route path="/customer/tracking" element={<OrderTracking />} />
            <Route path="/customer/orders" element={<Orders />} />
            <Route path="/customer/profile" element={<Profile />} />
            
            {/* Restaurant Dashboard */}
            <Route path="/restaurant" element={<RestaurantLayout />}>
              <Route index element={<RestaurantDashboard />} />
              <Route path="orders" element={<RestaurantOrders />} />
              <Route path="menu" element={<RestaurantMenu />} />
              <Route path="analytics" element={<RestaurantAnalytics />} />
              <Route path="settings" element={<RestaurantSettings />} />
            </Route>
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
