import approve from '../../assets/Approval.png';
import list from '../../assets/List.png';
import book from '../../assets/Bookmark.png';
import time from '../../assets/Time.png';
import { Link } from 'react-router-dom';
import Page from '../../assets/Page.png';
import Application from '../../assets/Application.png';
import Eye from '../../assets/Eye.png';
import { useUserContext } from '../../contexts/User';
import Ripple from '../../components/Ripple';
import { useState, useEffect } from 'react';
import star from '../../assets/Star.png'

function Dashboard() {
  const image = [list, approve, time, star];
  const storedUser = sessionStorage.getItem('user');
  const userObj = JSON.parse(storedUser)
  const id = JSON.parse(sessionStorage.getItem('userid'));
  const {
    fetchDomainTasks,
    tasks,
    userSubmissions,
    pageload,
    userData,
    fetchUserData,
  } = useUserContext();

  const totalTasks = tasks.length;
  const submittedTasks = userSubmissions.length;
  const pendingTasks = totalTasks - submittedTasks;

  useEffect(() => {
    if(userObj){
      fetchDomainTasks(userObj)
    }
    if(id){
        fetchUserData(id)
    }
  
  }, [id])
  

  const pop = [
    { count: totalTasks, text: 'Total Tasks' },
    { count: submittedTasks, text: 'Tasks Submitted' },
    { count: pendingTasks, text: 'Pending Tasks' },
    { count: Math.abs(userData.ups - userData.downs), text: 'Points Earned' },
  ];
if(pageload || !userData) return <Ripple />
  return (
    <>
    
      {userData && (
        <div className="bg-zinc-100 pb-10 w-full min-h-screen md:mb-0 mb-10">
          <h1 className="font-semibold p-6 md:pl-10 md:p-10 text-3xl md:text-4xl">Dashboard</h1>

          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-14 mb-8">
            {pop.map((item, i) => (
              <div
                key={i}
                className="flex flex-row items-center justify-between w-full h-28 p-4 bg-white shadow-md rounded-lg"
              >
                <img className="w-12 h-12 md:w-16 md:h-16" src={image[i]} alt="icon" />
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-xl md:text-2xl font-bold">{item.count}</h1>
                  <h3 className="text-zinc-500 text-sm md:text-base">{item.text}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6 px-6 md:px-14">
            <div className="w-full md:w-3/5 h-auto bg-white shadow-md p-6 rounded-lg">
              <h1 className="border-b pb-2 border-black font-semibold text-lg md:text-xl mb-4">All Tasks</h1>
              {tasks.slice(0, 3).map((task, i) => (
                <div
                  key={task.tname}
                  className="flex flex-col md:flex-row justify-between items-center mt-3 gap-4 py-2 "
                >
                  <div className="flex items-center md:min-w[35%] gap-4">
                    <img
                      src={task.tcatg === 'App' || task.tcatg === 'Web' ? Application : Page}
                      alt={task.tname}
                      className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gray-50"
                    />
                    <p className="text-sm md:text-base font-medium text-gray-900">{task.tname}</p>
                  </div>
                  <div className="text-sm md:text-base font-bold text-gray-900">{task.tcatg}</div>
                  <div className="flex items-center gap-4">
                    <div className="text-xs md:text-sm font-semibold border-2 border-green-500 text-green-500 px-3 py-1 rounded-lg">
                      {task.tstat}
                    </div>
                    <Link to={`/userd/view/${task.id}`} className="text-xs md:text-sm font-semibold border-2 border-blue-500 text-blue-500  hover:bg-blue-500 hover:text-white px-3 py-1 rounded-lg">
                      View
                    </Link>
                  </div>
                </div>
              ))}
              <Link
                to="/userd/tasks"
                className="flex items-center gap-3 font-semibold border-2 text-primary border-primary  px-4 py-2 mt-4 w-fit mx-auto rounded-lg"
              >
                <img src={Eye} className="w-5 h-5 md:w-7 md:h-7" alt="view-all" />
                View All Tasks
              </Link>
            </div>

            <div className="w-full md:w-2/5 h-auto bg-white shadow-md p-6 rounded-lg">
              <h1 className="border-b pb-2 border-black font-semibold text-lg md:text-xl">Application Status</h1>
              <div className="flex justify-center items-center mt-4 border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-lg text-sm md:text-base font-semibold">
                {userData && userData['approvedby'] && userData['approvedby']?.length > 0 ? 'In Review' : 'In Queue'}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
