import React from 'react';

const TaskFilter = ({ currentFilter, onChangeFilter, taskCounts }) => {
  return (
    <div className="task-filter">
      <button
        className={currentFilter === 'All' ? 'active' : ''}
        onClick={() => onChangeFilter('All')}
      >
        All ({taskCounts.all})
      </button>

      <button
        className={currentFilter === 'Completed' ? 'active' : ''}
        onClick={() => onChangeFilter('Completed')}
      >
        Completed ({taskCounts.completed})
      </button>

      <button
        className={currentFilter === 'Pending' ? 'active' : ''}
        onClick={() => onChangeFilter('Pending')}
      >
        Pending ({taskCounts.pending})
      </button>
    </div>
  );
};

export default TaskFilter;
