import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  amount: number;
  originalAmount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceDisplay({ 
  amount, 
  originalAmount, 
  size = 'md',
  className 
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;
  
  return (
    <div className={cn('flex items-center gap-2', sizeClasses[size], className)}>
      <span className="font-semibold text-foreground">{formatPrice(amount)}</span>
      {originalAmount && originalAmount > amount && (
        <span className="text-muted-foreground line-through text-sm">
          {formatPrice(originalAmount)}
        </span>
      )}
    </div>
  );
}
