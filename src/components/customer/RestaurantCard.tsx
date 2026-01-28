import { Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Restaurant } from '@/data/mockData';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import { OfferBadge } from '@/components/shared/OfferBadge';

interface RestaurantCardProps {
  restaurant: Restaurant;
  className?: string;
}

export function RestaurantCard({ restaurant, className }: RestaurantCardProps) {
  const priceRangeText = '₹'.repeat(restaurant.priceRange);
  
  return (
    <Link
      to={`/customer/restaurant/${restaurant.id}`}
      className={cn(
        'block bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow',
        !restaurant.isOpen && 'opacity-60',
        className
      )}
    >
      {/* Image */}
      <div className="relative h-40">
        <ImageWithFallback
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Offers */}
        {restaurant.offers.length > 0 && (
          <div className="absolute bottom-2 left-2">
            <span className="text-white text-sm font-bold">
              {restaurant.offers[0]}
            </span>
          </div>
        )}
        
        {/* Closed badge */}
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
              Currently Closed
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1">
            {restaurant.name}
          </h3>
          
          {/* Rating */}
          <div className={cn(
            'flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-semibold text-white shrink-0',
            restaurant.rating >= 4 ? 'bg-success' : restaurant.rating >= 3 ? 'bg-warning' : 'bg-destructive'
          )}>
            <Star size={10} fill="currentColor" />
            <span>{restaurant.rating.toFixed(1)}</span>
          </div>
        </div>
        
        {/* Cuisine */}
        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
          {restaurant.cuisine.join(', ')}
        </p>
        
        {/* Meta info */}
        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <span>•</span>
          <span>{restaurant.distance}</span>
          <span>•</span>
          <span>{priceRangeText} for two</span>
        </div>
        
        {/* Offers tags */}
        {restaurant.offers.length > 1 && (
          <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
            {restaurant.offers.slice(1).map((offer, index) => (
              <OfferBadge key={index} offer={offer} variant="outline" />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
