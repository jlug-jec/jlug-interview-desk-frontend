import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import remove from '../assets/Remove.png';
import Ripple from '../components/Ripple';
import { useAdminContext } from '../contexts/Admin';

const Bookmark = () => {
  const navigate = useNavigate();
  const {    
    bookmarks,
    handleRemoveBookmark,
    fetchBookmarks,
    load
  } = useAdminContext();
  
  console.log(bookmarks)

  return (
    <>
    {load && <Ripple /> }
    { !load && (<div className="flex-1 w-100">
      <div className="w-full px-6 md:px-6 pb-10  sm:p-4 p-4 sm:pl-6">
        <header className="w-full h-16">
          <div className="mt-auto max-w-full md:pl-6 pl-3">
            <h1 className="md:text-4xl text-3xl tracking-tight font-semibold text-left">Bookmarks</h1>
          </div>
        </header>
        <div className="bg-white m-auto w-[95%] min-h-[70vh] flex flex-col md:p-10 rounded-xl drop-shadow-lg p-6 md:mb-0 mb-20  z-[-1]  relative">
          {bookmarks.length > 0 ? (
            <div role="list" className="flex flex-col gap-4">
              {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="flex justify-between items-center gap-x-6 py-4 w-full min-h-[10px]">
                  <div className="min-w-0 flex-auto">
                    <p className="text-lg font-semibold text-gray-900">{bookmark.name}</p>
                  </div>
                  <div className="flex gap-4">
                    <Link to={`/user/${bookmark.id}`}>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded">
                      View Profile
                    </button></Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleRemoveBookmark(bookmark.id)}
                    >
                      <img src={remove} className='w-4 h-4' alt="remove" />
                    </button>
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
    </div> )}
    </>
  );
};

export default Bookmark;





 