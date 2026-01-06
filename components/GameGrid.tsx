
import React from 'react';
import { Game } from '../types';

interface GameGridProps {
  title: string;
  items: Game[];
  icon: 'fire' | 'controller' | 'sparkle';
  viewAllLink?: string;
}

const GameGrid: React.FC<GameGridProps> = ({ title, items, icon, viewAllLink }) => {
  return (
    <section className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 dark:text-white">
          <span className={`p-2 rounded-full text-white ${icon === 'fire' ? 'bg-orange-500' : icon === 'controller' ? 'bg-red-500' : 'bg-purple-500'}`}>
            {icon === 'fire' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-1.459-1.106-2.328a8.96 8.96 0 01-.449-1.169z" clipRule="evenodd" /></svg>}
            {icon === 'controller' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" /></svg>}
            {icon === 'sparkle' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" /></svg>}
          </span>
          {title}
        </h2>
        {viewAllLink && (
          <a href={viewAllLink} className="text-sm font-bold text-green-500 hover:text-green-600 transition-colors flex items-center gap-1">
            VIEW ALL
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
};

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow group cursor-pointer">
      <div className="flex gap-4">
        <div className="relative shrink-0">
          <img src={game.icon} alt={game.title} className="w-20 h-20 rounded-2xl object-cover shadow-sm ring-1 ring-gray-100 dark:ring-gray-700" />
          <div className="absolute -top-2 -right-2 bg-blue-500 p-1 rounded-full border-2 border-white dark:border-gray-800">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-900 dark:text-white truncate group-hover:text-green-500 transition-colors">{game.title}</h3>
            <span className="bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{game.genre} • {game.size}</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs font-medium text-green-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" /></svg>
              {game.modFeatures}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-400">v{game.version}</span>
            <button className="bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full transition-colors">DOWNLOAD</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameGrid;
