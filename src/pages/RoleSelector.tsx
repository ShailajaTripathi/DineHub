import { Link } from 'react-router-dom';
import { Smartphone, Store, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

export default function RoleSelector() {
  const { dispatch } = useApp();
  
  const roles = [
    {
      id: 'customer' as const,
      icon: Smartphone,
      title: 'Customer App',
      description: 'Order delicious food from your favorite restaurants',
      path: '/customer',
      color: 'bg-primary',
    },
    {
      id: 'restaurant' as const,
      icon: Store,
      title: 'Restaurant Dashboard',
      description: 'Manage orders, menu, and track your business',
      path: '/restaurant',
      color: 'bg-success',
    },
    {
      id: 'delivery' as const,
      icon: Truck,
      title: 'Delivery Partner',
      description: 'Accept deliveries and earn on your schedule',
      path: '/delivery',
      color: 'bg-secondary',
    },
  ];
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-2">🍔 FoodFlow</h1>
        <p className="text-muted-foreground">Food Delivery Platform</p>
      </div>
      
      {/* Role Cards */}
      <div className="w-full max-w-md space-y-4">
        {roles.map((role) => (
          <Link
            key={role.id}
            to={role.path}
            onClick={() => dispatch({ type: 'SET_USER_ROLE', payload: role.id })}
          >
            <div className="group p-6 bg-card rounded-2xl border border-border hover:border-primary transition-all hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl ${role.color} flex items-center justify-center text-white`}>
                  <role.icon size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground mt-8 text-center">
        Demo app with mock data • Built with React & Tailwind
      </p>
    </div>
  );
}
