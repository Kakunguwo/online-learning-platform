import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import {MdCastForEducation} from "react-icons/md";


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='bg-gradient-to-r from-blue-400 to to-blue-700 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <Link to={'/'} className="flex items-center gap-1">
            <MdCastForEducation size={40} className="text-gray-200"/>
            <div className="font-bold flex uppercase w-24 sm:w-64">
              <span className="text-gray-900">Online</span>
              <span className="text-gray-200">Learning</span>
            </div>
            
          </Link>
        </h1>
        
        <form className='bg-blue-100 p-3 rounded-lg flex items-center'>
          <input 
            type='text' 
            placeholder='Search...' 
            className='bg-transparent focus:outline-none text-gray-800 w-24 sm:w-64'
          />
          <FaSearch className="text-gray-700"/>
        </form>
        
        <div className="sm:hidden">
          {isMenuOpen ? (
            <FaTimes className="text-white cursor-pointer" onClick={toggleMenu} />
          ) : (
            <FaBars className="text-white cursor-pointer" onClick={toggleMenu} />
          )}
        </div>

        <ul className={`sm:flex hidden ${isMenuOpen ? 'block' : ''}`}>
          <li className="text-white uppercase hover:text-gray-900 py-2 px-3"><Link to={'/'}>Home</Link></li>
          <li className="text-white uppercase hover:text-gray-900 py-2 px-3"><Link to={'/courses'}>Courses</Link></li>
          <li className="text-white uppercase hover:text-gray-900 py-2 px-3"><Link to={'/about'}>About</Link></li>
          <li className="text-white uppercase hover:text-gray-900 py-2 px-3"><Link to={'/login'}>Login</Link></li>
        </ul>
      </div>

      {isMenuOpen && (
        <ul className="bg-blue-300 sm:hidden">
          <li className="text-white uppercase hover:text-gray-900 py-2 px-3"><Link to={'/'}>Home</Link></li>
          <li className="text-white uppercase hover:text-gray-900 py-2 px-3"><Link to={'/courses'}>Courses</Link></li>
          <li className="text-white uppercase hover:text-gray-900 py-2 px-3"><Link to={'/about'}>About</Link></li>
          <li className="text-white uppercase hover:text-gray-900 py-2 px-3"><Link to={'/login'}>Login</Link></li>
        </ul>
      )}
    </header>
  );
}

export default Header;
