import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { promoBanners } from '@/data/mockData';

export function PromoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promoBanners.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, []);
  
  const goTo = (index: number) => {
    setCurrentIndex(index);
  };
  
  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % promoBanners.length);
  };
  
  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + promoBanners.length) % promoBanners.length);
  };
  
  return (
    <div className="relative overflow-hidden rounded-xl mx-4">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {promoBanners.map((banner) => (
          <div
            key={banner.id}
            className={cn(
              'min-w-full h-36 rounded-xl relative overflow-hidden bg-gradient-to-r',
              banner.bgColor
            )}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 p-4 flex flex-col justify-center text-white">
              <h3 className="text-xl font-bold">{banner.title}</h3>
              <p className="text-sm opacity-90 mt-1">{banner.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md"
      >
        <ChevronRight size={18} />
      </button>
      
      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {promoBanners.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all',
              index === currentIndex ? 'w-4 bg-white' : 'bg-white/50'
            )}
          />
        ))}
      </div>
    </div>
  );
}
