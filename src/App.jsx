import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask, setTasks } from './store/slices/todosSlice';
import { addTodo, deleteTodo, getTodos } from './services/todoApi';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import DeleteModal from './components/DeleteModal';
import UserForm from './components/UserForm';

const App = () => {
  const [authToken, setAuthToken] = useState(()=>localStorage.getItem('token') || null );
  const [username, setUsername] = useState(()=>localStorage.getItem('username') || 'User');
  const todos = useSelector((store) => store.todos);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await getTodos(authToken);
        if(response.success){
        return dispatch(setTasks(response.data));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if(authToken){
    fetchTodos();
    }
  },  [authToken]);

    const handleAddTask = async (e) => {
    e.preventDefault();
    if (!task.trim() || !description.trim()) return;
    const response =  await addTodo({ task, description },authToken);
    if(response.success){
    dispatch(addTask(response.data));
    setTask('');
    setDescription('');
    }else{
      alert(response.message);
    }
  };

  const handleDeleteTask = async (id) => {
    dispatch(removeTask(id));
    await deleteTodo(id);
  };
  const handleOpenDelete = (id) => {
    setDeleteId(id);
  };
  const handleCloseDelete = () => {
    setDeleteId(null);
  };
  const handleDeleteProfile = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setAuthToken(null);
    setUsername('User');
  }
  const handleOnSubmit = (token,username) => {
    localStorage.setItem('token',token);
    localStorage.setItem('username',username);
    setUsername(username);
    setAuthToken(token);
  }

  return (
    <div className="min-h-screen bg-gray-100">
     {authToken &&  <div className="container mx-auto px-4 py-10">
        <Header token={authToken} onLogout={handleDeleteProfile} username={username} />
        <TodoForm
          task={task}
          description={description}
          setTask={setTask}
          setDescription={setDescription}
          onSubmit={handleAddTask}
        />
        <TodoList todos={todos} loading={loading} onDelete={handleOpenDelete} />
        {deleteId && (
          <DeleteModal
            onCancel={handleCloseDelete}
            onConfirm={() => {
              handleDeleteTask(deleteId);
              handleCloseDelete();
            }}
          />
        )}
      </div>}
      {!authToken && <UserForm onSubmit={handleOnSubmit} /> }
      {!authToken && <h1>USER FORM SHOULD BE HERE</h1>}
    </div>
  );
};

export default App;
