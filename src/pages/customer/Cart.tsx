import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Tag, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/context/AppContext';
import { restaurants, currentUser } from '@/data/mockData';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import { VegBadge } from '@/components/shared/VegBadge';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import { cn } from '@/lib/utils';

export default function Cart() {
  const navigate = useNavigate();
  const { state, dispatch, cartTotal } = useApp();
  const { cart, cartRestaurantId, selectedAddress } = state;
  
  const restaurant = restaurants.find((r) => r.id === cartRestaurantId);
  const deliveryFee = restaurant?.deliveryFee || 30;
  const taxes = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + deliveryFee + taxes;
  
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { itemId, quantity: newQuantity },
    });
  };
  
  const handleRemoveItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-background z-10 border-b border-border">
          <div className="flex items-center gap-3 p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="font-semibold text-lg">Cart</h1>
          </div>
        </div>
        
        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-5xl">🛒</span>
          </div>
          <h2 className="text-xl font-semibold text-center">Your cart is empty</h2>
          <p className="text-muted-foreground text-center mt-2">
            Add items from a restaurant to get started
          </p>
          <Button className="mt-6" onClick={() => navigate('/customer')}>
            Browse Restaurants
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 bg-background z-10 border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="font-semibold text-lg">Cart</h1>
            {restaurant && (
              <p className="text-sm text-muted-foreground">{restaurant.name}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Cart Items */}
        <Card className="p-4">
          <div className="space-y-4">
            {cart.map((cartItem) => (
              <div key={cartItem.menuItem.id} className="flex gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={cartItem.menuItem.image}
                    alt={cartItem.menuItem.name}
                    className="w-full h-full"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <VegBadge isVeg={cartItem.menuItem.isVeg} size="sm" />
                    <h3 className="font-medium text-sm line-clamp-1">
                      {cartItem.menuItem.name}
                    </h3>
                  </div>
                  
                  {cartItem.selectedAddons.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      + {cartItem.selectedAddons.map((a) => a.name).join(', ')}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mt-2">
                    <PriceDisplay
                      amount={
                        (cartItem.menuItem.price +
                          cartItem.selectedAddons.reduce((s, a) => s + a.price, 0)) *
                        cartItem.quantity
                      }
                      size="sm"
                    />
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          handleQuantityChange(
                            cartItem.menuItem.id,
                            cartItem.quantity - 1
                          )
                        }
                      >
                        {cartItem.quantity === 1 ? (
                          <Trash2 size={14} className="text-destructive" />
                        ) : (
                          <Minus size={14} />
                        )}
                      </Button>
                      <span className="w-6 text-center font-medium text-sm">
                        {cartItem.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          handleQuantityChange(
                            cartItem.menuItem.id,
                            cartItem.quantity + 1
                          )
                        }
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Coupon */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Tag size={20} className="text-primary" />
            <Input
              placeholder="Enter coupon code"
              className="flex-1"
            />
            <Button variant="outline" size="sm">
              Apply
            </Button>
          </div>
        </Card>
        
        {/* Delivery Address */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Deliver to</p>
                {selectedAddress ? (
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {selectedAddress.label}: {selectedAddress.full}
                  </p>
                ) : (
                  <p className="text-sm text-primary">Add delivery address</p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/customer/checkout')}
            >
              Change
            </Button>
          </div>
        </Card>
        
        {/* Bill Details */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Bill Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Item Total</span>
              <PriceDisplay amount={cartTotal} size="sm" />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <PriceDisplay amount={deliveryFee} size="sm" />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes & Charges</span>
              <PriceDisplay amount={taxes} size="sm" />
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Grand Total</span>
              <PriceDisplay amount={grandTotal} size="sm" className="font-semibold" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-safe">
        <Button
          className="w-full h-12 text-base font-semibold"
          onClick={() => navigate('/customer/checkout')}
        >
          Proceed to Checkout • <PriceDisplay amount={grandTotal} size="sm" className="ml-1" />
        </Button>
      </div>
    </div>
  );
}
