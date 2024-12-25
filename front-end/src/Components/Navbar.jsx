import React from "react";
import {dashboard, home, notification} from "../assets/icons"
import Profile from "./ProfileDropdown";
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <header>
      <nav className="bg-gray-100 shadow-md p-3 h-16 flex justify-between items-center">


      <Link to="/" className="px-4">
            <img src="" alt="" /> Campus Grievance
          </Link>

          <ul className="flex flex-1 items-center gap-8 justify-end  ">
            <li>
              <Link to="/"><img src={home} alt="" width={30} height={30} /></Link>
            </li>
            <li>
              <Link to="/Notification"><img src={notification} alt="" width={30} height={30} /></Link>
            </li>
            <li>
              <Link to="/Dashboard"><img src={dashboard} width={30} height={30} /></Link>
            </li>
          <li className="pr-4 py-2">
           <Profile />
          </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
