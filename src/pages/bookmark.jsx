import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import remove from '../assets/Remove.png';
import Ripple from '../components/Ripple';

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  let adminid = localStorage.getItem('userid');
  const adminId =  adminid.replace(/['"]+/g, '');
  const navigate = useNavigate();
  
  const [pageload, setPageLoad] = useState(true);

  useEffect(() => {
    setPageLoad(true)
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/bookmarked/${adminId}`);
        const data = await response.json();
        setBookmarks(data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally{
        setPageLoad(false)
      }
    };

    fetchBookmarks();
  }, [adminId]);

  const handleRemove = async (userId) => {
    try {
      await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/delete-bookmark/${adminId}/${userId}`, { method: 'DELETE' });
      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== userId));
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  return (
    <>
    {pageload && <Ripple /> }
    { !pageload && (<div className="flex-1 pt-10 w-100">
      <div className="w-full px-6 md:px-6 lg:px-10 pb-10 lg:pb-20 xl:pb-20">
        <header className="w-full h-16">
          <div className="mt-auto max-w-full pl-6">
            <h1 className="text-4xl tracking-tight font-semibold text-left">BookMarks</h1>
          </div>
        </header>
        <div className="bg-white m-auto w-[95%] min-h-[70vh] flex flex-col p-10 rounded-xl drop-shadow-lg">
          {bookmarks.length > 0 ? (
            <div role="list" className="flex flex-col gap-4">
              {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="flex justify-between items-center gap-x-6 py-4 w-full min-h-[10px]">
                  <div className="min-w-0 flex-auto">
                    <p className="text-lg font-semibold text-gray-900">{bookmark.name}</p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => navigate(`/user/${bookmark.id}`)}
                    >
                      View Profile
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleRemove(bookmark.id)}
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





 