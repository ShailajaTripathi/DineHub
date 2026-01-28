import { useState } from 'react';
import { MapPin, ChevronDown, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useApp } from '@/context/AppContext';
import { currentUser } from '@/data/mockData';

export function CustomerHeader() {
  const { state, dispatch } = useApp();
  const [hasNotifications] = useState(true);
  
  const selectedAddress = state.selectedAddress || currentUser.addresses[0];
  
  return (
    <header className="sticky top-0 bg-card border-b border-border z-40 safe-top">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Location Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 h-auto py-2">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-sm capitalize">
                    {selectedAddress.label}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                  {selectedAddress.full}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72 bg-popover">
            {currentUser.addresses.map((address) => (
              <DropdownMenuItem
                key={address.id}
                onClick={() => dispatch({ type: 'SET_SELECTED_ADDRESS', payload: address })}
                className="flex flex-col items-start py-3"
              >
                <span className="font-medium capitalize">{address.label}</span>
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {address.full}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {hasNotifications && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          )}
        </Button>
      </div>
    </header>
  );
}
