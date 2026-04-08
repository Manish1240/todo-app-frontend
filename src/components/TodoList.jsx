const TodoList = ({ todos, loading, onDelete }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {todos.length > 0 ? (
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <div className="flex-1 mb-2 sm:mb-0">
                <h3 className="font-semibold text-gray-800">{todo.task}</h3>
                <p className="text-gray-600">{todo.description}</p>
              </div>
              <button
                onClick={() => onDelete(todo._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No tasks available yet!</p>
      )}
    </div>
  );
};

export default TodoList;
