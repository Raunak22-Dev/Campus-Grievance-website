import React, { useState, useRef, useEffect } from 'react';
import { pItems } from '../content';
import { useProfile } from '../contextreact/ProfileContext';
import { Link, useNavigate } from 'react-router-dom';
import { NavbarItems } from '../content';

const ProfileDropdown = ({ mobileView, onClose }) => {
  const { avatar, clearProfile } = useProfile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        onClose?.();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');
    clearProfile?.();
    navigate('/login');
    onClose?.();
  };

  const handleItemClick = () => {
    setIsDropdownOpen(false);
    onClose?.();
  };

  const DropdownItem = ({ item }) => (
    <div className="group relative">
      {item.label === 'Logout' ? (
        <button
          onClick={handleLogout}
          className="flex w-full items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors text-sm font-medium"
          role="menuitem"
        >
          <img
            src={item.img}
            alt=""
            className="mr-3 h-6 w-6 text-gray-400 group-hover:text-blue-600"
            aria-hidden="true"
          />
          {item.label}
        </button>
      ) : (
        <Link
          to={item.href}
          onClick={handleItemClick}
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors text-sm font-medium"
          role="menuitem"
        >
          <img
            src={item.img}
            alt=""
            className="mr-3 h-6 w-6 text-gray-400 group-hover:text-blue-600"
            aria-hidden="true"
          />
          {item.label}
        </Link>
      )}
    </div>
  );

  return (
    <div className={`relative ${mobileView ? 'w-full' : ''}`} ref={dropdownRef}>
      {!mobileView && (
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-1 rounded-full p-1 hover:ring-2 hover:ring-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <img
            src={avatar || '/default-avatar.png'}
            alt="User profile"
            className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
            onError={(e) => {
              e.target.src = '/default-avatar.png';
            }}
          />
        </button>
      )}

      {(isDropdownOpen || mobileView) && (
        <div
          className={`${
            mobileView 
              ? 'relative w-full shadow-none mt-2' 
              : 'absolute right-0 mt-2 w-64 shadow-lg'
          } rounded-xl bg-white z-50 ring-1 ring-black ring-opacity-5`}
          role="menu"
        >
          <div className="py-2">
            {/* Mobile Navigation Items */}
            {mobileView && (
        <>
          {NavbarItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={handleItemClick}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors text-sm font-medium relative"
            >
              <img
                src={item.img}
                alt={item.label}
                className="mr-3 h-6 w-6 text-gray-400"
              />
              {item.label}
              {item.badge && (
                <span className="ml-auto bg-red-500 text-xs text-white w-5 h-5 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
                
                <div className="border-t my-2"></div>
              </>
            )}

            {/* Profile Items */}
            {pItems.map((item) => (
              <DropdownItem key={item.label} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;