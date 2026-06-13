import TaskForm from './components/TaskForm';

function App() {
  function handleAdd(task) {
    console.log(task);
  }

  return (
    <main>
      <h1>Task Tracker</h1>
      <TaskForm onAdd={handleAdd} />
    </main>
  );
}

export default App;