import { cn } from '@/lib/utils';
import { quickFilters } from '@/data/mockData';

interface QuickFiltersProps {
  selectedFilters: string[];
  onToggle: (filterId: string) => void;
}

export function QuickFilters({ selectedFilters, onToggle }: QuickFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2 no-scrollbar">
      {quickFilters.map((filter) => {
        const isSelected = selectedFilters.includes(filter.id);
        
        return (
          <button
            key={filter.id}
            onClick={() => onToggle(filter.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full border whitespace-nowrap text-sm transition-colors',
              isSelected
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border hover:border-primary/50'
            )}
          >
            <span>{filter.icon}</span>
            <span className="font-medium">{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}
