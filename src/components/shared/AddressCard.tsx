import { Home, Briefcase, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Address } from '@/data/mockData';

interface AddressCardProps {
  address: Address;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function AddressCard({ address, selected, onClick, className }: AddressCardProps) {
  const icons = {
    home: Home,
    work: Briefcase,
    other: MapPin,
  };
  
  const Icon = icons[address.type];
  
  return (
    <div
      className={cn(
        'p-4 border rounded-lg cursor-pointer transition-all',
        selected 
          ? 'border-primary bg-primary/5' 
          : 'border-border hover:border-primary/50',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center',
          selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        )}>
          <Icon size={20} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold capitalize">{address.label}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {address.full}
          </p>
        </div>
        
        {selected && (
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}
