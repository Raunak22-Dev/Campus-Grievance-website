import React, { useState } from "react";
import { home } from "../assets/icons";
import ProfileDropdown from "./ProfileDropdown";
import { Link } from 'react-router-dom';
import { NavbarItems } from "../content";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavbarLink = ({ item }) => (
    <Link
      to={item.href}
      className="p-2 rounded-lg hover:bg-blue-500/20 transition-colors relative"
    >
      <img 
        src={item.img} 
        alt={item.label} 
        className="w-7 h-7 sm:w-8 sm:h-8 filter brightness-0 invert"
      />
      {item.label === "Notification" && (
        <span className="absolute top-0 right-0 bg-red-500 text-[10px] sm:text-xs text-white w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
          2
        </span>
      )}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg h-16 flex items-center px-4 sm:px-6">
        <div className="flex-1 flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo Section */}
          <Link 
            to="/home" 
            className="flex items-center space-x-3 group"
          >
            <img 
              src={home} 
              alt="Campus Logo" 
              className="w-9 h-9 sm:w-11 sm:h-11 p-1.5 sm:p-2 bg-blue-500 rounded-lg"
            />
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Campus<span className="text-blue-200">Grievance</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {NavbarItems.map((item) => (
                <NavbarLink key={item.label} item={item} />
              ))}
            </div>

            <div className="h-10 w-px bg-white/20 mx-4"></div>

            <div className="flex items-center space-x-4">
              <ProfileDropdown />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-blue-100 focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg">
            <div className="px-4 pt-2 pb-4">
              <ProfileDropdown 
                mobileView 
                onClose={() => setIsMobileMenuOpen(false)} 
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;