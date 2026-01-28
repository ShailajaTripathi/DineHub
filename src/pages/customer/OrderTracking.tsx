import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, MapPin, Store, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useApp } from '@/context/AppContext';
import { OrderStatusStepper } from '@/components/shared/OrderStatusStepper';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import { Order } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusMessages: Record<Order['status'], string> = {
  placed: 'Order placed successfully!',
  confirmed: 'Restaurant confirmed your order',
  preparing: 'Your food is being prepared',
  ready: 'Your order is ready for pickup',
  picked_up: 'Order picked up by delivery partner',
  out_for_delivery: 'Your order is on the way!',
  delivered: 'Order delivered successfully!',
  cancelled: 'Order was cancelled',
};

export default function OrderTracking() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { activeOrder } = state;
  const [showDetails, setShowDetails] = useState(false);
  const [eta, setEta] = useState<string>('');
  
  // Simulate order status progression
  useEffect(() => {
    if (!activeOrder || activeOrder.status === 'delivered' || activeOrder.status === 'cancelled') {
      return;
    }
    
    const statusFlow: Order['status'][] = [
      'placed',
      'confirmed',
      'preparing',
      'ready',
      'out_for_delivery',
      'delivered',
    ];
    
    const currentIndex = statusFlow.indexOf(activeOrder.status);
    if (currentIndex < statusFlow.length - 1) {
      const timer = setTimeout(() => {
        dispatch({
          type: 'UPDATE_ORDER_STATUS',
          payload: statusFlow[currentIndex + 1],
        });
      }, 8000); // Progress every 8 seconds for demo
      
      return () => clearTimeout(timer);
    }
  }, [activeOrder?.status, dispatch]);
  
  // Calculate ETA
  useEffect(() => {
    if (!activeOrder) return;
    
    const updateEta = () => {
      const now = new Date();
      const delivery = new Date(activeOrder.estimatedDelivery);
      const diffMs = delivery.getTime() - now.getTime();
      
      if (diffMs <= 0) {
        setEta('Any moment now');
      } else {
        const diffMins = Math.ceil(diffMs / 60000);
        if (diffMins > 60) {
          const hours = Math.floor(diffMins / 60);
          const mins = diffMins % 60;
          setEta(`${hours}h ${mins}m`);
        } else {
          setEta(`${diffMins} min${diffMins > 1 ? 's' : ''}`);
        }
      }
    };
    
    updateEta();
    const interval = setInterval(updateEta, 30000);
    return () => clearInterval(interval);
  }, [activeOrder]);
  
  if (!activeOrder) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="sticky top-0 bg-background z-10 border-b border-border">
          <div className="flex items-center gap-3 p-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/customer')}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="font-semibold text-lg">Order Tracking</h1>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-5xl">📦</span>
          </div>
          <h2 className="text-xl font-semibold text-center">No active orders</h2>
          <p className="text-muted-foreground text-center mt-2">
            Place an order to track it here
          </p>
          <Button className="mt-6" onClick={() => navigate('/customer')}>
            Browse Restaurants
          </Button>
        </div>
      </div>
    );
  }
  
  const isDelivered = activeOrder.status === 'delivered';
  const isOutForDelivery = ['out_for_delivery', 'picked_up'].includes(activeOrder.status);
  
  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-background z-10 border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/customer')}
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Track Order</h1>
            <p className="text-xs text-muted-foreground">
              Order #{activeOrder.id.slice(-8)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="relative h-48 bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={32} className="mx-auto text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Live map tracking</p>
          </div>
        </div>
        
        {/* ETA Badge */}
        <div className="absolute bottom-4 left-4 right-4">
          <Card className="p-3 flex items-center justify-between bg-card/95 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-primary" />
              <span className="font-medium">Estimated Arrival</span>
            </div>
            <span className="text-lg font-bold text-primary">{eta}</span>
          </Card>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Status Message */}
        <Card className="p-4">
          <div className={cn(
            'text-center py-2 rounded-lg font-medium',
            isDelivered ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
          )}>
            {isDelivered ? '🎉 ' : ''}{statusMessages[activeOrder.status]}
          </div>
          
          {/* Order Status Stepper */}
          <OrderStatusStepper status={activeOrder.status} className="mt-6" />
        </Card>
        
        {/* Delivery Partner (show when out for delivery) */}
        {isOutForDelivery && activeOrder.deliveryPartnerName && (
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" />
                <AvatarFallback>
                  {activeOrder.deliveryPartnerName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{activeOrder.deliveryPartnerName}</p>
                <p className="text-sm text-muted-foreground">Delivery Partner</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Phone size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <MessageCircle size={18} />
                </Button>
              </div>
            </div>
          </Card>
        )}
        
        {/* Restaurant & Delivery Info */}
        <Card className="p-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Store size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-medium">{activeOrder.restaurantName}</p>
              <p className="text-sm text-muted-foreground">Pickup Location</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
              <MapPin size={20} className="text-success" />
            </div>
            <div>
              <p className="font-medium capitalize">{activeOrder.address.type}</p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {activeOrder.address.full}
              </p>
            </div>
          </div>
        </Card>
        
        {/* Order Details */}
        <Collapsible open={showDetails} onOpenChange={setShowDetails}>
          <Card className="overflow-hidden">
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between text-left">
              <div>
                <p className="font-semibold">Order Details</p>
                <p className="text-sm text-muted-foreground">
                  {activeOrder.items.reduce((sum, i) => sum + i.quantity, 0)} items
                </p>
              </div>
              {showDetails ? (
                <ChevronUp size={20} className="text-muted-foreground" />
              ) : (
                <ChevronDown size={20} className="text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                {activeOrder.items.map((item) => (
                  <div key={item.menuItem.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.menuItem.name} × {item.quantity}
                    </span>
                    <PriceDisplay
                      amount={item.menuItem.price * item.quantity}
                      size="sm"
                    />
                  </div>
                ))}
                
                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Item Total</span>
                    <PriceDisplay amount={activeOrder.subtotal} size="sm" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <PriceDisplay amount={activeOrder.deliveryFee} size="sm" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <PriceDisplay amount={activeOrder.taxes} size="sm" />
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-border">
                    <span>Total</span>
                    <PriceDisplay amount={activeOrder.total} className="font-semibold" />
                  </div>
                </div>
                
                <div className="pt-2 text-sm text-muted-foreground">
                  <p>Payment: {activeOrder.paymentMethod}</p>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
        
        {/* Help Button */}
        <Button variant="outline" className="w-full">
          Need Help?
        </Button>
      </div>
    </div>
  );
}
