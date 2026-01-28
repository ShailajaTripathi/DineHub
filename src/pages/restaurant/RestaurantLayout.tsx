import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  UtensilsCrossed, 
  BarChart3, 
  Settings,
  Menu,
  Bell,
  Power
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { useApp } from '@/context/AppContext';
import { restaurants } from '@/data/mockData';
import { cn } from '@/lib/utils';

const navItems = [
  { title: 'Dashboard', url: '/restaurant', icon: LayoutDashboard },
  { title: 'Orders', url: '/restaurant/orders', icon: ClipboardList, badge: 3 },
  { title: 'Menu', url: '/restaurant/menu', icon: UtensilsCrossed },
  { title: 'Analytics', url: '/restaurant/analytics', icon: BarChart3 },
  { title: 'Settings', url: '/restaurant/settings', icon: Settings },
];

// Get first restaurant as the mock "current" restaurant
const currentRestaurant = restaurants[0];

function RestaurantSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="bg-card">
        {/* Logo/Brand */}
        <div className={cn(
          'flex items-center gap-3 p-4 border-b border-border',
          collapsed && 'justify-center'
        )}>
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <UtensilsCrossed size={20} className="text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-lg truncate">FoodFlow</h1>
              <p className="text-xs text-muted-foreground truncate">Restaurant</p>
            </div>
          )}
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = item.url === '/restaurant' 
                  ? location.pathname === '/restaurant'
                  : location.pathname.startsWith(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink 
                        to={item.url} 
                        end={item.url === '/restaurant'}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                        )}
                      >
                        <item.icon size={20} />
                        {!collapsed && (
                          <>
                            <span className="flex-1">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="bg-destructive text-destructive-foreground text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function RestaurantHeader() {
  const { state, dispatch } = useApp();
  const { restaurantIsOpen } = state;

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <SidebarTrigger>
          <Button variant="ghost" size="icon">
            <Menu size={20} />
          </Button>
        </SidebarTrigger>
        
        <div className="hidden sm:block">
          <h2 className="font-semibold">{currentRestaurant.name}</h2>
          <p className="text-xs text-muted-foreground">{currentRestaurant.address}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Restaurant Status Toggle */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
          <Power size={16} className={restaurantIsOpen ? 'text-success' : 'text-muted-foreground'} />
          <span className="text-sm font-medium hidden sm:inline">
            {restaurantIsOpen ? 'Open' : 'Closed'}
          </span>
          <Switch 
            checked={restaurantIsOpen} 
            onCheckedChange={() => dispatch({ type: 'TOGGLE_RESTAURANT_STATUS' })}
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        {/* Profile */}
        <Avatar className="w-9 h-9">
          <AvatarImage src={currentRestaurant.image} />
          <AvatarFallback>{currentRestaurant.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export default function RestaurantLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <RestaurantSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <RestaurantHeader />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
