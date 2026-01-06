
import React, { useEffect, useRef } from 'react';
import { Game } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  setQuery: (q: string) => void;
  results: Game[];
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, query, setQuery, results }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 p-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 relative">
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Search games, genres, or mods..."
              className="w-full h-14 pl-12 pr-4 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl text-lg outline-none focus:ring-2 focus:ring-green-500 transition-all dark:text-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {query && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-4 px-2 uppercase">Live Search Results</h3>
            {results.length > 0 ? (
              <div className="grid gap-3">
                {results.slice(0, 10).map(game => (
                  <a key={game.id} href="#" className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-white dark:hover:bg-gray-800 shadow-sm transition-all border border-transparent hover:border-green-500/30">
                    <img src={game.icon} alt={game.title} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold dark:text-white">{game.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{game.genre} • {game.modFeatures}</p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400">
                No matches found
              </div>
            )}
          </div>
        )}

        {!query && (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold dark:text-white">Start Typing...</h3>
            <p className="text-gray-500">Discover millions of modded games and premium tools.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
