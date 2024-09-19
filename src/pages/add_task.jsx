import {React, useState} from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import dayjs from 'dayjs';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Add() {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const [data, setData] = useState({
    tname : '',
    tdesc : '',
    tcatg: '',
    tstat: '',
    tsub:'',
    tdead : new Date(),
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

  const handleDate = (e)=>{
    const alldata = {...data};
    alldata['tdead'] = e['$d'].toDateString()
    setData(alldata)
  }

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
      tdead : new Date(),
      tfile : ''
    });
  }

  console.log(data)

  return (
    <div className='flex flex-col m-auto w-screen h-screen'>
    
      <div className='flex flex-row w-[100%] gap-9 pt-1 justify-between'>
        <p className='text-left text-4xl font-medium  p-[1%] pl-[3%]'>
            Add Task
        </p>
        <div className='flex flex-row gap-5 p-3 justify-center pr-9'>
          <Button variant="outlined" color='success' style={{border: '2px solid'}}  startIcon={<CheckCircleIcon />} onClick={handleSubmit}>
            Confirm
          </Button>
          <Button variant="outlined" color='error' style={{border: '2px solid'}} startIcon={<CancelIcon />} onClick={handleDiscard}>
            Discard
          </Button>
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
                <FormControl className='w-full'>
                <InputLabel id="catg">Category</InputLabel>
                <Select labelId="catg" id="catg" value={data.tcatg} name='tcatg'  onChange={handleChange} label="Category">
                  <MenuItem value={'web'}>Web</MenuItem>
                  <MenuItem value={'app'}>App</MenuItem>
                  <MenuItem value={'docx'}>Document / Text</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className='flex flex-row w-[50%] gap-7'>
              <p className='text-center self-center text-[20px] w-[25%] font-medium '>Task Status</p>
                <FormControl className='w-full'>
                <InputLabel id="catg">Status</InputLabel>
                <Select labelId="catg" value={data.tstat} name='tstat' onChange={handleChange} id="catg" label="Status">
                  <MenuItem value={'active'}>Active</MenuItem>
                  <MenuItem value={'suspended'}>Suspended</MenuItem>
                </Select>
              </FormControl>
            </div>

          </div>

          <div className='flex flex-row gap-7 p-5 w-[50%]'>
              <p className='text-center self-center text-[20px] w-[25%] font-medium '>Submission Category</p>
                <FormControl className='w-full'>
                <InputLabel id="catg">Submission</InputLabel>
                <Select labelId="catg" id="catg" value={data.tsub} name='tsub' onChange={handleChange} label="Submission">
                  <MenuItem value={'pdf'}>Pdf</MenuItem>
                  <MenuItem value={'img'}>Image</MenuItem>
                  <MenuItem value={'link'}>Url</MenuItem>
                </Select>
              </FormControl>
          </div>


          <div className='flex flex-row gap-8 p-5 w-[50%]'>
              <p className='text-center self-center text-[20px] w-[25%] font-medium '>Add a deadline</p>            
              <FormControl className='w-full'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={dayjs(data.tdead)}  onChange={handleDate} label="Pick a date" />
                </LocalizationProvider>
              </FormControl>
          </div>

          <div className='flex flex-row gap-8 p-5 w-[50%]'>
              <p className='text-center self-center text-[20px] w-[20%] font-medium '>Add an Example</p>            
              <FormControl className='self-center'>         
                  <Button component="label"  variant="contained"  name='tfile' startIcon={<CloudUploadIcon />} onChange={handleFile} >
                    Upload Image
                  <VisuallyHiddenInput  type="file"  />
                  </Button>
              </FormControl>
          </div>

        </div>
    </div>
  )
}