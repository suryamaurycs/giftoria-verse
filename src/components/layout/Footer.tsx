
import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-giftoria-lightGray py-12 mt-16 animate-fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="animate-slide-up">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Package className="h-6 w-6 text-giftoria-slate" />
              <span className="text-xl font-medium">Giftoria</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Curated gifts for every occasion, crafted with care and delivered with love.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-giftoria-slate transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-giftoria-slate transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-giftoria-slate transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="animate-slide-up [animation-delay:100ms]">
            <h3 className="font-medium text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-giftoria-slate transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Home+Decor" className="text-gray-600 hover:text-giftoria-slate transition-colors">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Kitchen+%26+Dining" className="text-gray-600 hover:text-giftoria-slate transition-colors">
                  Kitchen & Dining
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Food+%26+Beverage" className="text-gray-600 hover:text-giftoria-slate transition-colors">
                  Food & Beverage
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-slide-up [animation-delay:200ms]">
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-giftoria-slate transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-giftoria-slate transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-giftoria-slate transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-giftoria-slate transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-slide-up [animation-delay:300ms]">
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <p className="text-gray-600 mb-4">
              Sign up for our newsletter to receive updates and special offers.
            </p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-giftoria-slate w-full"
              />
              <button
                type="button"
                className="bg-giftoria-slate text-white px-4 py-2 rounded-r-md hover:bg-giftoria-slate/90 transition-colors"
                aria-label="Subscribe"
              >
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Giftoria. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
