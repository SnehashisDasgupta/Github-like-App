import { Link } from "react-router-dom"
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart, FaUser } from "react-icons/fa";
import { MdOutlineExplore, MdLogin } from "react-icons/md";
import Logout from "./Logout";
import { useAuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { authUser } = useAuthContext();

  return (
    <aside className="flex flex-col items-center min-w-12 sm:w-16 sticky top-0 left-0 h-screen py-8 overflow-y-auto border-r bg-glass">

      <nav className="h-full flex flex-col gap-3">

        <Link to='/' className="flex justify-center" >
          <img className="h-8" src="/github.svg" alt="github" />
        </Link>

        <Link to='/' 
          className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800" >
          <IoHomeSharp size={20} />
        </Link>

        {/* if the User is logged in */}
        {authUser && (
            <Link to='/likes' 
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800" >
              <FaHeart size={22}/>
            </Link>
        )}

        {authUser && (
            <Link to='/explore' 
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800" >
              <MdOutlineExplore size={25}/>
            </Link>
        )}

        {/* if the User is logged out */}
        {!authUser && (
            <Link to='/login' 
            className="p-1.5 focus:outline-none transition-colors duration-200 rounded-lg hover:bg-gray-800" >
              <MdLogin size={25}/>
            </Link>
        )}  

        {!authUser && (
            <Link to='/signup' 
            className="p-1.5 focus:outline-none transition-colors duration-200 rounded-lg hover:bg-gray-800" >
              <FaUser size={25}/>
            </Link>
        )}

        {/* if the User is logged in */}
        {authUser && (
            <div className="flex flex-col gap-2 mt-auto">
              <Logout />
            </div>
        )}

      </nav>

    </aside>
  )
}

export default Sidebar