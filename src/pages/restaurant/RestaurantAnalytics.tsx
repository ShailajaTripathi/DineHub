import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { TrendingUp, TrendingDown, ShoppingBag, IndianRupee, Users, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for charts
const revenueData = [
  { name: 'Mon', revenue: 4200, orders: 28 },
  { name: 'Tue', revenue: 3800, orders: 24 },
  { name: 'Wed', revenue: 5100, orders: 35 },
  { name: 'Thu', revenue: 4600, orders: 31 },
  { name: 'Fri', revenue: 6200, orders: 42 },
  { name: 'Sat', revenue: 7500, orders: 52 },
  { name: 'Sun', revenue: 6800, orders: 47 },
];

const topItems = [
  { name: 'Margherita Pizza', orders: 156, revenue: 46644, trend: 12 },
  { name: 'Pepperoni Pizza', orders: 124, revenue: 49476, trend: 8 },
  { name: 'Garlic Bread', orders: 98, revenue: 12642, trend: -3 },
  { name: 'Pasta Alfredo', orders: 76, revenue: 18924, trend: 15 },
];

const ratingDistribution = [
  { name: '5 Stars', value: 245, color: 'hsl(var(--success))' },
  { name: '4 Stars', value: 180, color: 'hsl(var(--primary))' },
  { name: '3 Stars', value: 45, color: 'hsl(var(--warning))' },
  { name: '2 Stars', value: 12, color: 'hsl(var(--secondary))' },
  { name: '1 Star', value: 8, color: 'hsl(var(--destructive))' },
];

const peakHours = [
  { hour: '10 AM', orders: 8 },
  { hour: '11 AM', orders: 12 },
  { hour: '12 PM', orders: 28 },
  { hour: '1 PM', orders: 35 },
  { hour: '2 PM', orders: 22 },
  { hour: '3 PM', orders: 10 },
  { hour: '4 PM', orders: 8 },
  { hour: '5 PM', orders: 12 },
  { hour: '6 PM', orders: 18 },
  { hour: '7 PM', orders: 42 },
  { hour: '8 PM', orders: 52 },
  { hour: '9 PM', orders: 38 },
  { hour: '10 PM', orders: 18 },
];

const summaryStats = [
  { 
    title: 'Total Revenue', 
    value: '₹38,200', 
    trend: '+12%', 
    trendUp: true, 
    icon: IndianRupee,
    period: 'vs last week'
  },
  { 
    title: 'Total Orders', 
    value: '259', 
    trend: '+8%', 
    trendUp: true, 
    icon: ShoppingBag,
    period: 'vs last week'
  },
  { 
    title: 'New Customers', 
    value: '47', 
    trend: '+23%', 
    trendUp: true, 
    icon: Users,
    period: 'vs last week'
  },
  { 
    title: 'Avg Rating', 
    value: '4.5', 
    trend: '-0.1', 
    trendUp: false, 
    icon: Star,
    period: 'vs last week'
  },
];

export default function RestaurantAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your restaurant's performance</p>
      </div>
      
      {/* Time Period Tabs */}
      <Tabs defaultValue="week">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>
        
        <TabsContent value="week" className="mt-6 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryStats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <stat.icon size={20} className="text-muted-foreground" />
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        'text-xs',
                        stat.trendUp ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                      )}
                    >
                      {stat.trendUp ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                      {stat.trend}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.period}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis yAxisId="left" className="text-xs" />
                      <YAxis yAxisId="right" orientation="right" className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))' }}
                        name="Revenue (₹)"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="orders" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--success))' }}
                        name="Orders"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Peak Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={peakHours}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="hour" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar 
                        dataKey="orders" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                        name="Orders"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Bottom Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Selling Items */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topItems.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-4">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.orders} orders • ₹{item.revenue.toLocaleString()}
                        </p>
                      </div>
                      <Badge 
                        variant="secondary"
                        className={cn(
                          'shrink-0',
                          item.trend > 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                        )}
                      >
                        {item.trend > 0 ? '+' : ''}{item.trend}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Rating Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ratingDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {ratingDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="today" className="mt-6">
          <Card className="p-12">
            <div className="text-center text-muted-foreground">
              <p>Today's analytics data will appear here</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="month" className="mt-6">
          <Card className="p-12">
            <div className="text-center text-muted-foreground">
              <p>Monthly analytics data will appear here</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
