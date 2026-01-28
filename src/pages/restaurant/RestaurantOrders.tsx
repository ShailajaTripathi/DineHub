import { useState } from 'react';
import { Clock, Phone, MapPin, ChevronDown, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { restaurantDashboardData, mockOrders, Order } from '@/data/mockData';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import { VegBadge } from '@/components/shared/VegBadge';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';

type OrderStatus = 'new' | 'preparing' | 'ready' | 'completed';

const statusConfig: Record<OrderStatus, { label: string; color: string; bgColor: string }> = {
  new: { label: 'New', color: 'text-destructive', bgColor: 'bg-destructive' },
  preparing: { label: 'Preparing', color: 'text-amber-600', bgColor: 'bg-amber-500' },
  ready: { label: 'Ready', color: 'text-success', bgColor: 'bg-success' },
  completed: { label: 'Completed', color: 'text-muted-foreground', bgColor: 'bg-muted' },
};

// Create demo orders for each status
const demoOrders: Record<OrderStatus, Order[]> = {
  new: [
    { ...restaurantDashboardData.newOrders[0], id: 'new-1', status: 'placed' },
    { 
      ...restaurantDashboardData.newOrders[0], 
      id: 'new-2', 
      status: 'placed',
      items: [{ ...restaurantDashboardData.newOrders[0].items[0], quantity: 3 }],
      total: 450,
      placedAt: new Date(Date.now() - 5 * 60 * 1000),
    },
  ],
  preparing: restaurantDashboardData.preparingOrders.map((o, i) => ({
    ...o,
    id: `prep-${i + 1}`,
    status: 'preparing' as const,
  })),
  ready: restaurantDashboardData.readyOrders.map((o, i) => ({
    ...o,
    id: `ready-${i + 1}`,
    status: 'ready' as const,
  })),
  completed: mockOrders.filter(o => o.status === 'delivered').slice(0, 5),
};

function OrderCard({ order, status }: { order: Order; status: OrderStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(status);
  
  const elapsedTime = formatDistanceToNow(new Date(order.placedAt), { addSuffix: false });
  
  const handleStatusChange = (newStatus: OrderStatus) => {
    setOrderStatus(newStatus);
  };
  
  return (
    <Card className={cn(
      'transition-all',
      orderStatus === 'new' && 'border-destructive/50 shadow-sm shadow-destructive/20'
    )}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="p-4 pb-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">Order #{order.id.slice(-6)}</CardTitle>
                <Badge className={statusConfig[orderStatus].bgColor}>
                  {statusConfig[orderStatus].label}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {elapsedTime} ago
                </span>
                <span>•</span>
                <span>{order.items.reduce((sum, i) => sum + i.quantity, 0)} items</span>
                <span>•</span>
                <PriceDisplay amount={order.total} size="sm" />
              </div>
            </div>
            
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDown 
                  size={18} 
                  className={cn('transition-transform', isOpen && 'rotate-180')} 
                />
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="pt-0 pb-4 px-4 space-y-4">
            {/* Items */}
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between p-2 rounded-lg bg-muted/50">
                  <div className="flex items-start gap-2">
                    <VegBadge isVeg={item.menuItem.isVeg} size="sm" className="mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{item.menuItem.name}</p>
                      {item.selectedAddons.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          + {item.selectedAddons.map(a => a.name).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium">×{item.quantity}</span>
                </div>
              ))}
            </div>
            
            {/* Customer Info */}
            <div className="p-3 rounded-lg bg-muted/30 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground line-clamp-1">{order.address.full}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">+91 98765 43210</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-2">
              {orderStatus === 'new' && (
                <>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleStatusChange('completed')}
                  >
                    <X size={16} className="mr-1" />
                    Reject
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => handleStatusChange('preparing')}
                  >
                    <Check size={16} className="mr-1" />
                    Accept
                  </Button>
                </>
              )}
              {orderStatus === 'preparing' && (
                <Button 
                  className="w-full"
                  onClick={() => handleStatusChange('ready')}
                >
                  Mark as Ready
                </Button>
              )}
              {orderStatus === 'ready' && (
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => handleStatusChange('completed')}
                >
                  Order Picked Up
                </Button>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

export default function RestaurantOrders() {
  const [activeTab, setActiveTab] = useState<OrderStatus>('new');
  
  const tabCounts = {
    new: demoOrders.new.length,
    preparing: demoOrders.preparing.length,
    ready: demoOrders.ready.length,
    completed: demoOrders.completed.length,
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage incoming orders and update their status</p>
      </div>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as OrderStatus)}>
        <TabsList className="w-full justify-start gap-1 h-auto p-1 bg-muted/50 overflow-x-auto">
          {(Object.keys(statusConfig) as OrderStatus[]).map((status) => (
            <TabsTrigger
              key={status}
              value={status}
              className="flex items-center gap-2 data-[state=active]:bg-background"
            >
              {statusConfig[status].label}
              {tabCounts[status] > 0 && (
                <Badge 
                  variant="secondary" 
                  className={cn(
                    'h-5 min-w-5 px-1.5',
                    activeTab === status && status === 'new' && 'bg-destructive text-destructive-foreground'
                  )}
                >
                  {tabCounts[status]}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {(Object.keys(statusConfig) as OrderStatus[]).map((status) => (
          <TabsContent key={status} value={status} className="mt-4">
            {demoOrders[status].length === 0 ? (
              <Card className="p-12">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg font-medium">No {status} orders</p>
                  <p className="text-sm mt-1">Orders will appear here when they come in</p>
                </div>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {demoOrders[status].map((order) => (
                  <OrderCard key={order.id} order={order} status={status} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
