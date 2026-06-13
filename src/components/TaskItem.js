import { FaCheckCircle, FaEdit, FaTrash } from 'react-icons/fa';


function TaskItem({ task, isEditing, editText, onEditTextChange, onEdit, onUpdate, onDelete, onComplete }) {

    const handleKeyDown = e => {
        if (e.key === 'Enter') onUpdate();
        if (e.key === 'Escape') onEditTextChange('');
    };

    return (
        <div className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>

            <span className={`task-strip ${task.completed ? 'task-strip--done' : ''}`}></span>

            <div className='task-body'>
                {isEditing ? (
                    <input
                        type='text'
                        className='task-edit-input'
                        value={editText}
                        autoFocus
                        onChange={e => onEditTextChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={onUpdate}
                    />
                ) : (<p className={`task-text ${task.completed ? 'task-text--done' : ''}`}> {task.text} </p> )}
                <span className='task-date'>{task.date}</span>
            </div>


            <div className='task-actions'>

                <button
                    className='icon-btn icon-btn--complete'
                    title='Mark complete'
                    onClick={() => onComplete(task.id)}
                >
                    <FaCheckCircle className='task-icon' />
                </button>


                <button
                    className='icon-btn icon-btn--edit'
                    title='Edit task'
                    onClick={() => onEdit(task)}
                >
                    <FaEdit className='task-icon' />
                </button>


                <button
                    className='icon-btn icon-btn--delete'
                    title='Delete task'
                    onClick={() => onDelete(task.id)}
                >
                    <FaTrash className='task-icon' />
                </button>
                
            </div>
        </div>
    );
}

export default TaskItem;