import React, { createContext, useState, useContext, useCallback } from 'react';
import { useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [stats, setStats] = useState({
        totalApplicants: 0,
        applicationsReviewed: 0,
        pendingApplications: 0,
        applicationsBookmarked: 0,
      });
      const [userData, setUserData] = useState();
      const [submission, setSubmission] = useState();
      const [load, setLoading] = useState(false);
      const [leaderboard, setLeaderboard] = useState([]);
      const [pendingApplicants, setPendingApplicants] = useState([]);
      const [bookmarks, setBookmarks] = useState({});

      let adminId = localStorage.getItem('userid');
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user)
  

  const fetchDashboardData = useCallback(async () => {
    
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/users/${user.domain}`); 
      const data = await response.json();
      const filteredUsers = data.filter(
        (u) => u.domain === user.domain && !u.email.includes('admin')
      );

      const adminResponse = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/get-user/${adminId}`);
      if (!adminResponse.ok) throw new Error('Failed to fetch admin details.');
      const adminData = await adminResponse.json();
      localStorage.setItem('user', JSON.stringify(adminData))

      let { domain, submissions, approvedby } = adminData
      
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
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchLeaderboardData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/leaderboard`, {
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
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }, [ ]);

  const fetchPendingApplicants = useCallback(async () => {
    setLoading(true);
    try {
        const response = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/pending/${adminId}/${user.domain}`);
        if (!response.ok) {
          throw new Error('Failed to fetch pending applicants');
        }
  
        const data = await response.json();
        console.log('Pending Applicants:', data);
  
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }

      setPendingApplicants(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBookmarks = useCallback(async () => {
    adminId = adminId.replace(/['"]+/g, '');
    console.log(adminId)
    setLoading(true);
    try {
        const response = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/bookmarked/${adminId}`);

        const data = await response.json();
        setBookmarks(data)
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally{
        setLoading(false)
      }
  }, []);

  const handleRemoveBookmark = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/delete-bookmark/${adminId}/${userId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete bookmark');
      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== userId));
      await fetchDashboardData()
      await fetchBookmarks()
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    } finally {
      setLoading(false);
    }
  }, [adminId]);

  const fetchUserData = useCallback(async (id) => {
    try {
      const userResponse = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/get-user/${id}`);
      if (!userResponse.ok) throw new Error('Failed to fetch user details.');
      const userData = await userResponse.json();
      setUserData(userData);

      const submissionsResponse = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/get-submissions/${id}`);
      if (!submissionsResponse.ok) throw new Error('Failed to fetch submissions.');
      const submissionsData = await submissionsResponse.json();
      setSubmission(submissionsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

},[]);

const handleAction = useCallback(async (actionType, id) => {
  try {
    const response = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/${actionType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: id , adminId : adminId}),
    });

    const data = await response.json();
    alert(data.message || `Action ${actionType} completed successfully.`);
    await fetchUserData(id)
    await fetchPendingApplicants()
    await fetchDashboardData();
    await fetchLeaderboardData()
    await fetchBookmarks()
  } catch (error) {

    console.error(`Error during ${actionType}:`, error);
    alert(`Error during ${actionType}.`);
  }
},[]);

  console.log(bookmarks)

useEffect(() => {
  fetchDashboardData();
  fetchLeaderboardData();
  fetchPendingApplicants();
  fetchBookmarks();
}, [fetchDashboardData, fetchLeaderboardData, fetchPendingApplicants, fetchBookmarks,]);


  const value = {
    stats,
    leaderboard,
    pendingApplicants,
    load,
    fetchDashboardData,
    fetchLeaderboardData,
    fetchPendingApplicants,
    fetchBookmarks,
    bookmarks,
    handleRemoveBookmark,
    userData,
    fetchUserData,
    submission,
    handleAction
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};
