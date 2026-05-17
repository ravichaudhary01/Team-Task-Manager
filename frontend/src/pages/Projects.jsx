import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, createProject } from '../store/slices/projectSlice';
import { Plus, Calendar, Users, ChevronRight, Briefcase, X } from 'lucide-react';
import { format } from 'date-fns';

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(formData));
    setShowModal(false);
    setFormData({ title: '', description: '', deadline: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'planning': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
      case 'on-hold': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'completed': return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">Projects</h1>
          <p className="text-text-secondary font-medium">Manage and monitor all your ongoing projects.</p>
        </div>
        {user?.role === 'ADMIN' && (
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Project
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className="card group hover:border-primary-500/50 transition-all duration-300">
              <div className="p-2">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-text-primary truncate group-hover:text-primary-400 transition-colors">{project.title}</h3>
                  <span className={`badge ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-text-secondary line-clamp-2 mb-6 font-medium leading-relaxed">{project.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm font-bold text-text-secondary">
                    <Calendar className="h-4 w-4 mr-2 text-primary-500" />
                    <span className="mr-1">Deadline:</span>
                    <span className="text-text-primary">{format(new Date(project.deadline), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-sm font-bold text-text-secondary">
                    <Users className="h-4 w-4 mr-2 text-primary-500" />
                    <span className="text-text-primary">{project.teamMembers?.length || 0}</span>
                    <span className="ml-1">Team Members</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border flex justify-end">
                <button className="text-sm font-bold text-primary-500 hover:text-primary-400 flex items-center transition-colors">
                  View Details <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 card border-dashed border-2 border-border">
            <Briefcase className="mx-auto h-12 w-12 text-text-secondary opacity-20" />
            <h3 className="mt-4 text-lg font-bold text-text-primary">No projects found</h3>
            <p className="mt-2 text-text-secondary font-medium">Get started by creating your first project.</p>
            {user?.role === 'ADMIN' && (
              <button 
                onClick={() => setShowModal(true)}
                className="mt-6 btn btn-primary inline-flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Project
              </button>
            )}
          </div>
        )}
      </div>

      {/* Simple Modal */}
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setShowModal(false)}>
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom card w-full max-w-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle p-8">
              <form onSubmit={onSubmit}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black text-text-primary tracking-tight">Create New Project</h3>
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
                      placeholder="e.g. Website Redesign"
                      className="input"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label uppercase tracking-widest text-[10px]">Description</label>
                    <textarea
                      required
                      placeholder="Project goals and overview..."
                      className="input"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                  <div>
                    <label className="label uppercase tracking-widest text-[10px]">Deadline</label>
                    <input
                      type="date"
                      required
                      className="input"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    />
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
                    Create Project
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

export default Projects;
