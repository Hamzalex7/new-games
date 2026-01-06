
import React, { useState, useEffect } from 'react';
import { Game } from '../types';

interface HeroCarouselProps {
  items: Game[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <section className="relative w-full py-6 md:py-10">
      <div className="relative h-60 md:h-80 rounded-3xl overflow-hidden shadow-xl group">
        {items.map((game, idx) => (
          <div 
            key={game.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img src={game.banner} alt={game.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white">
              <span className="bg-green-500 px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block uppercase">Featured</span>
              <h2 className="text-3xl md:text-4xl font-black mb-2">{game.title}</h2>
              <p className="text-gray-300 text-sm md:text-base line-clamp-2 max-w-xl">{game.description}</p>
              <button className="mt-6 px-8 py-3 bg-green-500 hover:bg-green-600 rounded-full font-bold transition-transform hover:scale-105">
                Download Now
              </button>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-6 right-6 z-20 flex gap-2">
          {items.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${idx === activeIndex ? 'bg-green-500 w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
