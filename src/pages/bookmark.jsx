import React, { useState } from 'react';

import avatar1 from '../assets/3d_avatar_1.png';
import avatar2 from '../assets/3d_avatar_13.png';
import remove from '../assets/Remove.png';
import star from '../assets/Star.png';



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
      <header className="w-full h-16">
        <div className="mt-auto max-w-full pl-6 ">
          <h1 className="text-4xl tracking-tight font-semibold text-left">BookMarks</h1>
        </div>
      </header>
      <div className="bg-white m-auto w-[95%] min-h-[70vh] flex flex-col p-10 rounded-xl drop-shadow-lg">

      {bookmarks.length > 0 ? (
        <div role="list" className="flex flex-col gap-4">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="flex justify-between items-center gap-x-6 py-4 w-full min-h-[10px]">
            <div className="flex min-w-0 gap-x-4">
              <img
                src={getAvatarUrl(bookmark.id)}
                alt={`Avatar of ${bookmark.name}`}
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
              />
              <div className="min-w-0 flex flex-auto items-center">
                <p className="text-4 font-semibold leading-6 text-center text-gray-900">{bookmark.name}</p>
              </div>
            </div>
            <div className={`flex items-center ${bookmark.rating < 10 ? 'gap-5' : 'gap-4'}`}>
              <div className="text-yellow-500  h-7 w-7 flex justify-center items-center"><img src={star} alt="star" /></div>
              <div>{bookmark.rating}</div>
              <button className="text-red-500 h-5 w-5" onClick={() => handleRemove(bookmark.id)}><img src={remove} alt="remove" /></button>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="text-center justify-center font-semibold text-lg text-gray-500">
            <p>No bookmarks available</p>
        </div>
      )}
    </div>
  </div>
  </div>

);
};
export default Bookmark;