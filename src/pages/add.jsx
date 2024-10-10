import {React, useState} from 'react'
import check from '../assets/check.png'
import cancel from '../assets/Cancel.png'
import Nav from '../Nav';

export default function Add() {

  const [data, setData] = useState({
    tname : '',
    tdesc : '',
    tcatg: '',
    tstat: '',
    tsub:'',
    tdead : new Date().toISOString().split('T')[0],
    tfile : ''
  });

  const handleFile = (e)=>{
    if(e.target.files[0].name.includes('png', 'jpg', 'jpeg')){
      console.log('to be  saved in firebase or something and then store the reference in data')
      const alldata = {...data};
      alldata['tfile'] = e.target.files[0].name
      setData(alldata)
    }
  }

  const handleChange = (e)=>{
      const alldata = {...data};
      console.log(e.target.name)
      alldata[e.target.name] = e.target.value;
      setData(alldata)
  }

  const handleDate = (date) => {

    const newdate = new Date(date).toISOString().split('T')[0];
    const alldata = { ...data };
    alldata['tdead'] = newdate;
    setData(alldata);
  };
  

  const handleSubmit = ()=>{
    const {tname, tdesc, tcatg,tstat, tsub, tdead, tfile}  = data;
    if(tname !== ''  & tdesc !=='' & tcatg !=='' & tstat !== '' & tsub !== '' & tdead !== '' & tfile !== ''){
      console.log('after checking the data will be sent to api')
    }
  }

  const handleDiscard = ()=>{
    setData({
      tname : '',
      tdesc : '',
      tcatg: '',
      tstat: '',
      tsub:'',
      tdead :  new Date().toISOString().split('T')[0],
      tfile : ''
    });

    const fileInput = document.getElementById('file');
    if (fileInput) {
      fileInput.value = '';
    }
  }

  console.log(data)

  return (
    <div className='flex flex-col m-auto w-100 h-screen'>
      <div className='flex flex-row w-[100%] gap-9 pt-1 justify-between'>
        <p className='text-left text-4xl font-medium  p-[1%] pl-[3%]'>
            Add Task
        </p>
        <div className='flex flex-row gap-5 p-3 justify-center pr-9'>

          <div className='cursor-pointer flex flex-column gap-2 justify-between items-center bg-bgprimary text-success border-2 hover:bg-success-hv border-success py-2 px-4 rounded' onClick={handleSubmit}> 
            <img src={check} className=' w-6 h-6'></img>
            <div>Confirm</div>
          </div> 

          <div className='cursor-pointer flex flex-column gap-2 justify-between items-center bg-bgprimary text-discard border-2 hover:bg-discard-hv border-discard py-2 px-4 rounded' onClick={handleDiscard}> 
            <img src={cancel} className=' w-6 h-6'></img>
            <div>Cancel</div>
          </div> 

        </div>
      </div>

        <div className=' bg-white m-auto w-[95%] h-[85%] flex flex-col p-4 rounded-xl drop-shadow-lg'>
          
          <div className='flex flex-row w-full gap-5 p-5'>
            <p className='text-center self-center text-[20px] w-[10%] font-medium '>Task Name</p>
            <input className='bg-form-input w-[90%] p-4 border-none rounded-xl text-[16px]' name='tname' value={data.tname} onChange={handleChange} type='text'></input>
          </div>

          <div className='flex flex-row w-full gap-5 p-5'>
            <p className='text-center self-center text-[20px] w-[10%] font-medium '>Task Description</p>
            <input className='bg-form-input w-[90%] p-4 border-none rounded-xl text-[16px]' value={data.tdesc} name='tdesc' onChange={handleChange} type='text'></input>
          </div>

          <div className='flex flex-row w-[100%] gap-9 p-5'>

            <div className='flex flex-row w-[50%] gap-7'>
              <p className='text-center self-center text-[20px] w-[25%] font-medium '>Task Category</p>
              <select className='bg-form-input w-full p-4 border-none rounded-xl' name='tcatg' value={data.tcatg} onChange={handleChange}>
                <option value=''>Select Category</option>
                <option value='web'>Web</option>
                <option value='app'>App</option>
                <option value='docx'>Document / Text</option>
              </select>
            </div>

            <div className='flex flex-row w-[50%] gap-7'>
              <p className='text-center self-center text-[20px] w-[25%] font-medium '>Task Status</p>
              <select className='bg-form-input w-full p-4 border-none rounded-xl' name='tstat' value={data.tstat} onChange={handleChange}>
                <option value=''>Select Status</option>
                <option value='active'>Active</option>
                <option value='suspended'>Suspended</option>
              </select>
            </div>

          </div>

          <div className='flex flex-row gap-7 p-5 w-[50%]'>
              <p className='text-center self-center text-[20px] w-[25%] font-medium '>Submission Category</p>
              <select className='bg-form-input w-full p-4 border-none rounded-xl' name='tsub' value={data.tsub} onChange={handleChange}>
                <option value=''>Select Submission Type</option>
                <option value='pdf'>PDF</option>
                <option value='img'>Image</option>
                <option value='link'>URL</option>
              </select>
          </div>


          <div className='flex flex-row gap-8 p-5 w-[50%]'>
              <p className='text-center self-center text-[20px] w-[25%] font-medium '>Add a deadline</p> 
              <input type="date" className='bg-form-input w-[100%] p-4 border-none rounded-xl text-[16px]' value={data.tdead} onChange={(e) => handleDate(e.target.value)} />
          </div>

          <div className='flex flex-row gap-8 p-5 w-[50%]'>
              <p className='text-center self-center text-[20px] w-[20%] font-medium '>Add an Example</p>            
              <input  accept='.pdf, .doc, .docx, image/png, image/jpeg, image/jpg' id='file' type='file' className='self-center' name='tfile' onChange={handleFile} />
          </div>

        </div>
    </div>
  )
}
