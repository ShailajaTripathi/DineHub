import { useState } from 'react';
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { PromoCarousel } from '@/components/customer/PromoCarousel';
import { CuisineCategories } from '@/components/customer/CuisineCategories';
import { QuickFilters } from '@/components/customer/QuickFilters';
import { RestaurantCard } from '@/components/customer/RestaurantCard';
import { CartPreviewBar } from '@/components/customer/CartPreviewBar';
import { restaurants } from '@/data/mockData';

export default function CustomerHome() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
    );
  };
  
  // Filter restaurants
  let filteredRestaurants = restaurants;
  
  if (selectedCategory) {
    filteredRestaurants = filteredRestaurants.filter((r) =>
      r.cuisine.some((c) => c.toLowerCase().includes(selectedCategory))
    );
  }
  
  if (selectedFilters.includes('rating')) {
    filteredRestaurants = filteredRestaurants.filter((r) => r.rating >= 4);
  }
  
  if (selectedFilters.includes('offers')) {
    filteredRestaurants = filteredRestaurants.filter((r) => r.offers.length > 0);
  }
  
  if (selectedFilters.includes('fast')) {
    filteredRestaurants = filteredRestaurants.filter((r) => 
      parseInt(r.deliveryTime) <= 30
    );
  }
  
  return (
    <div className="min-h-screen bg-background pb-32">
      <CustomerHeader />
      
      <main className="space-y-4 pt-4">
        <PromoCarousel />
        <CuisineCategories 
          selectedCategory={selectedCategory} 
          onSelect={setSelectedCategory} 
        />
        <QuickFilters 
          selectedFilters={selectedFilters} 
          onToggle={toggleFilter} 
        />
        
        {/* Restaurant List */}
        <section className="px-4">
          <h2 className="text-lg font-semibold mb-3">
            {filteredRestaurants.length} restaurants near you
          </h2>
          <div className="space-y-4">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      </main>
      
      <CartPreviewBar />
    </div>
  );
}
