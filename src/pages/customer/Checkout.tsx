import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Check, CreditCard, Smartphone, Banknote, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/context/AppContext';
import { restaurants, currentUser, Address, Order } from '@/data/mockData';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import { cn } from '@/lib/utils';

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Rupay' },
  { id: 'cod', name: 'Cash on Delivery', icon: Banknote, description: 'Pay when your order arrives' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { state, dispatch, cartTotal } = useApp();
  const { cart, cartRestaurantId, selectedAddress } = state;
  
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    selectedAddress?.id || currentUser.addresses[0]?.id || ''
  );
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const restaurant = restaurants.find((r) => r.id === cartRestaurantId);
  const deliveryFee = restaurant?.deliveryFee || 30;
  const taxes = Math.round(cartTotal * 0.05);
  const discount = 0;
  const grandTotal = cartTotal + deliveryFee + taxes - discount;
  
  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
    const address = currentUser.addresses.find((a) => a.id === addressId);
    if (address) {
      dispatch({ type: 'SET_SELECTED_ADDRESS', payload: address });
    }
  };
  
  const handlePlaceOrder = async () => {
    const address = currentUser.addresses.find((a) => a.id === selectedAddressId);
    if (!address || !restaurant) return;
    
    setIsPlacingOrder(true);
    
    // Simulate order placement delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Create order
    const order: Order = {
      id: `order-${Date.now()}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      items: [...cart],
      status: 'placed',
      total: grandTotal,
      subtotal: cartTotal,
      deliveryFee,
      taxes,
      discount,
      address,
      paymentMethod: paymentMethods.find((p) => p.id === paymentMethod)?.name || 'UPI',
      placedAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000), // 45 mins from now
      deliveryPartnerName: 'Rahul Kumar',
      deliveryPartnerPhone: '+91 9876543220',
    };
    
    dispatch({ type: 'SET_ACTIVE_ORDER', payload: order });
    dispatch({ type: 'CLEAR_CART' });
    
    setIsPlacingOrder(false);
    navigate('/customer/tracking');
  };
  
  if (cart.length === 0) {
    navigate('/customer/cart');
    return null;
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
          <h1 className="font-semibold text-lg">Checkout</h1>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Delivery Address */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Delivery Address</h3>
            <Button variant="ghost" size="sm" className="text-primary">
              <Plus size={16} className="mr-1" />
              Add New
            </Button>
          </div>
          
          <RadioGroup
            value={selectedAddressId}
            onValueChange={handleAddressSelect}
            className="space-y-3"
          >
            {currentUser.addresses.map((address) => (
              <div
                key={address.id}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer',
                  selectedAddressId === address.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-muted-foreground/50'
                )}
                onClick={() => handleAddressSelect(address.id)}
              >
                <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    <Label htmlFor={address.id} className="font-medium capitalize cursor-pointer">
                      {address.type}
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {address.full}
                  </p>
                </div>
                {selectedAddressId === address.id && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check size={12} className="text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </RadioGroup>
        </Card>
        
        {/* Payment Method */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Payment Method</h3>
          
          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="space-y-3"
          >
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer',
                  paymentMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-muted-foreground/50'
                )}
                onClick={() => setPaymentMethod(method.id)}
              >
                <RadioGroupItem value={method.id} id={method.id} />
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <method.icon size={20} className="text-foreground" />
                </div>
                <div className="flex-1">
                  <Label htmlFor={method.id} className="font-medium cursor-pointer">
                    {method.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </Card>
        
        {/* Order Summary */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          
          <div className="space-y-2 text-sm">
            {cart.map((item) => (
              <div key={item.menuItem.id} className="flex justify-between">
                <span className="text-muted-foreground">
                  {item.menuItem.name} × {item.quantity}
                </span>
                <PriceDisplay
                  amount={
                    (item.menuItem.price +
                      item.selectedAddons.reduce((s, a) => s + a.price, 0)) *
                    item.quantity
                  }
                  size="sm"
                />
              </div>
            ))}
            
            <Separator className="my-2" />
            
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
            {discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            
            <Separator className="my-2" />
            
            <div className="flex justify-between font-semibold text-base">
              <span>To Pay</span>
              <PriceDisplay amount={grandTotal} className="font-semibold" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-safe">
        <Button
          className="w-full h-12 text-base font-semibold"
          onClick={handlePlaceOrder}
          disabled={!selectedAddressId || isPlacingOrder}
        >
          {isPlacingOrder ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Placing Order...
            </span>
          ) : (
            <>Place Order • <PriceDisplay amount={grandTotal} size="sm" className="ml-1" /></>
          )}
        </Button>
      </div>
    </div>
  );
}
