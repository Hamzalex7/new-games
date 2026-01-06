
import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onSearchClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, isDarkMode, toggleDarkMode, onSearchClick }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 z-[60] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden p-6 overflow-y-auto`}>
        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-bold dark:text-white">GETMODAPK</span>
          <button onClick={toggleSidebar} className="p-2 text-gray-500 dark:text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <NavItem href="#" label="Home" icon="home" onClick={toggleSidebar} />
          <NavItem href="#" label="Games" icon="controller" onClick={toggleSidebar} />
          <NavItem href="#" label="Blog" icon="blog" onClick={toggleSidebar} />
          
          <hr className="border-gray-100 dark:border-gray-800 my-2" />
          
          <button 
            onClick={() => { toggleDarkMode(); toggleSidebar(); }}
            className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            <span className="p-2 bg-yellow-500 rounded-lg text-white">
              {isDarkMode ? '🌞' : '🌙'}
            </span>
            <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <button 
            onClick={() => { onSearchClick(); toggleSidebar(); }}
            className="flex items-center gap-4 p-4 rounded-xl bg-blue-500 text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="font-medium">Search</span>
          </button>
        </div>
      </div>
    </>
  );
};

const NavItem: React.FC<{ href: string, label: string, icon: string, onClick: () => void }> = ({ href, label, icon, onClick }) => (
  <a href={href} onClick={onClick} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors">
    <span className="text-xl">
      {icon === 'home' && '🏠'}
      {icon === 'controller' && '🎮'}
      {icon === 'blog' && '📝'}
    </span>
    <span className="font-medium">{label}</span>
  </a>
);

export default Sidebar;
