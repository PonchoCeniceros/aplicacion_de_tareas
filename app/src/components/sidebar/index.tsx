import useSidebar from "./useSidebar";
import { Link, Outlet, Navigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/**
 *
 */
export default function Sidebar() {
  const { isAuthenticated, isMinimized, toggleSidebar } = useSidebar();

  const headerStyle = 'px-4 border-b border-baseDark pb-1 pt-4';
  const sectionStyle = 'pl-10 pr-4 py-[1px] font-light text-xs hover:text-xs hover:bg-baseLight hover:text-baseDark';
  const logoutStyle = 'flex w-full pl-6 pr-4 py-1 font-bold hover:text-sm hover:bg-baseLight hover:text-baseDark';

  return isAuthenticated ? (
    <div className="flex">
      <div className={`text-sm h-screen bg-baseDark text-white fixed flex flex-col justify-between transition-all duration-200 ${isMinimized ? 'w-20' : 'w-64'}`}>
        <div>
          <div className={`flex items-center p-4 ${isMinimized ? 'justify-center' : 'justify-between'}`}>
            <h2 className={`text-xl whitespace-nowrap transition-all duration-200 ${isMinimized ? 'w-0 opacity-0 pointer-events-none' : 'opacity-100'}`}>
              App de Tareas
            </h2>
            <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-baseLight hover:text-baseDark">
              {isMinimized ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
            </button>
          </div>
          <nav className="flex flex-col space-y-2 py-2">
            <h3 className={headerStyle}>{isMinimized ? 'T' : 'Tareas'}</h3>
            <Link className={sectionStyle} to="form">{isMinimized ? 'F' : 'Creación de tareas'}</Link>
            <Link className={sectionStyle} to="list">{isMinimized ? 'L' : 'Lista de tareas'}</Link>
          </nav>
        </div>
        <div className="pb-4 w-full">
          <Link className={logoutStyle} to="login">{isMinimized ? 'Salir' : 'Salir'}</Link>
        </div>
      </div>
      <div className={`flex w-full transition-all duration-200 ${isMinimized ? 'ml-20' : 'ml-64'}`}>
        <Outlet />
      </div>
    </div>
  )
    : <Navigate to="login" replace />;
}
