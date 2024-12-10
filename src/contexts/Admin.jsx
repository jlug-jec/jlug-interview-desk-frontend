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
      const [load, setLoading] = useState(false);
      const [leaderboard, setLeaderboard] = useState([]);
      const [pendingApplicants, setPendingApplicants] = useState([]);
      const [bookmarks, setBookmarks] = useState({});

      const user = JSON.parse(localStorage.getItem('user'));
      const adminId = localStorage.getItem('userid');

        if (!user) {
        console.error('User not found in localStorage');
        return;
        }

        console.log(user)
        const { domain, submissions, approvedby } = user;
    

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/users/${domain}`); 
      const data = await response.json();
      const filteredUsers = data.filter(
        (u) => u.domain === domain && !u.email.includes('admin')
      );

      
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
  }, []);

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
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    } finally {
      setLoading(false);
    }
  }, [adminId]);

  console.log(bookmarks)

useEffect(() => {
  fetchDashboardData();
  fetchLeaderboardData();
  fetchPendingApplicants();
  fetchBookmarks();
}, [fetchDashboardData, fetchLeaderboardData, fetchPendingApplicants, fetchBookmarks]);


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
    handleRemoveBookmark
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
