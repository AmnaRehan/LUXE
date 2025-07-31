import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, DropletsIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cover bg-center bg-no-repeat bg-fixed relative" style={{backgroundImage: "url('https://i.pinimg.com/736x/67/ec/a1/67eca13d434e8c5717066ed70cd244a3.jpg')"}}>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <DropletsIcon className="w-6 h-6 text-amber-400 animate-pulse" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"  style={{ fontFamily: "'Times New Roman', Times, serif" }}>
        
              Luxe
            </h3>
          </div>

          {/* Links */}
          <div className="flex space-x-8">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Support'].map((link) => (
              <a key={link} href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                {link}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="w-9 h-9 bg-gray-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-orange-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-9 h-9 bg-gray-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-orange-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <Twitter size={16} />
            </a>
            <a href="#" className="w-9 h-9 bg-gray-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-orange-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-9 h-9 bg-gray-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-orange-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Copyright */}
       <div className="mt-6 text-center">
       <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-4" />
       <p className="text-gray-200 text-sm">
       © 2025 Luxe. All rights reserved.
       </p>
</div>

      </div>
    </footer>
  );
};

export default Footer;