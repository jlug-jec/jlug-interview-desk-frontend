import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import check from '../assets/check.png';
import Pencil from '../assets/Pencil.png';
import cancel from '../assets/Cancel.png';

export default function Add() {
  const { id } = useParams();
  let adminid = localStorage.getItem('userid');
  adminid =  adminid.replace(/['"]+/g, '');
  const name = localStorage.getItem('user').name
  const [file, setFile] = useState(null);

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
        const response = await fetch(`http://127.0.0.1:5001/fir-api-5316a/us-central1/app/tasks/${id}`);
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
    const { tname, tdesc, tcatg, tstat, tsub, tdead } = data;
    const admin = localStorage.getItem('user');

    const adminObj = admin ? JSON.parse(admin) : null;
  
    if (!adminObj) {
      alert("Please Login as admin to continue!");
      return;
    }
  
    if (!tname || !tdesc || !tcatg || !tstat || !tsub || !tdead || !file) {
      alert("Please fill all the fields and select a file!");
      return;
    }
  
    try {
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
  
      const uploadResult = await response.json();
  
      if (!uploadResult.secure_url) {
        alert('Image upload failed!');
        return;
      }
  
      const taskData = {
        tname,
        tdesc,
        tcatg,
        tstat,
        tsub,
        tdead,
        tfileUrl: uploadResult.secure_url, 
        by: adminObj.name,
        adminid: adminid, 
      };

      const apiResponse = await fetch(
        `http://127.0.0.1:5001/fir-api-5316a/us-central1/app/update-task/${id}`,
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
        alert('Task added successfully!');
        setData(taskData);
        setOriginalData(taskData);
        setFile(null);
      } else {
        alert('Failed to add task!');
      }
    } catch (error) {
      console.error('Error during save:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  

  console.log(data)

  return (
    <div className="flex flex-col m-auto w-100 h-screen">
      <div className="flex flex-row w-[100%] gap-9 pt-1 justify-between">
        <p className="text-left text-4xl font-medium p-[1%] pl-[3%]">
          {isEditing ? 'Edit Task' : 'View Task'}
        </p>
        <div className="flex flex-row gap-5 p-3 justify-center pr-9">
          {adminid === data.adminid && !isEditing && (
            <div
              className="cursor-pointer flex flex-column gap-2 justify-between items-center bg-bgprimary text-success border-2 hover:bg-success-hv border-success py-2 px-4 rounded"
              onClick={() => setIsEditing(true)}
            >
              <img src={Pencil} className="w-6 h-6" alt="Edit" />
              <div>Edit Task</div>
            </div>
          )}
          {isEditing && (
            <>
              <div
                className="cursor-pointer flex flex-column gap-2 justify-between items-center bg-bgprimary text-success border-2 hover:bg-success-hv border-success py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                <img src={check} className="w-6 h-6" alt="Save" />
                <div>Save</div>
              </div>

              <div
                className="cursor-pointer flex flex-column gap-2 justify-between items-center bg-bgprimary text-discard border-2 hover:bg-discard-hv border-discard py-2 px-4 rounded"
                onClick={handleDiscard}
              >
                <img src={cancel} className="w-6 h-6" alt="Cancel" />
                <div>Cancel</div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white m-auto w-[95%] h-[85%] flex flex-col p-4 rounded-xl drop-shadow-lg">
        <div className="flex flex-row w-full gap-5 p-5">
          <p className="text-center self-center text-[20px] w-[10%] font-medium">Task Name</p>
          <input
            className="bg-form-input w-[90%] p-4 border-none rounded-xl text-[16px]"
            name="tname"
            value={data.tname}
            type="text"
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-row w-full gap-5 p-5">
          <p className="text-center self-center text-[20px] w-[10%] font-medium">Task Description</p>
          <input
            className="bg-form-input w-[90%] p-4 border-none rounded-xl text-[16px]"
            name="tdesc"
            value={data.tdesc}
            type="text"
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-row w-[100%] gap-9 p-5">
          <div className="flex flex-row w-[50%] gap-7">
            <p className="text-center self-center text-[20px] w-[25%] font-medium">Task Category</p>
            <select
              className="bg-form-input w-full p-4 border-none rounded-xl"
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

          <div className="flex flex-row w-[50%] gap-7">
            <p className="text-center self-center text-[20px] w-[25%] font-medium">Task Status</p>
            <select
              className="bg-form-input w-full p-4 border-none rounded-xl"
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

        <div className="flex flex-row gap-7 p-5 w-[50%]">
          <p className="text-center self-center text-[20px] w-[25%] font-medium">Submission Type</p>
          <select
            className="bg-form-input w-full p-4 border-none rounded-xl"
            name="tsub"
            value={data.tsub}
            disabled={!isEditing}
            onChange={handleInputChange}
          >
            <option value="">Select Submission Type</option>
            <option value="PDF">PDF</option>
            <option value="IMG">Image</option>
            <option value="URL">URL</option>
          </select>
        </div>

        <div className="flex flex-row gap-8 p-5 w-[50%]">
          <p className="text-center self-center text-[20px] w-[25%] font-medium">Add a Deadline</p>
          <input
            type="date"
            className="bg-form-input w-[100%] p-4 border-none rounded-xl text-[16px]"
            value={data.tdead}
            name="tdead"
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-row gap-8 p-5 w-[50%]">
          <p className="text-center self-center text-[20px] w-[20%] font-medium">Example File</p>
          {!isEditing ? (
            <Link to={data.tfileUrl} >
                <div className="bg-primary text-white px-4 py-2 rounded">
                View File
                </div>
            </Link>
          ) : (
            <input
              accept="image/png, image/jpeg, image/jpg"
              id="file"
              type="file"
              className="self-center"
              name="tfile"
              disabled={!isEditing}
              onChange={handleFileChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}



