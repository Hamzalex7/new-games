
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SearchOverlay from './components/SearchOverlay';
import HeroCarousel from './components/HeroCarousel';
import GameGrid from './components/GameGrid';
import Footer from './components/Footer';
import { MOCK_DATA } from './constants';
import { Game } from './types';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleSearch = () => setIsSearchOpen(prev => !prev);

  // Live Search Logic
  const allGames = useMemo(() => {
    return [...MOCK_DATA.featured, ...MOCK_DATA.updatedGames, ...MOCK_DATA.newGames];
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allGames.filter(game => 
      game.title.toLowerCase().includes(query) || 
      game.genre.toLowerCase().includes(query) ||
      game.description.toLowerCase().includes(query)
    );
  }, [searchQuery, allGames]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        toggleSidebar={toggleSidebar}
        onSearchClick={toggleSearch}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onSearchClick={toggleSearch}
      />

      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={toggleSearch}
        query={searchQuery}
        setQuery={setSearchQuery}
        results={searchResults}
      />

      <main className="max-w-screen-xl mx-auto px-4 pt-20 pb-10">
        {!searchQuery && (
          <>
            <HeroCarousel items={MOCK_DATA.featured} />
            
            {/* Featured Section */}
            <GameGrid title="Featured Games" items={MOCK_DATA.featured.slice(0, 3)} icon="fire" />

            {/* Updated Games Section */}
            <GameGrid title="Updated Games" items={MOCK_DATA.updatedGames} icon="controller" viewAllLink="#" />

            {/* New Games Section */}
            <GameGrid title="New Games" items={MOCK_DATA.newGames} icon="sparkle" viewAllLink="#" />

            {/* Categories */}
            <section className="py-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-8">
                <h3 className="text-xl font-semibold mb-6 dark:text-white">Games - Categories</h3>
                <div className="flex flex-wrap gap-3">
                  {MOCK_DATA.categories.map(cat => (
                    <a key={cat} href="#" className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium py-2 px-4 rounded transition-colors duration-200">
                      {cat}
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* Latest Blogs */}
            <section className="py-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="p-2 bg-blue-500 rounded-full text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 4v5h5" /></svg>
                  </span>
                  Latest Blogs
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_DATA.blogs.map(blog => (
                  <div key={blog.id} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                    <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                    <div className="p-4">
                      <span className="text-xs font-semibold text-blue-500 uppercase">{blog.tag}</span>
                      <h3 className="text-lg font-bold mt-1 dark:text-white">{blog.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">{blog.excerpt}</p>
                      <div className="mt-4 text-xs text-gray-400">{blog.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {searchQuery && (
          <div className="py-10">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Search Results for "{searchQuery}"</h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map(game => (
                  <GameItem key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No games found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

// Internal Helper for Search Results
const GameItem: React.FC<{ game: Game }> = ({ game }) => (
  <a href="#" className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
    <div className="flex items-start gap-4">
      <img src={game.icon} alt={game.title} className="w-16 h-16 rounded-2xl object-cover" />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{game.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{game.genre} • {game.size}</p>
        <p className="text-xs font-medium text-green-500 mt-1">{game.modFeatures}</p>
      </div>
    </div>
  </a>
);

export default App;
