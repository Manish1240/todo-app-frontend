import ProfileDeleteButton from './ProfileDeleteButton';

const Header = ({username,token,onLogout}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
      <div className="text-center sm:text-left flex-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 break-words">
          Welcome, {username}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto sm:mx-0">
          Create tasks, track progress, and manage your day with a simple to-do workflow.
        </p>
      </div>
      <div className="flex justify-center sm:justify-end sm:ml-4 flex-shrink-0">
        <ProfileDeleteButton onLogout={onLogout} token={token} />
      </div>
    </div>
  );
};

export default Header;
