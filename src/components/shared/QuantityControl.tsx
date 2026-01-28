import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  min = 0,
  max = 99,
  size = 'md',
  className,
}: QuantityControlProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
  };
  
  const textSizes = {
    sm: 'text-sm w-6',
    md: 'text-base w-8',
  };
  
  const showDelete = quantity === 1 && min === 0;
  
  return (
    <div 
      className={cn(
        'flex items-center bg-primary/10 rounded-lg',
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'text-primary hover:bg-primary/20',
          sizeClasses[size]
        )}
        onClick={onDecrease}
        disabled={quantity <= min}
      >
        {showDelete ? <Trash2 size={14} /> : <Minus size={14} />}
      </Button>
      
      <span className={cn('font-semibold text-center text-primary', textSizes[size])}>
        {quantity}
      </span>
      
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'text-primary hover:bg-primary/20',
          sizeClasses[size]
        )}
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        <Plus size={14} />
      </Button>
    </div>
  );
}
