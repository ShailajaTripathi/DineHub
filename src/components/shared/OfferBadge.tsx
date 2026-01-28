import { cn } from '@/lib/utils';

interface OfferBadgeProps {
  offer: string;
  variant?: 'default' | 'outline';
  className?: string;
}

export function OfferBadge({ offer, variant = 'default', className }: OfferBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium',
        variant === 'default' 
          ? 'bg-accent text-accent-foreground' 
          : 'border border-primary text-primary',
        className
      )}
    >
      <span className="text-primary">%</span>
      {offer}
    </span>
  );
}
