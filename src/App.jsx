import './App.css';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask ,setTasks } from './store/slices/todosSlice';
import { addTodo, deleteTodo, getTodos } from './services/todoApi';

const App = () => {
  const todos = useSelector((store) => store.todos);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(addTask({ task, description }));
    await addTodo({ task, description });
    setDescription("");
    setTask("");
  };

  const deleteHandler = async (id) => {
    dispatch(removeTask(id));
    await deleteTodo(id);
  };

  useEffect(() => {
    const setData = async () => {
      try {
        setLoading(true);
        const data = await getTodos();
        dispatch(setTasks(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    setData();
  }, [dispatch]);

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          My To-Do List
        </h1>
  
        <form onSubmit={submitHandler} className="max-w-md mx-auto mb-8">
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
        <div className="max-w-2xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center mt-10">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {todos.length > 0 ? (
                todos.map((todo) => (
                  <div
                    key={todo._id}
                    className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <div className="flex-1 mb-2 sm:mb-0">
                      <h3 className="font-semibold text-gray-800">{todo.task}</h3>
                      <p className="text-gray-600">{todo.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        setDeleteId(todo._id);
                        setShowDeleteModal(true);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No tasks available yet!</p>
              )}
            </div>
          )}
        </div>
        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-transparent bg-opacity-5 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4">
              <p className="text-gray-800 mb-4">Are you sure you want to delete this task?</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
                >
                  No
                </button>
                <button
                  onClick={() => {
                    deleteHandler(deleteId);
                    setShowDeleteModal(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
     
    </div>
    
  </>
  );
};

export default App;
