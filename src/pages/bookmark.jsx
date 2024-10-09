import React, { useState } from 'react';

import avatar1 from '../assets/3d_avatar_1.png';
import avatar2 from '../assets/3d_avatar_13.png';
import remove from '../assets/Remove.png';
import star from '../assets/Star.png';
import Nav from '../Nav';



const Bookmark = () => {
  const avatars = {
    1: avatar1,
    2: avatar2,
    // Add more avatars as needed
  };


  const [bookmarks, setBookmarks] = useState([
    { id: 1, name: 'Applicant Name', rating: 10 },
    { id: 2, name: 'Applicant Name', rating: 9 },
  ]);

  
  // Function to get avatar URL based on user id
  const getAvatarUrl = (id) => avatars[id]

   // Function to handle remove
   const handleRemove = (id) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
  };

  return (
    

    <div className="flex-1 pt-10 w-100">
    <div className= " w-full px-6 md:px-6 lg:px-10  pb-10 lg:pb-20 xl:pb-20">
      <header className="w-full h-14">
        <div className="mt-auto max-w-full pl-3 ">
          <h1 className="text-4xl tracking-tight font-semibold text-left">BookMarks</h1>
        </div>
      </header>
      <div className="px-4 py-6 sm:px-10 lg:px-10 w-full mt-6 sm:m-2 bg-white min-h-screen pb-10 lg:pb-[15vh] xl:pb-[20vh]">

      {/* Your content */}
      {bookmarks.length > 0 ? (
        <ul role="list" className="divide-y divide-gray-100 space-y-6">
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id} className="flex justify-between gap-x-6 py-4 w-full min-h-[10px]">
            <div className="flex min-w-0 gap-x-4">
              <img
                src={getAvatarUrl(bookmark.id)}
                alt={`Avatar of ${bookmark.name}`}
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-4 font-semibold leading-6 text-gray-900">{bookmark.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-2 h-5 w-5"><img src={star} alt="star" /></span>
              <span className="mr-2">{bookmark.rating}</span>
              <button className="text-red-500 h-5 w-5" onClick={() => handleRemove(bookmark.id)}><img src={remove} alt="remove" /></button>
            </div>
          </li>
        ))}
      </ul>
      ) : (
        <div className="text-center text-gray-500">
            <p>No bookmarks available</p>
        </div>
      )}
    </div>
  </div>
  </div>

);
};
export default Bookmark;