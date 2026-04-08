const TodoForm = ({ task, description, setTask, setDescription, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto mb-8">
      <div className="mb-4">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task here"
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Enter description here"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
