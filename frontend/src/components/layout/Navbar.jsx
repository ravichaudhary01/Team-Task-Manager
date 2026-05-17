import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { LogOut, Bell, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          <form className="w-full flex md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-text-secondary focus-within:text-text-primary">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none ml-2">
                <Search className="h-4 w-4" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                className="block w-full h-full pl-8 pr-3 py-2 border-transparent bg-transparent text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search everything..."
                type="search"
                name="search"
              />
            </div>
          </form>
        </div>
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          <ThemeToggle />
          <button
            type="button"
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-all duration-200"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            onClick={onLogout}
            className="flex items-center text-sm font-bold text-text-secondary hover:text-error transition-all duration-200 px-3 py-1.5 rounded-lg hover:bg-error/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
