import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/data/mockData';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import { VegBadge } from '@/components/shared/VegBadge';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import { QuantityControl } from '@/components/shared/QuantityControl';
import { useApp } from '@/context/AppContext';

interface MenuItemCardProps {
  item: MenuItem;
  className?: string;
}

export function MenuItemCard({ item, className }: MenuItemCardProps) {
  const { state, dispatch } = useApp();
  
  // Find item in cart
  const cartItem = state.cart.find((ci) => ci.menuItem.id === item.id);
  const quantity = cartItem?.quantity || 0;
  
  const handleAdd = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { item, quantity: 1, addons: [] },
    });
  };
  
  const handleIncrease = () => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { itemId: item.id, quantity: quantity + 1 },
    });
  };
  
  const handleDecrease = () => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { itemId: item.id, quantity: quantity - 1 },
    });
  };
  
  return (
    <div className={cn(
      'flex gap-4 p-4 border-b border-border last:border-b-0',
      !item.isAvailable && 'opacity-50',
      className
    )}>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <VegBadge isVeg={item.isVeg} size="sm" />
          {item.isBestseller && (
            <span className="text-xs font-medium text-primary bg-accent px-1.5 py-0.5 rounded">
              ★ Bestseller
            </span>
          )}
        </div>
        
        <h3 className="font-semibold mt-1.5 line-clamp-1">{item.name}</h3>
        
        <PriceDisplay amount={item.price} size="sm" className="mt-1" />
        
        {item.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {item.description}
          </p>
        )}
        
        {item.addons && item.addons.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            Customisable
          </p>
        )}
      </div>
      
      {/* Image and Add button */}
      <div className="relative shrink-0">
        <div className="w-28 h-24 rounded-lg overflow-hidden">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            className="w-full h-full"
          />
        </div>
        
        {/* Add/Quantity button */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          {quantity === 0 ? (
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={!item.isAvailable}
              className="h-8 px-6 font-semibold shadow-md"
            >
              <Plus size={16} className="mr-1" />
              ADD
            </Button>
          ) : (
            <QuantityControl
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              size="sm"
              className="shadow-md bg-card"
            />
          )}
        </div>
      </div>
    </div>
  );
}
