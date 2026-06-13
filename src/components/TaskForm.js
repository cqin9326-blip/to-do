import { useState } from 'react';

// TaskForm lets the user type and submit a new task
function TaskForm({ onAdd }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        onAdd(inputValue);
        setInputValue('');
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <div className='task-form'>
            <input
                type='text'
                className='task-input'
                placeholder='New task'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className='btn-add' onClick={handleSubmit}>
                Add
            </button>
        </div>
    );
}

export default TaskForm;
