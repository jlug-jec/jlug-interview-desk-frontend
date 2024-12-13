import { React, useState } from 'react';
import check from '../assets/check.png';
import cancel from '../assets/Cancel.png';

export default function Add() {
  let adminid = localStorage.getItem('userid');
  adminid = JSON.parse(adminid);
  const [actionload, setActionLoad] = useState(false);

  const [data, setData] = useState({
    tname: '',
    tdesc: '',
    tcatg: '',
    tstat: '',
    tsub: '',
    tdead: new Date().toISOString().split('T')[0],
    tfile: '',
    by: ''
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    const fileName = file.name.toLowerCase();
    if (fileName.includes('png') || fileName.includes('jpg') || fileName.includes('jpeg')) {
      console.log('File selected, preparing to upload...');
      const alldata = { ...data };
      alldata['tfile'] = file;
      setData(alldata);
    } else {
      console.log('Invalid file type');
    }
  };

  const handleChange = (e) => {
    const alldata = { ...data };
    alldata[e.target.name] = e.target.value;
    setData(alldata);
  };

  const handleDate = (date) => {
    const newdate = new Date(date).toISOString().split('T')[0];
    const alldata = { ...data };
    alldata['tdead'] = newdate;
    setData(alldata);
  };

  const handleSubmit = async () => {
    setActionLoad(true);
    const { tname, tdesc, tcatg, tstat, tsub, tdead, tfile } = data;
    const admin = localStorage.getItem('user');
    const adminObj = JSON.parse(admin);
    if (!admin) {
      alert('Please Login as admin to Continue!');
    }

    if (tname !== '' && tdesc !== '' && tcatg !== '' && tstat !== '' && tsub !== '' && tdead !== '' && tfile !== '') {
      console.log('Data will be sent to the API');

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dqcqijw3c/image/upload`;
      const uploadPreset = 'sample-img';

      const imageData = new FormData();
      imageData.append('file', tfile);
      imageData.append('upload_preset', uploadPreset);
      imageData.append('cloud_name', 'dqcqijw3c');

      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: imageData,
      });

      const uploadResult = await response.json();

      if (!uploadResult.secure_url) {
        throw new Error('Image upload failed');
      } else {
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
          domain: adminObj.domain
        };

        const apiResponse = await fetch('https://firebase-api-hrly.onrender.com/add-task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        });

        const apiResult = await apiResponse.json();
        if (apiResult.message === 'Task successfully added!') {
          
          alert('Task was added successfully!');
          setActionLoad(false);
        } else {
          console.error('Failed to add task to Firebase');
          alert('Oops! Something went wrong');
          setActionLoad(false);
        }
      }
    }
  };

  const handleDiscard = () => {
    setData({
      tname: '',
      tdesc: '',
      tcatg: '',
      tstat: '',
      tsub: '',
      tdead: new Date().toISOString().split('T')[0],
      tfile: ''
    });

    const fileInput = document.getElementById('file');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className='flex flex-col m-auto w-full  '>
      <div className='flex flex-row w-full gap-7 pt-1 justify-between'>
        <p className='text-left md:text-4xl text-2xl text-nowrap font-medium p-10 md:pl-10 pl-7'>
          Add Task
        </p>
        <div className='flex flex-row gap-5 p-3 justify-center  items-center md:pr-9 pr-5'>
          <div
            className={`${actionload && 'animate-pulse cursor-not-allowed'} cursor-pointer flex  gap-2 justify-between items-center bg-bgprimary text-success border-2 hover:bg-success-hv border-success py-2 h-[50%] md:px-4 px-7 pl-1 text-sm rounded`}
            onClick={!actionload ? handleSubmit : null}
          >
            <img src={check} className='w-6 h-6 md:text-nowrap text-sm' />
            <div>Confirm</div>
          </div>

          <div
            className={`${actionload && 'cursor-not-allowed opacity-50'} cursor-pointer flex  gap-2 justify-between items-center bg-bgprimary text-discard border-2 hover:bg-discard-hv border-discard py-2 h-[50%] md:px-4 px-7 pl-1 rounded text-sm`}
            onClick={!actionload ? handleDiscard : null}
          >
            <img src={cancel} className='w-6 h-6  ' />
            <div>Cancel</div>
          </div>
        </div>
      </div>

      <div className='bg-white m-auto md:w-[85%] w-[95%] flex flex-col p-4 rounded-xl drop-shadow-lg z-[-1] md:mb-0 mb-20'>
        <div className='flex flex-col lg:flex-row w-full gap-5 p-5 md:items-center'>
          <p className='text-left self-left text-[20px] md:w-[20%] font-medium'>Task Name</p>
          <input
            className='bg-form-input w-full md:w-[80%] p-4 border-none rounded-xl md:text-[16px] text-[12px]'
            name='tname'
            value={data.tname}
            onChange={handleChange}
            type='text'
          />
        </div>

        <div className='flex flex-col lg:flex-row w-full gap-5 p-5 md:items-center'>
          <p className='text-left self-left text-[20px] md:w-[20%] font-medium'>Task Description</p>
          <input
            className='bg-form-input w-full md:w-[80%] p-4 border-none rounded-xl md:text-[16px] text-[12px]'
            value={data.tdesc}
            name='tdesc'
            onChange={handleChange}
            type='text'
          />
        </div>

        <div className='flex flex-col lg:flex-row w-full gap-9 p-5'>
          <div className='flex flex-col lg:flex-row w-full gap-7'>
            <p className='text-left self-left text-[20px] md:w-[30%] font-medium'>Task Category</p>
            <select
              className='bg-form-input w-full md:p-4 p-3 border-none rounded-xl'
              name='tcatg'
              value={data.tcatg}
              onChange={handleChange}
            >
              <option value=''>Select Category</option>
              <option value='Web'>Web</option>
              <option value='App'>App</option>
              <option value='Docx'>Document / Text</option>
            </select>
          </div>

          <div className='flex flex-col lg:flex-row w-full gap-7'>
            <p className='text-left self-left text-[20px] md:w-[30%] font-medium'>Task Status</p>
            <select
              className='bg-form-input w-full md:p-4 p-3 border-none rounded-xl'
              name='tstat'
              value={data.tstat}
              onChange={handleChange}
            >
              <option value=''>Select Status</option>
              <option value='Active'>Active</option>
              <option value='Suspended'>Suspended</option>
            </select>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row w-full gap-8 p-5 md:items-center'>
          <p className='text-left self-left text-[20px] md:w-[20%] font-medium'>Submission Type</p>
          <select
            className='bg-form-input md:w-[80%] md:p-4 p-3 border-none rounded-xl'
            name='tsub'
            value={data.tsub}
            onChange={handleChange}
          >
            <option value=''>Select Submission Type</option>
            <option value='DRV'>Google Drive</option>
            <option value='GIT'>Github Repository</option>
          </select>
        </div>

        <div className='flex flex-col lg:flex-row w-full gap-8 p-5 md:items-center'>
          <p className='text-left self-left text-[20px] md:w-[20%] font-medium'>Add a deadline</p>
          <input
            className='bg-form-input w-full md:w-[80%] p-4 border-none rounded-xl text-[16px]'
            value={data.tdead}
            onChange={(e) => handleDate(e.target.value)}
            type='date'
          />
        </div>

        <div className='flex flex-col lg:flex-row w-full gap-9 p-5 md:items-center'>
          <p className='text-left self-left text-[20px] md:w-[20%] font-medium'>File Upload</p>
          <input
            type='file'
            id='file'
            className='md:p-2 w-full lg:w-[80%]'
            onChange={handleFile}
          />
        </div>
      </div>
    </div>
  );
}
