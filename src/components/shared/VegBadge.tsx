import { cn } from '@/lib/utils';

interface VegBadgeProps {
  isVeg: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function VegBadge({ isVeg, size = 'md', className }: VegBadgeProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  
  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };
  
  return (
    <div 
      className={cn(
        'flex items-center justify-center border-2 rounded-sm',
        isVeg ? 'border-success' : 'border-destructive',
        sizeClasses[size],
        className
      )}
    >
      <div 
        className={cn(
          'rounded-full',
          isVeg ? 'bg-success' : 'bg-destructive',
          dotSizes[size]
        )} 
      />
    </div>
  );
}
