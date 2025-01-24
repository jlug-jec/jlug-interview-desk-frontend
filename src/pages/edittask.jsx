import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import check from '../assets/check.png';
import Pencil from '../assets/Pencil.png';
import cancel from '../assets/Cancel.png';
import { Toaster, toast } from 'react-hot-toast';

export default function Add() {
  const { id } = useParams();
  let adminid = localStorage.getItem('userid');
  adminid = adminid.replace(/['"]+/g, '');
  const name = localStorage.getItem('user').name;
  const [file, setFile] = useState(null);
  const [actionload, setActionLoad] = useState(false);

  const [originalData, setOriginalData] = useState(null);
  const [data, setData] = useState({
    adminid: '',
    tname: '',
    tdesc: '',
    tcatg: '',
    tstat: '',
    tsub: '',
    tdead: new Date().toISOString().split('T')[0],
    tfile: '',
    by: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`https://firebase-api-hrly.onrender.com/tasks/${id}`);
        const result = await response.json();
        setOriginalData(result);
        setData(result);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDiscard = () => {
    setData(originalData);
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    setActionLoad(true);
    const { tname, tdesc, tcatg, tstat, tsub, tdead } = data;
    const admin = localStorage.getItem('user');

    const adminObj = admin ? JSON.parse(admin) : null;

    if (!adminObj) {
      toast.error('Please Login as admin to continue!');
      return;
    }

    try {
      let uploadResult = 'nothing';
      if (file != null) {
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dqcqijw3c/image/upload`;
        const uploadPreset = 'sample-img';

        const imageData = new FormData();
        imageData.append('file', file);
        imageData.append('upload_preset', uploadPreset);
        imageData.append('cloud_name', 'dqcqijw3c');

        const response = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: imageData,
        });

        uploadResult = await response.json();

        if (!uploadResult.secure_url) {
          toast.error('Image upload failed!');
          return;
        }
      }

      const taskData = {
        tname,
        tdesc,
        tcatg,
        tstat,
        tsub,
        tdead,
        tfileUrl: uploadResult === 'nothing' ? originalData.tfileUrl : uploadResult.secure_url,
        by: adminObj.name,
        adminid: adminid,
      };

      const apiResponse = await fetch(
        `https://firebase-api-hrly.onrender.com/update-task/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        }
      );

      const apiResult = await apiResponse.json();

      if (apiResult.message === 'Task successfully updated!') {
        toast.success('Task added successfully!');
        setData(taskData);
        setOriginalData(taskData);
        setFile(null);
        setActionLoad(false);
      } else {
        setActionLoad(false);
        alert('Failed to add task!');
      }
    } catch (error) {
      console.error('Error during save:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setActionLoad(false);
      setIsEditing(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  
  return (
    <div className="flex flex-col m-auto w-full ">
      <Toaster />
      <div className="flex flex-row w-full gap-9 pt-1 justify-between">
        <p className="text-left text-nowrap md:text-4xl text-3xl font-medium  md:pl-10 p-4 ">
          {isEditing ? 'Edit Task' : 'View Task'}
        </p>
        <div className="flex flex-row gap-5 p-3 justify-center md:pr-9 pr-6 items-center">
          {adminid === data.adminid && !isEditing && (
            <div
              className="cursor-pointer flex flex-column gap-2 justify-between items-center bg-bgprimary text-success border-2 hover:bg-success-hv border-success md:py-2 h-[70%] px-4 rounded"
              onClick={() => setIsEditing(true)}
            >
              <img src={Pencil} className="w-6 h-6" alt="Edit" />
              <div>Edit Task</div>
            </div>
          )}
          {isEditing && (
            <>
              <div
                className={`${actionload && 'animate-pulse cursor-not-allowed '} cursor-pointer flex flex-column gap-2 justify-between items-center bg-bgprimary text-success border-2 hover:bg-success-hv border-success py-2 md:px-4  px-2 rounded text-sm`}
                onClick={!actionload ? handleSubmit : null}
              >
                <img src={check} className="w-6 h-6" alt="Save" />
                <div>Save</div>
              </div>

              <div
                className={`${actionload && 'opacity-50 cursor-not-allowed '}cursor-pointer flex flex-column gap-2 justify-between items-center bg-bgprimary text-discard border-2 hover:bg-discard-hv border-discard py-2 md:px-4  px-2 rounded text-sm`}
                onClick={!actionload ? handleDiscard : null}
              >
                <img src={cancel} className="w-6 h-6" alt="Cancel" />
                <div>Cancel</div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white m-auto md:w-[85%] w-[95%] h-auto flex flex-col p-4 rounded-xl drop-shadow-lg relative z-[1]   md:mb-0 mb-20">
        <div className="flex flex-col lg:flex-row gap-5 p-5 md:items-center">
          <p className="text-left self-left text-[20px] md:w-[20%] font-medium">Task Name</p>
          <input
            className="bg-form-input w-full lg:w-[80%] p-4 border-none rounded-xl text-[16px]"
            name="tname"
            value={data.tname}
            type="text"
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 p-5 md:items-center">
          <p className="text-left self-left text-[20px] md:w-[20%] font-medium">Task Description</p>
          <input
            className="bg-form-input w-full md:w-[80%] p-4 border-none rounded-xl text-[16px]"
            name="tdesc"
            value={data.tdesc}
            type="text"
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-7 p-5">
          <div className="flex flex-col lg:flex-row gap-7 w-full md:items-center">
            <p className="text-left self-left text-[20px] md:w-[50%] font-medium">Task Category</p>
            <select
              className="bg-form-input w-full md:w-[70%] p-4 border-none rounded-xl text-[16px]"
              name="tcatg"
              value={data.tcatg}
              disabled={!isEditing}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="Web">Web</option>
              <option value="App">App</option>
              <option value="Docx">Document / Text</option>
            </select>
          </div>

          <div className="flex flex-col lg:flex-row gap-7 w-full md:items-center">
            <p className="text-left self-left text-[20px] md:w-[50%] font-medium">Task Status</p>
            <select
              className="bg-form-input w-full md:w-[70%] p-4 border-none rounded-xl text-[16px]"
              name="tstat"
              value={data.tstat}
              disabled={!isEditing}
              onChange={handleInputChange}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-7 p-5 md:items-center ">
          <p className="text-left self-left text-[20px] md:w-[20%] font-medium">Deadline</p>
          <input
            className="bg-form-input w-full md:w-[50%] p-4 border-none rounded-xl text-[16px]"
            name="tdead"
            type="date"
            value={data.tdead}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-7 p-5 md:items-center">
          <p className="text-left self-left text-[20px] md:w-[20%] font-medium">Task File</p>
          <input
            type="file"
            accept="image/*"
            className="p-1 w-full lg:w-[50%] text-gray-700"
            onChange={handleFileChange}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
}
