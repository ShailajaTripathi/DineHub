import { Outlet } from 'react-router-dom';
import { CustomerBottomNav } from '@/components/customer/CustomerBottomNav';

export default function CustomerLayout() {
  return (
    <div className="max-w-lg mx-auto bg-background min-h-screen">
      <Outlet />
      <CustomerBottomNav />
    </div>
  );
}
