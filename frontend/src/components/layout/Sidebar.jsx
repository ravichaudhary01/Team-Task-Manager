import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  Settings,
  PlusCircle
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  ];

  if (user?.role === 'ADMIN') {
    navigation.push({ name: 'Team', href: '/team', icon: Users });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-surface border-r border-border">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-6">
              <div className="bg-primary-500 p-2 rounded-lg mr-3 shadow-lg shadow-black/10">
                <LayoutDashboard className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-text-primary tracking-tight">TaskManager</span>
            </div>
            <nav className="mt-8 flex-1 px-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive(item.href)
                      ? 'bg-primary-500/10 text-primary-400 border-r-2 border-primary-500'
                      : 'text-text-secondary hover:bg-background hover:text-text-primary'
                  } group flex items-center px-3 py-3 text-sm font-bold rounded-lg transition-all duration-200`}
                >
                  <item.icon
                    className={`${
                      isActive(item.href) ? 'text-primary-500' : 'text-text-secondary group-hover:text-text-primary'
                    } mr-3 flex-shrink-0 h-5 w-5 transition-colors`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-border p-4 bg-background/50">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <div className="inline-block h-10 w-10 rounded-xl overflow-hidden bg-background border border-border">
                    <svg className="h-full w-full text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.007C0 16.339 5.373 11 12 11s12 5.339 12 9.993zM12 10a5 5 0 100-10 5 5 0 000 10z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-bold text-text-primary truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs font-bold text-primary-500 uppercase tracking-widest">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
