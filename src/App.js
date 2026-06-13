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

