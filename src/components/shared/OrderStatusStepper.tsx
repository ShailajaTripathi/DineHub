import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Order } from '@/data/mockData';

interface OrderStatusStepperProps {
  status: Order['status'];
  className?: string;
}

const steps = [
  { key: 'placed', label: 'Order Placed' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'ready', label: 'Ready' },
  { key: 'out_for_delivery', label: 'On the way' },
  { key: 'delivered', label: 'Delivered' },
];

export function OrderStatusStepper({ status, className }: OrderStatusStepperProps) {
  const currentIndex = steps.findIndex((s) => s.key === status);
  const isCancelled = status === 'cancelled';
  
  if (isCancelled) {
    return (
      <div className={cn('p-4 bg-destructive/10 rounded-lg text-center', className)}>
        <span className="text-destructive font-semibold">Order Cancelled</span>
      </div>
    );
  }
  
  return (
    <div className={cn('flex items-center justify-between', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isPending = index > currentIndex;
        
        return (
          <div key={step.key} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {/* Line before */}
              {index > 0 && (
                <div 
                  className={cn(
                    'flex-1 h-0.5',
                    isCompleted || isCurrent ? 'bg-success' : 'bg-muted'
                  )} 
                />
              )}
              
              {/* Circle */}
              <div 
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center shrink-0',
                  isCompleted && 'bg-success text-success-foreground',
                  isCurrent && 'bg-primary text-primary-foreground animate-pulse-soft',
                  isPending && 'bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check size={14} />
                ) : (
                  <Circle size={8} fill="currentColor" />
                )}
              </div>
              
              {/* Line after */}
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    'flex-1 h-0.5',
                    isCompleted ? 'bg-success' : 'bg-muted'
                  )} 
                />
              )}
            </div>
            
            {/* Label */}
            <span 
              className={cn(
                'text-xs mt-2 text-center',
                isCurrent ? 'text-primary font-medium' : 'text-muted-foreground'
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
