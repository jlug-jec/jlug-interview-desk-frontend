import React, { createContext, useState, useContext, useCallback } from 'react';
import { useEffect } from 'react';
import {toast} from 'react-hot-toast';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const storedUser = sessionStorage.getItem('user');
    const id = JSON.parse(sessionStorage.getItem('userid'));

    const userObj = JSON.parse(storedUser)
    
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState();
    const [userData, setUserData] = useState();
    const [userSubmissions, setUserSubmissions] = useState([]);
    const [pageload, setPageLoad] = useState(true);
    const [load, setLoading] = useState(false)
    const [actionload, setActionLoad] = useState(false)

    const fetchDomainTasks = useCallback(async () => {
        setPageLoad(true)
        const domain  = userObj.domain
    
        try {
          const response = await fetch('https://firebase-api-hrly.onrender.com/get-tasks-by-domain', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ domain }),
          });
      
          if (!response.ok) {
            throw new Error('Error fetching tasks');
          }
      
          const tasks = await response.json();
          setTasks(tasks)

        } catch (error) {
          console.error('Error fetching tasks:', error);

        }finally{
          setPageLoad(false)
        }
      }, []);
    
    

      const fetchUserData = useCallback(async () => {
        setPageLoad(true)
        try {
            console.log('fetching user data.....')
          const userResponse = await fetch(`https://firebase-api-hrly.onrender.com/api/get-user/${id}`);
          if (!userResponse.ok) throw new Error('Failed to fetch user details.');
          const userData = await userResponse.json();
          setUserData(userData);
    
          const submissionsResponse = await fetch(`https://firebase-api-hrly.onrender.com/api/get-submissions/${id}`);
          if (!submissionsResponse.ok) throw new Error('Failed to fetch submissions.');
          const submissionsData = await submissionsResponse.json();
          setUserSubmissions(submissionsData);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
        finally{
            setPageLoad(false)
        }
    
    },[]);


    const fetchTask = useCallback(async (id) => {
        setLoading(true)
        try {
          const response = await fetch(`https://firebase-api-hrly.onrender.com/tasks/${id}`); 
          const result = await response.json();
          setTask(result); 
        } catch (error) {
          console.error('Error fetching task:', error);
        } finally {
          setLoading(false);
        }
      }, [id]);

      const handleModalSubmit = useCallback(async (task, tid, submissionUrl) => {
        setActionLoad(true);
        let userId = sessionStorage.getItem('userid');
        userId = JSON.parse(userId);
        const today = new Date();
        const deadline = new Date(task.tdead);
      
        if (!userId || !submissionUrl) {
          alert('Missing user ID or submission URL');
          setActionLoad(false);
          return;
        }
      
        if (today > deadline) {
          toast.error('The task deadline has passed. Submissions are no longer accepted.');
          setActionLoad(false);
          return;
        }
      
        if (task.tstat === 'suspended') {
          toast.error('The task is no longer accepting submissions.');
          setActionLoad(false);
          return;
        }
      
        try {
          const submitTaskResponse = await fetch(
            'https://firebase-api-hrly.onrender.com/api/submit-task',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId, taskId: tid, submissionUrl }),
            }
          );
      
          if (!submitTaskResponse.ok) {
            const errorData = await submitTaskResponse.json();
            toast.error(errorData.message)
            setActionLoad(false)
            return;
          }
          
            const { submissionId } = await submitTaskResponse.json();
      
            const updateUserResponse = await fetch(
              `https://firebase-api-hrly.onrender.com/api/update/${userId}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ submissionId }),
              }
            );
        
            if (!updateUserResponse.ok) {
              const errorData = await updateUserResponse.json();
              throw new Error(errorData.error || 'Failed to update user submissions');
            }
        
            toast.success('Task submitted successfully!');
          
        } catch (error) {
          console.error('Error handling submission:', error);
          toast.error('Submission failed. Please try again.');
        } finally {
          setActionLoad(false);
        }
      }, []);
      
    useEffect(() => {
      if(id && storedUser){
        fetchDomainTasks(),
        fetchUserData()
      }
      }, [fetchDomainTasks, fetchUserData]);
    
    const value = {
        fetchDomainTasks,
        tasks,
        userSubmissions,
        pageload,
        userData,
        fetchUserData,
        fetchTask,
        task,
        load,
        handleModalSubmit,
        actionload,
    };
    

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
    };

    export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within an UserProvider');
    }
    return context;
    }; 