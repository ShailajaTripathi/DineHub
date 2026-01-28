import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Heart, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { currentUser } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  subtitle?: string;
  onClick?: () => void;
  danger?: boolean;
}

export default function Profile() {
  const navigate = useNavigate();
  
  const menuItems: MenuItem[] = [
    {
      icon: User,
      label: 'Edit Profile',
      subtitle: 'Update your personal details',
    },
    {
      icon: MapPin,
      label: 'Saved Addresses',
      subtitle: `${currentUser.addresses.length} addresses saved`,
    },
    {
      icon: Heart,
      label: 'Favorites',
      subtitle: 'Your favorite restaurants',
    },
    {
      icon: CreditCard,
      label: 'Payment Methods',
      subtitle: 'Manage cards & UPI',
    },
    {
      icon: Bell,
      label: 'Notifications',
      subtitle: 'Manage notification preferences',
    },
    {
      icon: Settings,
      label: 'Settings',
      subtitle: 'App preferences',
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      subtitle: 'FAQs and contact us',
    },
  ];
  
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
          <h1 className="font-semibold text-lg">Profile</h1>
        </div>
      </div>
      
      {/* Profile Card */}
      <div className="p-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="text-xl">
                {currentUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{currentUser.name}</h2>
              <p className="text-sm text-muted-foreground">{currentUser.phone}</p>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Menu Items */}
      <div className="px-4">
        <Card className="overflow-hidden">
          {menuItems.map((item, index) => (
            <div key={item.label}>
              <button
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors"
                onClick={item.onClick}
              >
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  item.danger ? 'bg-destructive/10' : 'bg-muted'
                )}>
                  <item.icon
                    size={20}
                    className={item.danger ? 'text-destructive' : 'text-foreground'}
                  />
                </div>
                <div className="flex-1">
                  <p className={cn(
                    'font-medium',
                    item.danger && 'text-destructive'
                  )}>
                    {item.label}
                  </p>
                  {item.subtitle && (
                    <p className="text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>
                  )}
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </button>
              {index < menuItems.length - 1 && <Separator />}
            </div>
          ))}
        </Card>
      </div>
      
      {/* Logout */}
      <div className="p-4">
        <Card className="overflow-hidden">
          <button
            className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <LogOut size={20} className="text-destructive" />
            </div>
            <p className="font-medium text-destructive">Log Out</p>
          </button>
        </Card>
      </div>
      
      {/* App Version */}
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">FoodFlow v1.0.0</p>
      </div>
    </div>
  );
}
