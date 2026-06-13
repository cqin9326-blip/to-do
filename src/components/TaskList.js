import TaskItem from './TaskItem';


function TaskList({ tasks, editingId, editText, onEditTextChange, onEdit, onUpdate, onDelete, onComplete }) {
    if (tasks.length === 0) {
        return <p className='empty-state'>No tasks yet. Add one above!</p>;
    }

    return (
        <div className='task-grid'>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    isEditing={editingId === task.id}
                    editText={editText}
                    onEditTextChange={onEditTextChange}
                    onEdit={onEdit}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onComplete={onComplete}
                />
            ))}
        </div>
    );
}

export default TaskList;
