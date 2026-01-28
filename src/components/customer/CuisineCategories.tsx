import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { cuisineCategories } from '@/data/mockData';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';

interface CuisineCategoriesProps {
  selectedCategory: string | null;
  onSelect: (categoryId: string | null) => void;
}

export function CuisineCategories({ selectedCategory, onSelect }: CuisineCategoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="py-4">
      <h2 className="text-lg font-semibold px-4 mb-3">What's on your mind?</h2>
      
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-4 no-scrollbar"
      >
        {cuisineCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(selectedCategory === category.id ? null : category.id)}
            className={cn(
              'flex flex-col items-center shrink-0 transition-transform',
              selectedCategory === category.id && 'scale-105'
            )}
          >
            <div className={cn(
              'w-16 h-16 rounded-full overflow-hidden border-2 transition-colors',
              selectedCategory === category.id 
                ? 'border-primary' 
                : 'border-transparent'
            )}>
              <ImageWithFallback
                src={category.image}
                alt={category.name}
                className="w-full h-full"
              />
            </div>
            <span className={cn(
              'text-xs mt-2 font-medium',
              selectedCategory === category.id 
                ? 'text-primary' 
                : 'text-foreground'
            )}>
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
