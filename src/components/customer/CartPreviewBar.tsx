import { ShoppingBag, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { restaurants } from '@/data/mockData';

export function CartPreviewBar() {
  const { state, cartTotal, cartItemCount } = useApp();
  
  if (cartItemCount === 0) return null;
  
  const restaurant = restaurants.find((r) => r.id === state.cartRestaurantId);
  
  return (
    <div className="fixed bottom-16 left-0 right-0 px-4 pb-2 z-40">
      <Link to="/customer/cart">
        <Button className="w-full h-14 rounded-xl shadow-lg justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag size={22} />
              <span className="absolute -top-1 -right-1 bg-primary-foreground text-primary text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            </div>
            <div className="text-left">
              <p className="text-sm opacity-90">
                {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
              </p>
              <p className="text-xs opacity-75">
                {restaurant?.name || 'Your cart'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-semibold">₹{cartTotal}</span>
            <ChevronRight size={20} />
          </div>
        </Button>
      </Link>
    </div>
  );
}
