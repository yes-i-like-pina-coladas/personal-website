import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-auto">
      <div className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-24 max-w-[1400px]">
        <div className="flex justify-center items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Vladimir Loginov. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 