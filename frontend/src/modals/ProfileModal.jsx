import React from 'react';
import profilePic from '../assets/profilePic.jpg';

function ProfileModal({ isOpen, onClose, userName }) {
//   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-[#2b2c37] p-8 rounded-lg space-y-4">
        <img src={profilePic} alt="Profile" className="mx-auto h-20 w-20 rounded-full" />
        <p className="text-center font-bold antialiased">Hi, {userName}</p>
        <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" onClick={onClose}>Edit Profile</button>
        <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" onClick={onClose}>Logout</button>
      </div>
    </div>
  );
}

export default ProfileModal;
