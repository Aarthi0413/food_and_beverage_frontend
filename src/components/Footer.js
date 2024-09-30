import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-orange-200 p-4 border-t border-gray-200 font-serif ">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between">
        {/* Brand and Info */}
        <div className="flex-1 mb-8 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-600">F&B</h1>
          <p className="text-gray-600 mt-2">Explore a variety of cuisines and enjoy delicious food</p>
        </div>

        <div className="text-center">
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} F&B. All rights reserved.</p>
        <p className="text-gray-600 mt-2 text-sm">Privacy Policy | Terms of Service</p>
      </div>
      </div>
      
    </footer>
  );
};

export default Footer;
