import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { restaurants, menuItems, cuisineCategories } from '@/data/mockData';
import { RestaurantCard } from '@/components/customer/RestaurantCard';
import { MenuItemCard } from '@/components/customer/MenuItemCard';
import { CartPreviewBar } from '@/components/customer/CartPreviewBar';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'rating', label: 'Rating' },
  { value: 'delivery_time', label: 'Delivery Time' },
  { value: 'cost_low', label: 'Cost: Low to High' },
  { value: 'cost_high', label: 'Cost: High to Low' },
];

const recentSearches = ['Pizza', 'Biryani', 'Burger', 'Chinese'];

export default function Search() {
  const navigate = useNavigate();
  const { cartItemCount } = useApp();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'restaurants' | 'dishes'>('restaurants');
  const [filters, setFilters] = useState({
    vegOnly: false,
    rating4Plus: false,
    freeDelivery: false,
    cuisines: [] as string[],
  });
  const [sortBy, setSortBy] = useState('relevance');
  
  const filteredRestaurants = useMemo(() => {
    let results = restaurants;
    
    // Search filter
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.some((c) => c.toLowerCase().includes(q))
      );
    }
    
    // Apply filters
    if (filters.rating4Plus) {
      results = results.filter((r) => r.rating >= 4.0);
    }
    if (filters.freeDelivery) {
      results = results.filter((r) => r.deliveryFee === 0 || r.offers.some((o) => o.toLowerCase().includes('free delivery')));
    }
    if (filters.cuisines.length > 0) {
      results = results.filter((r) =>
        r.cuisine.some((c) => filters.cuisines.includes(c.toLowerCase()))
      );
    }
    
    // Sort
    switch (sortBy) {
      case 'rating':
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case 'delivery_time':
        results = [...results].sort((a, b) => {
          const timeA = parseInt(a.deliveryTime);
          const timeB = parseInt(b.deliveryTime);
          return timeA - timeB;
        });
        break;
      case 'cost_low':
        results = [...results].sort((a, b) => a.priceRange - b.priceRange);
        break;
      case 'cost_high':
        results = [...results].sort((a, b) => b.priceRange - a.priceRange);
        break;
    }
    
    return results;
  }, [query, filters, sortBy]);
  
  const filteredDishes = useMemo(() => {
    let results = menuItems;
    
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }
    
    if (filters.vegOnly) {
      results = results.filter((item) => item.isVeg);
    }
    
    return results;
  }, [query, filters.vegOnly]);
  
  const activeFiltersCount = [
    filters.vegOnly,
    filters.rating4Plus,
    filters.freeDelivery,
    filters.cuisines.length > 0,
  ].filter(Boolean).length;
  
  const clearFilters = () => {
    setFilters({
      vegOnly: false,
      rating4Plus: false,
      freeDelivery: false,
      cuisines: [],
    });
    setSortBy('relevance');
  };
  
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Search Header */}
      <div className="sticky top-0 bg-background z-10 border-b border-border">
        <div className="flex items-center gap-2 p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/customer')}>
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1 relative">
            <SearchIcon
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search restaurants or dishes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setQuery('')}
              >
                <X size={16} />
              </Button>
            )}
          </div>
          
          {/* Filter Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <SlidersHorizontal size={18} />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <SheetTitle>Filters & Sort</SheetTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {/* Sort */}
                <div>
                  <h4 className="font-semibold mb-3">Sort By</h4>
                  <RadioGroup value={sortBy} onValueChange={setSortBy}>
                    {sortOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <Separator />
                
                {/* Quick Filters */}
                <div>
                  <h4 className="font-semibold mb-3">Quick Filters</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="vegOnly"
                        checked={filters.vegOnly}
                        onCheckedChange={(checked) =>
                          setFilters({ ...filters, vegOnly: !!checked })
                        }
                      />
                      <Label htmlFor="vegOnly">Veg Only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rating4Plus"
                        checked={filters.rating4Plus}
                        onCheckedChange={(checked) =>
                          setFilters({ ...filters, rating4Plus: !!checked })
                        }
                      />
                      <Label htmlFor="rating4Plus">Rating 4.0+</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="freeDelivery"
                        checked={filters.freeDelivery}
                        onCheckedChange={(checked) =>
                          setFilters({ ...filters, freeDelivery: !!checked })
                        }
                      />
                      <Label htmlFor="freeDelivery">Free Delivery</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Cuisines */}
                <div>
                  <h4 className="font-semibold mb-3">Cuisines</h4>
                  <div className="flex flex-wrap gap-2">
                    {cuisineCategories.map((cuisine) => (
                      <Badge
                        key={cuisine.id}
                        variant={
                          filters.cuisines.includes(cuisine.name.toLowerCase())
                            ? 'default'
                            : 'outline'
                        }
                        className="cursor-pointer"
                        onClick={() => {
                          const cuisineName = cuisine.name.toLowerCase();
                          setFilters({
                            ...filters,
                            cuisines: filters.cuisines.includes(cuisineName)
                              ? filters.cuisines.filter((c) => c !== cuisineName)
                              : [...filters.cuisines, cuisineName],
                          });
                        }}
                      >
                        {cuisine.icon} {cuisine.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Tabs */}
        <div className="flex border-t border-border">
          <button
            className={cn(
              'flex-1 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'restaurants'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground'
            )}
            onClick={() => setActiveTab('restaurants')}
          >
            Restaurants
          </button>
          <button
            className={cn(
              'flex-1 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'dishes'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground'
            )}
            onClick={() => setActiveTab('dishes')}
          >
            Dishes
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Recent Searches (when no query) */}
        {!query && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search) => (
                <Badge
                  key={search}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setQuery(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Results */}
        {activeTab === 'restaurants' ? (
          <div className="space-y-4">
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No restaurants found</p>
              </div>
            ) : (
              filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))
            )}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredDishes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No dishes found</p>
              </div>
            ) : (
              filteredDishes.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))
            )}
          </div>
        )}
      </div>
      
      {/* Cart Preview Bar */}
      {cartItemCount > 0 && <CartPreviewBar />}
    </div>
  );
}
