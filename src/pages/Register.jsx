import Nav from '../components/Nav';
import Basic from './Basic';
import Domain from './Domain'
import Social from '../components/Social';
import More from './More';
import Rating from './Rating';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import Final from './Final';


function App() {
  const [page, setPage] = useState(0);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    branch: '',
    sem: '',
    gender:'',
    contact:'',
    email:'',
    domain:'',
    git: '',
    link: '',
    port: '',
    loc: '',
    bio:'',
    why:'',
    feed:'',
    rat:'',
    status:'',
    isblacklisted:'no',
    submissions:[],
    approvedby:[],
    mobverified:'no',
    password:'',
    ups:0,
    downs:0
  });

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setPage(1);
    }, 4000)
  }, [])


  useEffect(() => {
    console.log({"page" : page, "profile" : profile});
    if (page === 4) {
      somefunction();
    }
  }, [profile]); 
  

  const somefunction = async ()=>{
    try {

      let res= await fetch('http://127.0.0.1:5001/fir-api-5316a/us-central1/app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });


      res = await res.json();
      console.log('Profile saved:', res);
    }

    catch(e){
      console.log(e)
    }
  
  }

  const handleProfile = (prof, dir)=>{
    setProfile({...profile, ...prof});
    if(dir === 1) setPage(page + 1);
    console.log({"page" : page, "profile" : profile} )
    if(dir !== 1) {
      if(page > 1)
      setPage(page - 1);
    }
  }

  const [settings, setSettings] = useState({
    'c1': 1,
    'c2':0,
    'c3':0,
    'h1':0,
    'h2':0,
  });

  const updateSettings = (newSettings) =>{
    setSettings({
      ...settings, ...newSettings
    });
  }


  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-4'>
      {page !== 0 ? <Nav/> : null}
      {
        page === 0 ? <Loading /> 
        :
        page === 1 ? <Basic data={profile} handleCompletion={handleProfile} settings={settings} updateSettings={updateSettings} profile={profile}/> 
        : 
        page === 2 ?  <Domain data={profile}  settings={settings} updateSettings={updateSettings} handleCompletion={handleProfile}/>
        :
        page === 3 ? <More  data={profile}  settings={settings} updateSettings={updateSettings} handleCompletion={handleProfile}/>
        :
        page === 4 ? <Final data={profile} />
        :
        <Rating data={profile} handleCompletion={handleProfile}/>
      
      }
      {page !== 0 ? <Social /> : null}
    </div>


/* important states and example for eacj component in case forget ... */
  // const [settings, setSettings] = useState({
  //   'c1': 1,
  //   'c2':0,
  //   'c3':0,
  //   'h1':0,
  //   'h2':0,
  // });

  // const [checked, setChecked] = useState({
  //   'a': false,
  //   'b': true,
  //   'c': false,
  // })

  // const handleCheck = (id)=>{
  //   setChecked({
  //     'a': id === 'a',
  //     'b': id === 'b',
  //     'c': id === 'c',
  //   });
  // }

  // const [profile, setProfile] = useState({
  //   name: '',
  //   age: null,
  //   domain: ''
  // })


  // const handleChange = (e) => {
  //   setProfile({
  //     ...profile,
  //     [e.target.name]: e.target.value, 
  //   });
  // };


  // console.log(profile);

  // const [state, setState] = useState(0);

  // const handleNext = (e)=>{
  //   if(state === 0){
  //     setState(state + 1)
  //     setSettings({...settings, 'c2':1, 'h1':1 });
  //   }

  //   if(state === 1){
  //     setState(state + 1)
  //     setSettings({...settings, 'c3':1, 'h2':1 });
  //   }
  // }


  // const handlePrev = (e)=>{
  //   if(state === 2){
  //     setState(state - 1)
  //     setSettings({...settings, 'c3':0, 'h2':0 });
  //   }

  //   if(state === 1){
  //     setState(state - 1)
  //     setSettings({...settings, 'c2':0, 'h1':0 });
  //   }
  // }

//     <div className="flex flex-row w-full gap-4 h-full justify-center items-center">
//         {/* <Progress setting={settings}/>
//         <div className='flex flex-row gap-2 items-center w-full justify-center mt-10'>
//           <button className='p-4 text-white rounded-lg bg-blue-500 flex items-center justify-center' onClick={handlePrev}>Prev</button>
//           <button className='p-4 text-white rounded-lg bg-blue-500 flex items-center justify-center' onClick={handleNext}>Next</button>
//         </div> */}

//         {/* 1 is for filled button and 0 for outlined */}
//         {/* <DomainCard label={'Technical'} id='a' handleCheck={handleCheck} status={checked.a}/>
//         <DomainCard label={'Graphics'} id='b' status={checked.b} handleCheck={handleCheck}/>
//         <DomainCard label={'Video Editing'} id='c' status={checked.c} handleCheck={handleCheck}/> */}
// {/* 
//         <Rating /> */}
//         <Input label={'Name'} type={'text'} name='name' value={profile.name} handleChange={handleChange} />
//         <Input label={'Age'} type={'number'} name='age' value={profile.age} handleChange={handleChange} />
//         <Input label={'Domain'} type={'text'} name='domain' value={profile.domain} handleChange={handleChange} />

//     </div>
  );
}

export default App;
