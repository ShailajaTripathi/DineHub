import { useState } from 'react';
import { Save, Upload, MapPin, Clock, Phone, Mail, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { restaurants } from '@/data/mockData';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import { toast } from 'sonner';

const currentRestaurant = restaurants[0];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function RestaurantSettings() {
  const [settings, setSettings] = useState({
    name: currentRestaurant.name,
    description: 'We serve the best pizzas in town with fresh ingredients and authentic Italian recipes.',
    address: currentRestaurant.address,
    phone: currentRestaurant.phone,
    email: 'contact@pizzaparadise.com',
    website: 'https://pizzaparadise.com',
    deliveryRadius: 5,
    minOrderValue: currentRestaurant.minOrder,
    prepTime: 25,
    autoAcceptOrders: true,
    enableNotifications: true,
    operatingHours: daysOfWeek.map(day => ({
      day,
      isOpen: day !== 'Sunday',
      openTime: '10:00',
      closeTime: '22:00',
    })),
  });
  
  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };
  
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your restaurant profile and preferences</p>
        </div>
        <Button onClick={handleSave}>
          <Save size={18} className="mr-2" />
          Save Changes
        </Button>
      </div>
      
      {/* Restaurant Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Profile</CardTitle>
          <CardDescription>Basic information about your restaurant</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-xl overflow-hidden border border-border">
              <ImageWithFallback
                src={currentRestaurant.image}
                alt={currentRestaurant.name}
                className="w-full h-full"
              />
            </div>
            <div>
              <Button variant="outline">
                <Upload size={16} className="mr-2" />
                Upload Logo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Recommended: 200x200px, PNG or JPG
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Restaurant Name</Label>
              <Input
                id="name"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="website"
                  value={settings.website}
                  onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-3 text-muted-foreground" />
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="pl-10 resize-none"
                rows={2}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              className="resize-none"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Delivery Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Settings</CardTitle>
          <CardDescription>Configure delivery radius and order requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Delivery Radius</Label>
              <span className="text-sm font-medium">{settings.deliveryRadius} km</span>
            </div>
            <Slider
              value={[settings.deliveryRadius]}
              onValueChange={(value) => setSettings({ ...settings, deliveryRadius: value[0] })}
              max={15}
              min={1}
              step={0.5}
            />
          </div>
          
          <Separator />
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="minOrder">Minimum Order Value (₹)</Label>
              <Input
                id="minOrder"
                type="number"
                value={settings.minOrderValue}
                onChange={(e) => setSettings({ ...settings, minOrderValue: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prepTime">Average Preparation Time (min)</Label>
              <div className="relative">
                <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="prepTime"
                  type="number"
                  value={settings.prepTime}
                  onChange={(e) => setSettings({ ...settings, prepTime: parseInt(e.target.value) })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Operating Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Operating Hours</CardTitle>
          <CardDescription>Set your restaurant's opening and closing times</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {settings.operatingHours.map((daySchedule, index) => (
              <div 
                key={daySchedule.day} 
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/30"
              >
                <div className="w-24 shrink-0">
                  <span className="font-medium text-sm">{daySchedule.day}</span>
                </div>
                <Switch
                  checked={daySchedule.isOpen}
                  onCheckedChange={(checked) => {
                    const newHours = [...settings.operatingHours];
                    newHours[index].isOpen = checked;
                    setSettings({ ...settings, operatingHours: newHours });
                  }}
                />
                {daySchedule.isOpen ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      value={daySchedule.openTime}
                      onChange={(e) => {
                        const newHours = [...settings.operatingHours];
                        newHours[index].openTime = e.target.value;
                        setSettings({ ...settings, operatingHours: newHours });
                      }}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="time"
                      value={daySchedule.closeTime}
                      onChange={(e) => {
                        const newHours = [...settings.operatingHours];
                        newHours[index].closeTime = e.target.value;
                        setSettings({ ...settings, operatingHours: newHours });
                      }}
                      className="w-32"
                    />
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Closed</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Configure notifications and automation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div>
              <p className="font-medium">Auto-accept Orders</p>
              <p className="text-sm text-muted-foreground">
                Automatically accept new orders without manual confirmation
              </p>
            </div>
            <Switch
              checked={settings.autoAcceptOrders}
              onCheckedChange={(checked) => setSettings({ ...settings, autoAcceptOrders: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive notifications for new orders and updates
              </p>
            </div>
            <Switch
              checked={settings.enableNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
