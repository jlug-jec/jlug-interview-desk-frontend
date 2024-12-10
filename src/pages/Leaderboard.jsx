import React, { useState, useEffect } from 'react';
import avatar1 from '../assets/3d_avatar_1.png';
import { Link } from 'react-router-dom';
import avatar2 from '../assets/3d_avatar_13.png';
import star from '../assets/Star.png';
import Ripple from '../components/Ripple';

const Leader = () => {
  const avatars = {
    1: avatar1,
    2: avatar2,
  };

  const [data, setdata] = useState([]);
  const [pageload, setPageLoad] = useState(true);
  
  useEffect(() => {
    setPageLoad(true)
    const fetchLeaderboard = async () => {
      try {
        const domain = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).domain : '';
        console.log(domain)
        if (!domain) {
          console.error("Domain not found in localStorage");
          return;
        }

        const response = await fetch('http://127.0.0.1:5001/fir-api-5316a/us-central1/app/leaderboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ domain : domain}),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }

        const data = await response.json();
        setdata(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally{
        setPageLoad(false)
      }
    };

    fetchLeaderboard();
  }, []);

  console.log(data)


  return (
<>
    {pageload && <Ripple />} 
      {!pageload && (
        <div className="flex-1 pt-10 w-100">
          <div className="w-full px-6 md:px-6 lg:px-10 pb-10 lg:pb-20 xl:pb-20">
            <header className="w-full h-16">
              <div className="mt-auto max-w-full pl-6">
                <h1 className="text-4xl tracking-tight font-semibold text-left">Leaderboard</h1>
              </div>
            </header>
            <div className="bg-white m-auto w-[95%] min-h-[70vh] flex flex-col p-10 rounded-xl drop-shadow-lg">
              {data.length > 0 ? (
                <div role="list" className="flex flex-col gap-4">
                  {data.map((bookmark) => (
                    <div
                      key={bookmark.name}
                      className="flex justify-between items-center gap-x-6 py-4 w-full min-h-[10px]"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <img
                          src={bookmark.dp}
                          alt={`Avatar of ${bookmark.name}`}
                          className="h-12 w-12 flex-none rounded-full bg-gray-50"
                        />
                        <div className="min-w-0 flex flex-auto items-center">
                          <p className="text-4 font-semibold leading-6 text-center text-gray-900">
                            {bookmark.name}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex items-center justify-between ${
                          bookmark.net < 10 ? 'gap-6' : 'gap-4'
                        }`}
                      >
                        <div className="text-yellow-500 h-7 w-7 flex justify-center items-center">
                          <img src={star} alt="star" />
                        </div>
                        <div>{bookmark.net < 0 ? '0' : bookmark.net}</div>

                        <Link to={`/user/${bookmark.id}`}>
                          <div className="font-semibold shadow-md border-2 border-primary text-primary px-4 py-1 rounded-lg hover:bg-primary hover:text-white">
                            View Profile
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center justify-center font-semibold text-lg text-gray-500">
                  <p>Leaderboard not available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Leader;
