import { useState } from 'react';
import ProfileDeleteModal from './ProfileDeleteModal';
import { deleteUser } from '../services/userApi';

const ProfileDeleteButton = ({token,onLogout}) => {
  const [showModal, setShowModal] = useState(false);
  const handleDeleteProfile = () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    const response =  await deleteUser(token);
    if(response.success){
    onLogout();
    }else{
        alert(response.message)
    }
    
    // User will manage the actual deletion logic
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleDeleteProfile}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Delete Profile
      </button>
      {showModal && (
        <ProfileDeleteModal
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default ProfileDeleteButton;