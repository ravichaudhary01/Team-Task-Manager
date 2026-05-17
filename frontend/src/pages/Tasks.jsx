import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, createTask, updateTask, deleteTask } from '../store/slices/taskSlice';
import { getProjects } from '../store/slices/projectSlice';
import { Plus, Trash2, Edit2, Search, Filter, Calendar, X } from 'lucide-react';
import { format } from 'date-fns';

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.tasks);
  const { projects } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getProjects());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(formData));
    setShowModal(false);
    setFormData({ title: '', description: '', project: '', priority: 'medium', dueDate: '' });
  };

  const onStatusChange = (id, status) => {
    dispatch(updateTask({ id, taskData: { status } }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-rose-400 bg-rose-400/10 border border-rose-500/20';
      case 'medium': return 'text-amber-400 bg-amber-400/10 border border-amber-500/20';
      case 'low': return 'text-emerald-400 bg-emerald-400/10 border border-emerald-500/20';
      default: return 'text-slate-400 bg-slate-400/10 border border-slate-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">Tasks</h1>
          <p className="text-text-secondary font-medium">Manage and track your daily activities.</p>
        </div>
        {user?.role === 'ADMIN' && (
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Task
          </button>
        )}
      </div>

      {/* Filters/Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-secondary" />
          </div>
          <input
            type="text"
            className="input pl-12"
            placeholder="Search tasks by title..."
          />
        </div>
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          <select className="input w-full sm:w-48">
            <option value="">All Projects</option>
            {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
          </select>
          <select className="input w-full sm:w-48">
            <option value="">All Status</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden card !p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-widest">Task Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-widest">Project</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-widest">Priority</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-widest">Due Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-text-secondary uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
                  </td>
                </tr>
              ) : tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-text-primary group-hover:text-primary-400 transition-colors">{task.title}</div>
                      <div className="text-xs text-text-secondary mt-1 font-medium max-w-[200px] truncate">{task.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text-secondary font-bold">{task.project?.title || 'No Project'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text-secondary font-bold flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-2 text-primary-500" />
                        {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={task.status}
                        onChange={(e) => onStatusChange(task._id, e.target.value)}
                        className={`text-sm font-bold bg-background border-border rounded-lg focus:ring-primary-500/50 focus:border-primary-500 px-3 py-1.5 transition-all ${
                          task.status === 'completed' ? 'text-emerald-400 border-emerald-500/20' : 'text-text-primary'
                        }`}
                      >
                        <option value="todo">Todo</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {user?.role === 'ADMIN' && (
                        <button
                          onClick={() => dispatch(deleteTask(task._id))}
                          className="p-2 text-text-secondary hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center text-text-secondary font-bold italic">
                    No tasks found in this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Task Modal */}
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setShowModal(false)}>
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom card w-full max-w-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle p-8">
              <form onSubmit={onSubmit}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black text-text-primary tracking-tight">Create New Task</h3>
                  <button type="button" onClick={() => setShowModal(false)} className="text-text-secondary hover:text-text-primary transition-colors">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="label uppercase tracking-widest text-[10px]">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Design Dashboard UI"
                      className="input"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="label uppercase tracking-widest text-[10px]">Project</label>
                      <select
                        required
                        className="input"
                        value={formData.project}
                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      >
                        <option value="">Select Project</option>
                        {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="label uppercase tracking-widest text-[10px]">Priority</label>
                      <select
                        className="input"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="label uppercase tracking-widest text-[10px]">Due Date</label>
                    <input
                      type="date"
                      required
                      className="input"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label uppercase tracking-widest text-[10px]">Description</label>
                    <textarea
                      required
                      placeholder="Task details and sub-tasks..."
                      className="input"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary px-8">
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
