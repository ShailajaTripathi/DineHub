import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import { Order } from '@/data/mockData';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock past orders for demo
const mockPastOrders: Order[] = [
  {
    id: 'order-past-1',
    restaurantId: 'rest-1',
    restaurantName: 'Pizza Paradise',
    items: [],
    status: 'delivered',
    total: 548,
    subtotal: 478,
    deliveryFee: 30,
    taxes: 40,
    discount: 0,
    address: {
      id: 'addr-1',
      type: 'home',
      label: 'Home',
      full: '123 Main Street, Apartment 4B',
      lat: 0,
      lng: 0,
    },
    paymentMethod: 'UPI',
    placedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000),
  },
  {
    id: 'order-past-2',
    restaurantId: 'rest-2',
    restaurantName: 'Biryani Blues',
    items: [],
    status: 'delivered',
    total: 698,
    subtotal: 598,
    deliveryFee: 25,
    taxes: 75,
    discount: 0,
    address: {
      id: 'addr-1',
      type: 'home',
      label: 'Home',
      full: '123 Main Street, Apartment 4B',
      lat: 0,
      lng: 0,
    },
    paymentMethod: 'Card',
    placedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000),
  },
];

const statusColors: Record<Order['status'], string> = {
  placed: 'bg-blue-500',
  confirmed: 'bg-blue-600',
  preparing: 'bg-amber-500',
  ready: 'bg-amber-600',
  picked_up: 'bg-violet-500',
  out_for_delivery: 'bg-primary',
  delivered: 'bg-success',
  cancelled: 'bg-destructive',
};

export default function Orders() {
  const navigate = useNavigate();
  const { state } = useApp();
  const { activeOrder } = state;
  
  const orders = activeOrder
    ? [activeOrder, ...mockPastOrders]
    : mockPastOrders;
  
  return (
    <div className="min-h-screen bg-background pb-20">
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
          <h1 className="font-semibold text-lg">Your Orders</h1>
        </div>
      </div>
      
      {orders.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[60vh]">
          <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-5xl">📋</span>
          </div>
          <h2 className="text-xl font-semibold text-center">No orders yet</h2>
          <p className="text-muted-foreground text-center mt-2">
            Start ordering to see your order history here
          </p>
          <Button className="mt-6" onClick={() => navigate('/customer')}>
            Browse Restaurants
          </Button>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {orders.map((order) => {
            const isActive = order.status !== 'delivered' && order.status !== 'cancelled';
            
            return (
              <Card
                key={order.id}
                className={cn(
                  'p-4 cursor-pointer transition-colors hover:bg-muted/30',
                  isActive && 'border-primary'
                )}
                onClick={() => {
                  if (isActive) {
                    navigate('/customer/tracking');
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop`}
                      alt={order.restaurantName}
                      className="w-full h-full"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold line-clamp-1">
                          {order.restaurantName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(order.placedAt), 'MMM d, yyyy • h:mm a')}
                        </p>
                      </div>
                      <Badge
                        className={cn(
                          'shrink-0 capitalize text-white',
                          statusColors[order.status]
                        )}
                      >
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <PriceDisplay amount={order.total} size="sm" className="font-semibold" />
                      
                      <div className="flex items-center gap-2">
                        {order.status === 'delivered' && (
                          <Button variant="outline" size="sm" className="h-8">
                            <RotateCcw size={14} className="mr-1" />
                            Reorder
                          </Button>
                        )}
                        <ChevronRight size={20} className="text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
