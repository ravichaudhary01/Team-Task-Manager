import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateUserRole, deleteUser } from '../store/slices/adminSlice';
import { Trash2, Users, Mail, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Team = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError, message } = useSelector((state) => state.admin);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  const onRoleChange = (id, role) => {
    dispatch(updateUserRole({ id, role }))
      .unwrap()
      .then(() => toast.success('Role updated successfully'))
      .catch((err) => toast.error(err));
  };

  const onDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id))
        .unwrap()
        .then(() => toast.success('User deleted successfully'))
        .catch((err) => toast.error(err));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Team Management</h1>
          <p className="text-text-secondary mt-1">Manage your team members and their access levels.</p>
        </div>
      </div>

      <div className="card overflow-hidden border-white/5 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr className="bg-background/50">
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-widest">User</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-widest">Email</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-text-secondary uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-text-secondary">
                    <div className="flex flex-col items-center">
                      <svg className="animate-spin h-8 w-8 text-primary-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading users...
                    </div>
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-500 font-bold shadow-inner">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-text-primary">{user.name}</div>
                          <div className="text-xs text-text-secondary">Member since May 2026</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Shield className={`h-4 w-4 mr-2 ${user.role === 'ADMIN' ? 'text-primary-500' : 'text-text-secondary'}`} />
                        <select
                          value={user.role}
                          onChange={(e) => onRoleChange(user._id, e.target.value)}
                          disabled={user._id === currentUser?.id}
                          className="bg-background/50 border border-border text-text-primary text-xs font-bold rounded-lg px-2 py-1 uppercase tracking-wider focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all disabled:opacity-50"
                        >
                          <option value="MEMBER">Member</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      <div className="flex items-center">
                        <Mail className="h-3.5 w-3.5 mr-2" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {user._id !== currentUser?.id && (
                        <button
                          onClick={() => onDeleteUser(user._id)}
                          className="p-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-lg transition-all duration-200"
                          title="Delete User"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-text-secondary">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Team;
