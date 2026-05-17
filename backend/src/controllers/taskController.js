const Task = require('../models/Task');
const Project = require('../models/Project');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
  try {
    let query;

    const { project, status, priority, search } = req.query;

    let queryObj = {};

    if (project) queryObj.project = project;
    if (status) queryObj.status = status;
    if (priority) queryObj.priority = priority;
    if (search) {
      queryObj.title = { $regex: search, $options: 'i' };
    }

    // If MEMBER, only show tasks assigned to them
    if (req.user.role === 'MEMBER') {
      queryObj.assignedTo = req.user.id;
    }

    query = Task.find(queryObj)
      .populate('assignedTo', 'name email')
      .populate('project', 'title')
      .populate('createdBy', 'name email');

    const tasks = await query;

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('project', 'title')
      .populate('comments');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;

    // Check if project exists
    const project = await Project.findById(req.body.project);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // RBAC: ADMIN can update everything, MEMBER can only update status of their assigned task
    if (req.user.role === 'MEMBER') {
      if (task.assignedTo.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this task',
        });
      }
      
      // MEMBER can ONLY update status
      const { status } = req.body;
      task = await Task.findByIdAndUpdate(req.params.id, { status }, {
        new: true,
        runValidators: true,
      });
    } else {
      // ADMIN can update everything
      task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get task statistics for dashboard
// @route   GET /api/tasks/stats
// @access  Private
exports.getTaskStats = async (req, res, next) => {
  try {
    const User = require('../models/User'); // Import inside to avoid circular dep if any
    
    const stats = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalTasks = await Task.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalMembers = await User.countDocuments();

    // Formatting stats for frontend
    const formattedStats = {
      totalTasks,
      totalProjects,
      totalMembers,
      todo: stats.find(s => s._id === 'todo')?.count || 0,
      inProgress: stats.find(s => s._id === 'in-progress')?.count || 0,
      completed: stats.find(s => s._id === 'completed')?.count || 0,
    };

    res.status(200).json({
      success: true,
      data: formattedStats,
    });
  } catch (err) {
    next(err);
  }
};
