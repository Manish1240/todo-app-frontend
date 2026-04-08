import { useState } from 'react';
import { addUser } from '../services/userApi';

const UserForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    const response = await addUser(username);
    if(response.success){
    onSubmit(response.token,username);
    }else{
    alert(response.message);
    }
    setUsername('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Welcome to the To-Do App
        </h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Enter your username to continue. Your session token will be saved locally.
        </p>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition duration-200"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
