import { React, useState } from 'react';
import upload from '../../assets/Upload.png';

export default function View() {
  const [data, setData] = useState({
    tname: 'Task Name',
    tdesc: 'description..',
    tcatg: 'Web / App / Document',
    tstat: 'Active',
    tsub: 'Pdf / image / url',
    tdead: new Date().toISOString().split('T')[0],
    tfile: ''
  });

  //handle submit me task upload aur database me store krne ka logic lagana hai


  const handleSubmit = () => {
    const { tname, tdesc, tcatg, tstat, tsub, tdead, tfile } = data;
    if (tname !== '' && tdesc !== '' && tcatg !== '' && tstat !== '' && tsub !== '' && tdead !== '' && tfile !== '') {
      console.log('after checking the data will be sent to api');
    }
  };

  return (
    <div className="flex flex-col m-auto w-100 h-screen">
      <div className="flex flex-row w-[100%] gap-9 pt-1 justify-between">
        <p className="text-left text-4xl font-medium  p-[1%] pl-[3%]">
          Task / {data.tname}
        </p>
        <div className="flex flex-row gap-5 p-3 justify-center pr-9">
          <div
            className="cursor-pointer flex flex-column gap-2 justify-between font-semibold items-center bg-bgprimary text-primary border-[3px]  border-primary py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            <img src={upload} className="w-6 h-6" />
            <div>Submit Task</div>
          </div>
        </div>
      </div>

      <div className="bg-white m-auto w-[95%] h-[85%] flex flex-col p-4 rounded-xl drop-shadow-lg">
        <div className="flex flex-row w-full gap-5 p-5">
          <p className="text-center self-center text-[20px] w-[10%] font-medium">
            Task Name
          </p>
          <div className="bg-form-input w-[90%] p-4 border-none rounded-xl text-[20px]" name="tname">
            {data.tname}
          </div>
        </div>

        <div className="flex flex-row w-full gap-5 p-5">
          <p className="text-center self-center text-[20px] w-[10%] font-medium">
            Task Description
          </p>
          <div className="bg-form-input w-[90%] p-4 border-none rounded-xl text-[20px]" name="tdesc">
            {data.tdesc}
          </div>
        </div>

        <div className="flex flex-row w-[100%] gap-9 p-5">
          <div className="flex flex-row w-[50%] gap-7">
            <p className="text-center self-center text-[20px] w-[25%] font-medium">
              Task Category
            </p>
            <div className="bg-form-input w-full p-4 border-none rounded-xl">
              {data.tcatg}
            </div>
          </div>

          <div className="flex flex-row w-[50%] gap-7">
            <p className="text-center self-center text-[20px] w-[25%] font-medium">
              Task Status
            </p>
            <div className="bg-form-input w-full p-4 border-none rounded-xl">
              {data.tstat}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-7 p-5 w-[50%]">
          <p className="text-center self-center text-[20px] w-[25%] font-medium">
            Submission Category
          </p>
          <div className="bg-form-input w-full p-4 border-none rounded-xl">
            {data.tsub}
          </div>
        </div>

        <div className="flex flex-row gap-8 p-5 w-[50%]">
          <p className="text-center self-center text-[20px] w-[25%] font-medium">
            Deadline
          </p>
          <div className="bg-form-input w-[100%] p-4 border-none rounded-xl">
            {data.tdead}
          </div>
        </div>

        <div className="flex flex-row gap-8 p-5 w-[50%]">
          <p className="text-center self-center text-[20px] w-[20%] font-medium">
            An Example
          </p>
          <div className="bg-form-input w-full p-4 border-none rounded-xl">
            {data.tfile ? 'File uploaded' : 'No file uploaded'}
          </div>
        </div>
      </div>
    </div>
  );
}
