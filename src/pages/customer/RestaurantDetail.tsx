import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { restaurants, menuItems } from '@/data/mockData';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import { OfferBadge } from '@/components/shared/OfferBadge';
import { MenuItemCard } from '@/components/customer/MenuItemCard';
import { CartPreviewBar } from '@/components/customer/CartPreviewBar';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cartItemCount } = useApp();
  
  const restaurant = restaurants.find((r) => r.id === id);
  const items = menuItems.filter((item) => item.restaurantId === id);
  
  if (!restaurant) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Restaurant not found</p>
      </div>
    );
  }
  
  // Get unique categories
  const categories = [...new Set(items.map((item) => item.category))];
  
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-48 sm:h-56">
          <ImageWithFallback
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 backdrop-blur-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-background/80 backdrop-blur-sm"
            >
              <Share2 size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-background/80 backdrop-blur-sm"
            >
              <Heart size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Restaurant Info */}
      <div className="px-4 -mt-8 relative">
        <div className="bg-card rounded-xl p-4 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold">{restaurant.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {restaurant.cuisine.join(', ')}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {restaurant.address}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-success text-success-foreground px-2 py-1 rounded-md">
              <Star size={14} fill="currentColor" />
              <span className="font-semibold text-sm">{restaurant.rating}</span>
            </div>
          </div>
          
          {/* Delivery Info */}
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock size={16} />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin size={16} />
              <span>{restaurant.distance}</span>
            </div>
            <Badge variant={restaurant.isOpen ? 'default' : 'secondary'}>
              {restaurant.isOpen ? 'Open Now' : 'Closed'}
            </Badge>
          </div>
          
          {/* Offers */}
          {restaurant.offers.length > 0 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
              {restaurant.offers.map((offer, index) => (
                <OfferBadge key={index} offer={offer} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Menu */}
      <div className="mt-6">
        <Tabs defaultValue={categories[0]} className="w-full">
          <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 border-b border-border">
            <TabsList className="w-full justify-start gap-1 h-auto p-2 bg-transparent overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="divide-y divide-border">
                {items
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* Cart Preview Bar */}
      {cartItemCount > 0 && <CartPreviewBar />}
    </div>
  );
}
