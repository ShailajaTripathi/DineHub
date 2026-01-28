import { Home, Search, ShoppingBag, ClipboardList, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

const navItems = [
  { to: '/customer', icon: Home, label: 'Home' },
  { to: '/customer/search', icon: Search, label: 'Search' },
  { to: '/customer/cart', icon: ShoppingBag, label: 'Cart' },
  { to: '/customer/orders', icon: ClipboardList, label: 'Orders' },
  { to: '/customer/profile', icon: User, label: 'Profile' },
];

export function CustomerBottomNav() {
  const { cartItemCount } = useApp();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/customer'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center flex-1 h-full relative transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {item.label === 'Cart' && cartItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </span>
                  )}
                </div>
                <span className={cn(
                  'text-xs mt-1',
                  isActive && 'font-medium'
                )}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
