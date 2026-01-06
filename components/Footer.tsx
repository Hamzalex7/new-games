
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">GETMODAPK.COM</span>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-center md:text-left">
              The ultimate source for 100% working modded games and premium apps for Android.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-green-500">Privacy Policy</a>
            <a href="#" className="hover:text-green-500">Terms of Service</a>
            <a href="#" className="hover:text-green-500">DMCA</a>
            <a href="#" className="hover:text-green-500">Contact</a>
            <a href="#" className="hover:text-green-500">About Us</a>
          </div>
        </div>
        
        <hr className="border-gray-100 dark:border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 GETMODAPK.COM. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-green-500 hover:text-white transition-all">Telegram</a>
            <a href="#" className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-green-500 hover:text-white transition-all">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
