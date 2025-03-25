import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Package, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { cartCount, toggleCart } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMobileMenu();
  };

  // Generate nav links based on user role
  const getNavLinks = () => {
    const links = [
      { text: 'Home', path: '/' },
      { text: 'Shop', path: '/shop' },
      { text: 'About', path: '/about' },
    ];

    // Only show Dashboard for admin users
    if (isAuthenticated && isAdmin) {
      links.push({ text: 'Dashboard', path: '/dashboard' });
    }

    return links;
  };

  const navLinks = getNavLinks();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ease-apple',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-soft' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 animate-fade-in">
            <Package className="h-6 w-6 text-giftoria-slate" />
            <span className="text-xl font-medium">Giftoria</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-giftoria-slate transition-colors duration-200 animate-fade-in"
              >
                {link.text}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="hidden md:flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-1" />
                  {user?.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="hidden md:flex animate-fade-in"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden md:flex animate-fade-in"
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-1" />
                  Sign In
                </Link>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative animate-fade-in"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-giftoria-gold text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && (
        <div
          className={cn(
            'fixed inset-0 bg-white z-40 pt-20 px-6 transform transition-all duration-300 ease-apple',
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <nav className="flex flex-col space-y-6 pt-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xl font-medium text-gray-800 hover:text-giftoria-slate transition-colors"
                onClick={closeMobileMenu}
              >
                {link.text}
              </Link>
            ))}

            {isAuthenticated ? (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full justify-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Button
                variant="outline"
                asChild
                className="w-full justify-center"
                onClick={closeMobileMenu}
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
