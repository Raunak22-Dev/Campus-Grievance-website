import React, { useState } from 'react';
import { pItems } from '../content';
import { useProfile } from '../contextreact/ProfileContext';
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {
  const { avatar } = useProfile(); // Get avatar from ProfileContext
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const renderOptions = () => {
    return pItems.map((item) => (
      <Link
        to={item.href}
        key={item.label}
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm font-semibold transition-colors"
        role="menuitem"
      >
        <img
          src={item.img}
          alt="Option Icon"
          width={25}
          height={25}
          className="mr-3"
        />
        {item.label}
      </Link>
    ));
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
  className="rounded-full w-14  h-14 p-1 flex items-center justify-center "
  onClick={toggleDropdown}
  aria-haspopup="true"
  aria-expanded={isDropdownOpen}
  aria-label="Toggle profile options"
>
  <img
    src={avatar || '/fallback-image.png'}
    alt="Profile Avatar"
    className="rounded-full w-full h-full object-cover"
  />
</button>


      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white z-50"
          role="menu"
          aria-orientation="vertical"
          tabIndex="-1"
        >
          <div className="py-1">{renderOptions()}</div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
