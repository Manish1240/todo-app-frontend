const ProfileDeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4">
        <p className="text-gray-800 mb-4">Are you sure you want to delete your profile?  <br /> <span className="text-red-500">
           your all created todos will be deleted. </span></p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDeleteModal;