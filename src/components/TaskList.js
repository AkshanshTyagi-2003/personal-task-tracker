// ✅ TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDeleteTask, onToggleTask, onEditTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onToggle={onToggleTask}
          onEdit={onEditTask} // ✅ Correctly passed
        />
      ))}
    </div>
  );
};

export default TaskList;