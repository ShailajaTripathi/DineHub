import { 
  TrendingUp, 
  ShoppingBag, 
  IndianRupee, 
  Star, 
  Clock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { restaurantDashboardData, restaurants, mockOrders } from '@/data/mockData';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const statCards = [
  {
    title: "Today's Orders",
    value: restaurantDashboardData.todayOrders,
    icon: ShoppingBag,
    trend: '+12%',
    trendUp: true,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: "Today's Revenue",
    value: `₹${restaurantDashboardData.todayRevenue.toLocaleString()}`,
    icon: IndianRupee,
    trend: '+8%',
    trendUp: true,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    title: 'Average Rating',
    value: restaurantDashboardData.avgRating,
    icon: Star,
    trend: '+0.2',
    trendUp: true,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    title: 'Avg. Prep Time',
    value: '18 min',
    icon: Clock,
    trend: '-2 min',
    trendUp: true,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
];

export default function RestaurantDashboard() {
  const { state } = useApp();
  const { restaurantIsOpen } = state;

  // Combine all pending orders
  const pendingOrders = [
    ...restaurantDashboardData.newOrders,
    ...restaurantDashboardData.preparingOrders,
    ...restaurantDashboardData.readyOrders,
  ];

  return (
    <div className="space-y-6">
      {/* Status Alert */}
      {!restaurantIsOpen && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertCircle className="text-destructive shrink-0" size={20} />
          <div className="flex-1">
            <p className="font-medium text-destructive">Restaurant is currently closed</p>
            <p className="text-sm text-muted-foreground">
              Toggle the switch in the header to start accepting orders
            </p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className={cn('p-2 rounded-lg', stat.bgColor)}>
                  <stat.icon size={20} className={stat.color} />
                </div>
                <div className={cn(
                  'flex items-center gap-1 text-xs font-medium',
                  stat.trendUp ? 'text-success' : 'text-destructive'
                )}>
                  <TrendingUp size={14} className={!stat.trendUp ? 'rotate-180' : ''} />
                  {stat.trend}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* New Orders */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                New Orders
                {restaurantDashboardData.newOrders.length > 0 && (
                  <Badge variant="destructive">{restaurantDashboardData.newOrders.length}</Badge>
                )}
              </CardTitle>
              <Link to="/restaurant/orders">
                <Button variant="ghost" size="sm">
                  View All <ChevronRight size={16} />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {restaurantDashboardData.newOrders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingBag size={32} className="mx-auto mb-2 opacity-50" />
                <p>No new orders</p>
              </div>
            ) : (
              <div className="space-y-3">
                {restaurantDashboardData.newOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    <div>
                      <p className="font-medium">Order #{order.id.slice(-6)}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.reduce((sum, i) => sum + i.quantity, 0)} items • 
                        <PriceDisplay amount={order.total} size="sm" className="inline ml-1" />
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Reject</Button>
                      <Button size="sm">Accept</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preparing Orders in card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                In Progress
                <Badge variant="secondary">{restaurantDashboardData.preparingOrders.length + restaurantDashboardData.readyOrders.length}</Badge>
              </CardTitle>
              <Link to="/restaurant/orders">
                <Button variant="ghost" size="sm">
                  View All <ChevronRight size={16} />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...restaurantDashboardData.preparingOrders, ...restaurantDashboardData.readyOrders].map((order) => (
                <div 
                  key={order.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Order #{order.id.slice(-6)}</p>
                      <Badge 
                        variant={order.status === 'ready' ? 'default' : 'secondary'}
                        className={order.status === 'ready' ? 'bg-success' : 'bg-amber-500'}
                      >
                        {order.status === 'ready' ? 'Ready' : 'Preparing'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                    </p>
                  </div>
                  <Button size="sm" variant={order.status === 'ready' ? 'outline' : 'default'}>
                    {order.status === 'ready' ? 'Picked Up' : 'Mark Ready'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table card*/}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link to="/restaurant/orders">
              <Button variant="outline" size="sm">View All Orders</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Items</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="py-3 px-2 font-medium">#{order.id.slice(-6)}</td>
                    <td className="py-3 px-2 text-muted-foreground">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                    </td>
                    <td className="py-3 px-2">
                      <PriceDisplay amount={order.total} size="sm" />
                    </td>
                    <td className="py-3 px-2">
                      <Badge 
                        variant="secondary"
                        className={cn(
                          order.status === 'delivered' && 'bg-success/10 text-success',
                          order.status === 'preparing' && 'bg-amber-500/10 text-amber-600',
                          order.status === 'out_for_delivery' && 'bg-blue-500/10 text-blue-600',
                        )}
                      >
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground text-sm">
                      {format(new Date(order.placedAt), 'h:mm a')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
