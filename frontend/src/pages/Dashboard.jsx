import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskStats } from '../store/slices/taskSlice';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ListTodo,
  Briefcase,
  Users,
  PieChart as PieIcon,
  BarChart3
} from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector((state) => state.tasks);
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(getTaskStats());
  }, [dispatch]);

  if (isLoading || !stats) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const isDark = theme === 'dark';
  const textColor = isDark ? '#94A3B8' : '#475569';
  const gridColor = isDark ? '#334155' : '#E2E8F0';
  const tooltipBg = isDark ? '#1E293B' : '#FFFFFF';
  const tooltipBorder = isDark ? '#334155' : '#E2E8F0';
  const tooltipText = isDark ? '#E2E8F0' : '#0F172A';

  const statCards = [
    { name: 'Total Projects', value: stats.totalProjects, icon: Briefcase, color: 'text-teal-400', bg: 'bg-teal-400/10' },
    { name: 'Total Tasks', value: stats.totalTasks, icon: ListTodo, color: 'text-sky-400', bg: 'bg-sky-400/10' },
    { name: 'Team Members', value: stats.totalMembers, icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { name: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { name: 'In Progress', value: stats.inProgress, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ];

  const pieData = {
    labels: ['Todo', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [stats.todo, stats.inProgress, stats.completed],
        backgroundColor: ['#EF4444', '#F59E0B', '#22C55E'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-text-primary tracking-tight">Overview</h1>
        <p className="text-text-secondary font-medium">Track your team's progress and performance.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((item) => (
          <div key={item.name} className="card group hover:border-primary-500/50 transition-all duration-300">
            <div className="flex items-center">
              <div className={`flex-shrink-0 rounded-xl p-3 ${item.bg} group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-xs font-bold text-text-secondary uppercase tracking-widest truncate">{item.name}</dt>
                  <dd className="text-2xl font-black text-text-primary">{item.value}</dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center">
            <PieIcon className="mr-2 text-primary-500 h-5 w-5" />
            Task Distribution
          </h3>
          <div className="h-72 flex justify-center">
            <Pie 
              data={pieData} 
              options={{ 
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: textColor,
                      font: { weight: 'bold', family: 'Poppins' },
                      padding: 20
                    }
                  },
                  tooltip: {
                    backgroundColor: tooltipBg,
                    titleColor: tooltipText,
                    bodyColor: tooltipText,
                    borderColor: tooltipBorder,
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: { family: 'Poppins', weight: 'bold' },
                    bodyFont: { family: 'Poppins' },
                  }
                }
              }} 
            />
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center">
            <BarChart3 className="mr-2 text-primary-500 h-5 w-5" />
            Project Statistics
          </h3>
          <div className="h-72">
            <Bar 
              data={{
                labels: ['Projects', 'Tasks', 'Members'],
                datasets: [{
                  label: 'Count',
                  data: [stats.totalProjects, stats.totalTasks, stats.totalMembers],
                  backgroundColor: [
                    '#14B8A6', // Teal for Projects
                    '#38BDF8', // Sky for Tasks
                    '#A855F7', // Purple for Members
                  ],
                  borderRadius: 12,
                  borderSkipped: false,
                  barThickness: 40,
                }]
              }}
              options={{ 
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { 
                      color: gridColor,
                      drawBorder: false,
                    },
                    ticks: { 
                      color: textColor, 
                      font: { family: 'Poppins', weight: 'bold', size: 11 },
                      padding: 10
                    }
                  },
                  x: {
                    grid: { display: false },
                    ticks: { 
                      color: textColor, 
                      font: { family: 'Poppins', weight: 'bold', size: 12 },
                      padding: 10
                    }
                  }
                },
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: tooltipBg,
                    titleColor: tooltipText,
                    bodyColor: tooltipText,
                    titleFont: { family: 'Poppins', weight: 'bold' },
                    bodyFont: { family: 'Poppins' },
                    padding: 12,
                    cornerRadius: 8,
                    borderColor: tooltipBorder,
                    borderWidth: 1,
                    displayColors: false,
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
