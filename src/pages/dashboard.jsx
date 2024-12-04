import { useState, useEffect } from 'react';
import approve from '../assets/Approval.png';
import people from '../assets/People.png';
import book from '../assets/Bookmark.png';
import time from '../assets/Time.png';
import star from '../assets/Star.png';
import { Link } from 'react-router-dom';
import avatar1 from '../assets/3d_avatar_1.png';

function Dashboard() {
  const [stats, setStats] = useState({
    totalApplicants: 0,
    applicationsReviewed: 0,
    pendingApplications: 0,
    applicationsBookmarked: 0,
  });

  const [leaderboard, setLeaderboard] = useState([]);
  const [pendingApplicants, setPendingApplicants] = useState([]);

  const image = [people, approve, time, book];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      console.error('User not found in localStorage');
      return;
    }

    const { domain, submissions, approvedby } = user;
    console.log(submissions, approvedby)

    fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/users/${domain}`)
      .then((response) => response.json())
      .then((users) => {
        const filteredUsers = users.filter(
          (u) => u.domain === domain && !u.email.includes('admin')
        );

        console.log(filteredUsers)

        const totalApplicants = filteredUsers.length;
        const applicationsReviewed = approvedby.length;
        const applicationsBookmarked = submissions.length;
        const pendingApplications = totalApplicants - applicationsReviewed;

        setStats({
          totalApplicants,
          applicationsReviewed,
          pendingApplications,
          applicationsBookmarked,
        });
      })
      .catch((error) => console.error('Error fetching users:', error));

  }, []);


  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.domain) {
          console.error('User domain not found in localStorage');
          return;
        }
  
        const response = await fetch('http://127.0.0.1:5001/fir-api-5316a/us-central1/app/leaderboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ domain: user.domain }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
  
        const data = await response.json();
        console.log('Leaderboard Data:', data);
  
        setLeaderboard(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };
  
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const fetchPendingApplicants = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.adminId) {
          console.error('Admin ID not found in localStorage');
          return;
        }
  
        const response = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/pending/${user.adminId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch pending applicants');
        }
  
        const data = await response.json();
        console.log('Pending Applicants:', data);
  
        setPendingApplicants(data);
      } catch (error) {
        console.error('Error fetching pending applicants:', error);
      }
    };
  
    fetchPendingApplicants();
  }, []);
  

  console.log(stats)

  return (
    <>{(stats.totalApplicants != 0) &&
      <div className="bg-zinc-100 pb-10 w-100 h-full">
        <h1 className="font-semibold p-10 text-4xl">Dashboard</h1>
        <div className="flex justify-between ml-14 mb-14 mr-14 pl-8 pr-8">
          {[
            { count: stats.totalApplicants, text: 'Total Applicants' },
            { count: stats.applicationsReviewed, text: 'Applications Reviewed' },
            { count: stats.pendingApplications, text: 'Pending Applications' },
            { count: stats.applicationsBookmarked, text: 'Applications Bookmarked' },
          ].map((pop, i) => (
            <div
              key={i}
              className="w-64 h-32 flex justify-center items-center rounded-lg bg-white shadow-md shadow-zinc-400"
            >
              <div className="flex items-center">
                <img className="w-16 h-16" src={image[i]} alt="" />
              </div>
              <div className="flex-col w-32 text-center items-center justify-center">
                <h1 className="text-2xl">{pop.count}</h1>
                <h3 className="text-zinc-500">{pop.text}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-full flex gap-3">
          
        <div className="w-3/5 h-auto ml-12 p-10 bg-white shadow-md shadow-zinc-400 rounded-lg">
          <h1 className="w-full border-b-2 pb-2 border-black font-semibold text-xl">Leader Board</h1>
          {leaderboard.map((student, i) => (
            <div
              key={i}
              className="mt-5 flex justify-between hover:bg-purple-100 p-5 rounded-lg items-center"
            >
              <div className="flex items-center gap-6">
                <img
                  className="w-16 h-16 bg-red-400 rounded-full"
                  src={student.image || avatar1} 
                  alt=""
                />
                <h1>{student.name}</h1>
              </div>
              <div className="flex gap-3 items-center">
                <img className="w-7 h-7" src={star} alt="" />
                <h1>{student.net}</h1>
              </div>
            </div>
          ))}
          <Link to={`/leader`}>
            <div className="font-semibold border-2 w-[50%] text-center h-[10%] border-[#23B0FF] text-[#23B0FF] px-4 py-2 rounded-lg m-auto">
              View Leaderboard
            </div>
          </Link>
        </div>


        <div className="w-2/5 h-auto mr-10 p-10 bg-white shadow-md shadow-zinc-400 rounded-lg">
          <h1 className="border-b-2 pb-2 border-black font-semibold text-xl">Pending Applicants</h1>
          {pendingApplicants.map((applicant, i) => (
            <div
              key={i}
              className="mt-5 flex justify-between hover:bg-purple-100 p-5 rounded-lg items-center"
            >
              <div className="flex items-center gap-6">
                <img
                  className="w-16 h-16 bg-red-400 rounded-full"
                  src={avatar1} 
                  alt=""
                />
                <h1>{applicant.name}</h1>
              </div>
            </div>
          ))}
          <Link to={`/userd/view/}`}>
            <div className="font-semibold border-2 mt-2 text-center  w-[50%]  h-[10%] border-[#23B0FF] text-[#23B0FF] px-4 py-2 rounded-lg m-auto">
              View Pending Applicants
            </div>
          </Link>
        </div>
      </div>

      </div>}
    </>
  );
}

export default Dashboard;
