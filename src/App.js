import { useReducer, useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const formatDate = () => {
    return new Date().toLocaleString('en-CA', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const loadTasks = () => {
    try {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

function taskReducer(state, action) {
    switch (action.type) {
        case 'ADD_TASK': {
            const newTask = {
                id: Date.now(),
                text: action.payload,
                completed: false,
                date: formatDate(),
            };
            return [...state, newTask];
        }

        case 'UPDATE_TASK':
            return state.map(task => task.id === action.payload.id ? { ...task, text: action.payload.text, date: formatDate() } : task
            );

        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);

        case 'COMPLETE_TASK':
            return state.map(task => task.id === action.payload ? { ...task, completed: !task.completed } : task
            );

        default:
            return state;
    }
}



function App() {
    const [tasks, dispatch] = useReducer(taskReducer, [], loadTasks);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAdd = text => {
        const trimmed = text.trim();
        if (!trimmed) return;
        dispatch({ type: 'ADD_TASK', payload: trimmed });
    };

    const handleEdit = task => {
        setEditingId(task.id);
        setEditText(task.text);
    };

    const handleUpdate = () => {
        const trimmed = editText.trim();
        if (!trimmed) return;
        dispatch({ type: 'UPDATE_TASK', payload: { id: editingId, text: trimmed } });
        setEditingId(null);
        setEditText('');
    };

    const handleDelete = id => {
        dispatch({ type: 'DELETE_TASK', payload: id });
    };

    const handleComplete = id => {
        dispatch({ type: 'COMPLETE_TASK', payload: id });
    };

    return (
        <main>
            <div className='container'>
                <h1>Task Tracker</h1>
                <TaskForm onAdd={handleAdd} />
                <TaskList
                    tasks={tasks}
                    editingId={editingId}
                    editText={editText}
                    onEditTextChange={setEditText}
                    onEdit={handleEdit}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    onComplete={handleComplete}
                />
            </div>
        </main>
    );
}

export default App;