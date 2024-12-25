import React, { useState } from 'react'
import { pItems } from '../content'
import { profile } from '../assets/icons'
import { Link } from 'react-router-dom'
const ProfileDropdown = () => {

const [isopen, setIsopen]=useState(false)

const toggleDropdown =()=>setIsopen(!isopen)

    const renderOptions =() =>{
        return  pItems.map((items)=>(
            <Link to={items.href} key={items.lable} className='flex  '>
            <img src={items.img} alt="img" width={25} height={25}  />
                <span className='text-gray-700 block px-4 py-2 text-lg font-semibold'>{items.lable}</span>
            </Link>
        ))
    }

  return (
    <div className=' relative'>
       <button className=""
       onClick={toggleDropdown}>
            <img src={profile} alt="profile" width={33} height={33}  className='focus:outline-none  '/>
          </button>

          {isopen && <div
          className={`absolute right-0 mt-3 w-48   rounded-md shadow-lg bg-white transition-opacity duration-150 px-3  `}
          role="menu"
          aria-orientation="vertical"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {renderOptions()}
          </div>
        </div>
          }
    </div>
  )
}

export default ProfileDropdown
