import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  Settings,
  ArrowRight,
  Play,
  CheckCircle2,
  BarChart3,
  PieChart as PieIcon,
  Activity,
  Menu,
  X,
  Plus,
  Zap,
  Shield,
  Target,
  ClipboardList,
  MessageSquare,
  LayoutGrid,
  Columns,
  TrendingUp,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/layout/ThemeToggle';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="group relative bg-surface p-8 rounded-[2rem] border border-border hover:border-primary-500/50 transition-all duration-300 shadow-xl hover:shadow-black/10"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
    <div className="relative">
      <div className="bg-primary-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-500/20 transition-all duration-300 shadow-lg hover:shadow-black/10">
        <Icon className="text-primary-500 group-hover:text-primary-400 transition-colors" size={32} />
      </div>
      <h4 className="text-2xl font-black text-text-primary mb-4 tracking-tight uppercase group-hover:text-primary-400 transition-colors">
        {title}
      </h4>
      <p className="text-text-secondary text-base leading-relaxed font-medium">
        {description}
      </p>
    </div>
  </motion.div>
);

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-text-primary selection:bg-primary-500/30 selection:text-white">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-600/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-primary-500 p-2 rounded-xl shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                <LayoutDashboard className="text-white h-6 w-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-text-primary uppercase">
                Team Task Manager
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6">
                <a href="#features" className="text-sm font-bold text-text-secondary hover:text-primary-400 transition-colors uppercase tracking-widest">
                  Features
                </a>
              </div>

              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Link to="/login" className="text-sm font-bold text-text-secondary hover:text-primary-400 transition-colors uppercase tracking-widest">
                  Login
                </Link>
                <Link to="/register" className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-primary-500/20 hover:scale-105 active:scale-95 uppercase tracking-widest">
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-text-secondary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full w-full bg-surface border-b border-border p-6 flex flex-col gap-6 shadow-2xl"
          >
            <a href="#features" className="text-lg font-bold text-text-secondary px-4 py-2 uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>
              Features
            </a>
            <div className="flex flex-col gap-4 pt-6 border-t border-border">
              <Link to="/login" className="text-center py-4 font-bold text-text-secondary uppercase tracking-widest">Login</Link>
              <Link to="/register" className="bg-primary-500 text-white text-center py-4 rounded-xl font-bold uppercase tracking-widest">Sign Up</Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">
              <Zap size={14} />
              The Future of Team Productivity
            </div>
            
            <h1 className="text-6xl lg:text-9xl font-black text-text-primary leading-none mb-8 tracking-tighter uppercase">
              TEAM TASK MANAGER
            </h1>
            
            <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              A premium, high-performance task management system built for modern teams who demand speed, clarity, and results.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/register" className="group bg-primary-500 hover:bg-primary-600 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-primary-500/30 flex items-center gap-3 hover:scale-105 uppercase tracking-wider">
                Get Started Free
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="bg-surface hover:bg-slate-700 text-text-primary border border-border px-10 py-5 rounded-2xl font-black text-xl transition-all flex items-center gap-3 hover:scale-105 uppercase tracking-wider">
                <Play className="fill-primary-500 text-primary-500" size={20} />
                Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-24 relative max-w-6xl mx-auto"
          >
            <div className="absolute inset-0 bg-primary-500/20 blur-[120px] rounded-full -z-10" />
            
            <div className="bg-surface rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden backdrop-blur-sm p-4 lg:p-8">
              <div className="bg-background rounded-3xl overflow-hidden border border-border shadow-inner">
                <div className="flex h-[600px]">
                  {/* Sidebar Mockup */}
                  <div className="w-20 lg:w-64 bg-surface border-r border-border flex flex-col p-6 hidden sm:flex">
                    <div className="flex items-center gap-3 mb-12 px-2">
                      <div className="h-10 w-10 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <LayoutDashboard size={20} className="text-white" />
                      </div>
                      <span className="font-black text-sm hidden lg:block tracking-widest uppercase">TaskManager</span>
                    </div>
                    
                    <div className="space-y-2">
                      {[
                        { icon: LayoutDashboard, label: 'Dashboard', active: true },
                        { icon: Briefcase, label: 'Projects' },
                        { icon: CheckSquare, label: 'Tasks' },
                        { icon: Users, label: 'Team' },
                      ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${item.active ? 'bg-primary-500/10 text-primary-400 shadow-sm border border-primary-500/20' : 'text-text-secondary hover:bg-background'}`}>
                          <item.icon size={20} />
                          <span className="text-xs font-bold hidden lg:block uppercase tracking-widest">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Project Image */}
                  <div className="flex-1 overflow-hidden bg-slate-900 relative group">
                    {/* Fallback decorative background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute inset-0 bg-primary-500/5"></div>
                    
                    <img 
                      src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                      alt="Project Dashboard" 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                      loading="lazy"
                    />
                    
                    {/* Overlay to blend with dark theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
                    
                    {/* Floating Badge for visual interest */}
                    <div className="absolute bottom-8 left-8 p-4 bg-surface/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl animate-bounce-slow">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-primary-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-text-primary uppercase tracking-widest">Live System Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-background border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-[0.2em] mb-6"
            >
              <Zap size={14} />
              Core Infrastructure
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-black text-text-primary mb-8 leading-tight tracking-tighter uppercase">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-xl text-text-secondary leading-relaxed font-medium">
              Everything you need to manage projects, collaborate with teams, and deliver work faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={CheckSquare}
              title="Smart Task Management"
              description="Create, assign, and manage tasks with priorities, deadlines, and progress tracking."
              delay={0.1}
            />
            <FeatureCard 
              icon={Users}
              title="Team Collaboration"
              description="Collaborate with team members, share updates, comment on tasks, and stay synchronized."
              delay={0.2}
            />
            <FeatureCard 
              icon={LayoutGrid}
              title="Kanban Workflow"
              description="Organize tasks visually with drag-and-drop Kanban boards for smoother workflows."
              delay={0.3}
            />
            <FeatureCard 
              icon={BarChart3}
              title="Real-Time Progress Tracking"
              description="Track project completion, overdue tasks, and team productivity in real time."
              delay={0.4}
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Role-Based Access Control"
              description="Secure project management with Admin and Member permission systems."
              delay={0.5}
            />
            <FeatureCard 
              icon={PieIcon}
              title="Analytics Dashboard"
              description="Get insights into team performance, project status, and task completion analytics."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-500 rounded-[4rem] p-16 lg:p-24 relative overflow-hidden shadow-[0_40px_100px_rgba(20,184,166,0.2)]">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl" />
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-5xl lg:text-7xl font-black text-white mb-10 leading-none tracking-tighter uppercase">
                SUPERCHARGE YOUR WORKFLOW
              </h2>
              <p className="text-white/80 text-xl mb-12 font-bold uppercase tracking-widest">
                Join the next generation of productive teams.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/register" className="bg-white text-primary-600 px-12 py-6 rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-2xl uppercase tracking-widest">
                  Get Started Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background pt-32 pb-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary-500 p-2 rounded-xl shadow-lg shadow-primary-500/20">
                  <LayoutDashboard className="text-white h-6 w-6" />
                </div>
                <span className="text-2xl font-black text-text-primary uppercase tracking-tight">TaskManager</span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed font-medium mb-8">
                The ultimate task management platform for high-performance teams. 
                Built for speed, collaboration, and results.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              {[
                { title: 'Product', links: ['Features', 'Security', 'Enterprise'] },
                { title: 'Company', links: ['About', 'Careers', 'Contact'] },
                { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] }
              ].map((col, i) => (
                <div key={i}>
                  <h5 className="font-black text-text-primary mb-8 uppercase tracking-[0.2em] text-xs">{col.title}</h5>
                  <ul className="space-y-4">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-sm text-text-secondary hover:text-primary-400 transition-colors font-bold uppercase tracking-widest">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-text-secondary text-[10px] font-black uppercase tracking-[0.3em]">
              © 2026 TEAM TASK MANAGER. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8">
              {['Twitter', 'GitHub', 'LinkedIn'].map((item) => (
                <a key={item} href="#" className="text-[10px] font-black text-text-secondary hover:text-primary-400 transition-colors uppercase tracking-[0.3em]">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
