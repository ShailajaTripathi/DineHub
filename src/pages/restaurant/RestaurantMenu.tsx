import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical, GripVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { menuItems, MenuItem } from '@/data/mockData';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import { VegBadge } from '@/components/shared/VegBadge';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import { cn } from '@/lib/utils';

// Filter to Pizza Paradise items (rest-1)
const restaurantMenuItems = menuItems.filter(item => item.restaurantId === 'rest-1');

// Get unique categories
const categories = [...new Set(restaurantMenuItems.map(item => item.category))];

function MenuItemCard({ item }: { item: MenuItem }) {
  const [isAvailable, setIsAvailable] = useState(item.isAvailable);
  
  return (
    <Card className={cn(!isAvailable && 'opacity-60')}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              className="w-full h-full"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <VegBadge isVeg={item.isVeg} size="sm" />
                <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <MoreVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover">
                  <DropdownMenuItem>
                    <Edit2 size={14} className="mr-2" />
                    Edit Item
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 size={14} className="mr-2" />
                    Delete Item
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
              {item.description}
            </p>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <PriceDisplay amount={item.price} size="sm" className="font-semibold" />
                {item.isBestseller && (
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                    ★ Bestseller
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {isAvailable ? 'Available' : 'Unavailable'}
                </span>
                <Switch
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AddItemDialog() {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={18} className="mr-1" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Menu Item</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name</Label>
            <Input id="name" placeholder="e.g., Margherita Pizza" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe your dish..."
              className="resize-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" type="number" placeholder="299" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g., Pizzas" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch id="veg" />
              <Label htmlFor="veg">Vegetarian</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="bestseller" />
              <Label htmlFor="bestseller">Mark as Bestseller</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Item Image</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG up to 5MB
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Add Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function RestaurantMenu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  
  const filteredItems = restaurantMenuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Menu Management</h1>
          <p className="text-muted-foreground">Add, edit, and manage your menu items</p>
        </div>
        <AddItemDialog />
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="w-full justify-start gap-1 h-auto p-1 bg-muted/50 overflow-x-auto flex-nowrap">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="shrink-0"
            >
              {category}
              <Badge variant="secondary" className="ml-2 h-5">
                {restaurantMenuItems.filter(i => i.category === category).length}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems
                .filter(item => item.category === category)
                .map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
            </div>
            
            {filteredItems.filter(item => item.category === category).length === 0 && (
              <Card className="p-12">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg font-medium">No items found</p>
                  <p className="text-sm mt-1">Try adjusting your search or add a new item</p>
                </div>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
