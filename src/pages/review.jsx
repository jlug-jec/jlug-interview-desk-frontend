import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import avatar1 from '../assets/3d_avatar_1.png';

import Ripple from '../components/Ripple';
const Review = () => {
  const [applicants, setApplicants] = useState([]);
  const adminId = localStorage.getItem('userid')
  let user = localStorage.getItem('user')
  user = JSON.parse(user)
  let domain = user.domain
  const [pageload, setPageLoad] = useState(true);

  useEffect(() => {
    const fetchPendingApplicants = async () => {
      setPageLoad(true)
      try {
        const response = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/pending/${adminId}/${domain}`);
        if (response.ok) {
          const data = await response.json();
          setApplicants(data);
        } else {
          console.error('Failed to fetch applicants');
        }
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }finally{
        setPageLoad(false)
      }
    };

    fetchPendingApplicants();
  }, [adminId]);


  console.log(adminId)
  console.log(applicants)
  return (
    <>
      {pageload && <Ripple />} 
      
      {!pageload && (
        <div className="flex-1 pt-10 w-full">
          <div className="w-full px-6 md:px-6 lg:px-10 pb-10 lg:pb-20 xl:pb-20">
            <header className="w-full h-16">
              <div className="mt-auto max-w-full pl-6">
                <h1 className="text-4xl tracking-tight font-semibold text-left">
                  Review Applications
                </h1>
              </div>
            </header>
            <div className="bg-white m-auto w-[95%] min-h-[70vh] flex flex-col p-4 rounded-xl drop-shadow-lg">
              <div className="p-3">
                {applicants.length > 0 ? (
                  applicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      className="flex items-center gap-4 w-full p-4 mb-4 "
                    >
                      <img
                        src={avatar1}
                        alt={`Avatar of ${applicant.name}`}
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      />
                      <div className="flex flex-row justify-between w-full items-center">
                        <span className="text-lg font-medium ml-4">
                          {applicant.name}
                        </span>

                        <Link to={`/user/${applicant.id}`}>
                          <div className="font-semibold shadow-md border-2 border-primary text-primary px-4 py-1 rounded-lg hover:bg-primary hover:text-white">
                            View Profile
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No pending applications to review.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;