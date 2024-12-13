import React from 'react'
import PencilB from '../../assets/PencilB.png'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Ripple from '../../components/Ripple'
import { use } from 'react'

function User() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const user_image="https://www.pngarts.com/files/11/Avatar-PNG-Free-Download.png"
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [updatedUser, setUpdatedUser] = useState({});
    const [dp, setDp] = useState();
    const [pass, setPass] = useState();
    const [pageload, setPageLoad] = useState(true)
    const [actionload, setActionLoad] = useState(false)

//pas == orignal passwoed, changes in pas handle by handlepass, in save only if pas == 8 add to newUser

    let id = localStorage.getItem('userid')
    id =  id.replace(/['"]+/g, '');
    const twitter = 'https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/new-twitter-stroke-rounded.svg?alt=media&token=9ecd522d-7557-42e6-b838-7eb1e5db6780';
    const link = 'https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/linkedin-02-stroke-rounded.svg?alt=media&token=41c80506-9e59-4212-8f9a-705cfbfd451b'
    const git = 'https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/github-stroke-rounded.svg?alt=media&token=ad8bc54b-c9c7-46cf-a935-39166bab7b5b'
    const loc  = 'https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/location-04-stroke-rounded.svg?alt=media&token=0b209a08-ed9f-480a-9a35-2f347f958a34'
    const port = 'https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/job-link-stroke-rounded.svg?alt=media&token=540b520a-a97c-440a-b0f2-892b25af241b'
    const mail = 'https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/mail-01-stroke-rounded.svg?alt=media&token=9d3e616a-809e-4365-991f-e46f58509a1a'
    const whats = 'https://firebasestorage.googleapis.com/v0/b/user-assets-6616a.appspot.com/o/whatsapp-stroke-rounded.svg?alt=media&token=a97f5718-255e-46d0-bdd2-70b22b3b66e9'

    const [submissions, setSubmissions] = useState([]);
    const [projects, setProjects] = useState([]); 

    useEffect(() => {
      setPageLoad(true)
      const fetchData = async () => {
         try {
          const userResponse = await fetch(`https://firebase-api-hrly.onrender.com/api/get-user/${id}`);
          if (!userResponse.ok) throw new Error('Failed to fetch user details.');
          const userData = await userResponse.json();
          setUpdatedUser(userData)
          setUser(userData)
          setDp(userData.dp)
          setPass(userData.password)
          

          if (userData && userData.projects) {
            const transformedProjects = Object.entries(userData.projects).map((entry, index)  => ({
              id: index, 
              name: entry[0] || "Untitled Project",
              url: entry[1] || "",
            }));
    
            setProjects(transformedProjects); 
          } else {
            setProjects([]); 
          }
  
          const submissionsResponse = await fetch(`https://firebase-api-hrly.onrender.com/api/get-submissions/${id}`);
          if (!submissionsResponse.ok) throw new Error('Failed to fetch submissions.');
          const submissionsData = await submissionsResponse.json();
          setSubmissions(submissionsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }finally{
          setPageLoad(false)
        }
      };
  
      fetchData();
    }, [id]);
  

    useEffect(() => {
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        setUser(JSON.parse(storedUser));

      } else {
        navigate('/login'); 
      }
    }, [isModalOpen]);
  
    const handlePass = (e)=>{
      setPass((prevpas) => e.target.value)
    }

    const handleInputChange = (field, value) => {
      setUpdatedUser((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    };
    
    const handleSkillChange = (index, value) => {
      const newSkills = [...updatedUser.skills];
      newSkills[index] = value;
      setUpdatedUser((prevState) => ({
        ...prevState,
        skills: newSkills,
      }));
    };
    
    const handleAddSkill = () => {
      setUpdatedUser((prevState) => ({
        ...prevState,
        skills: [...(prevState.skills || []), ''],
      }));
    };
    

    const handleRemoveSkill = (index) => {
      const newSkills = [...updatedUser.skills];
      newSkills.splice(index, 1); 
      setUpdatedUser((prevState) => ({
        ...prevState,
        skills: newSkills,
      }));
    };

    const handleProjectChange = (id, field, value) => {
      const updatedProjects = projects.map(project =>
        project.id === id
          ? { ...project, [field]: value }
          : project
      );
      setProjects(updatedProjects);
    };
    
    
    const handleAddProject = (name, url) => {
      const newProject = {
        id: projects.length,  
        name : 'New Project',
        url,
      };
      setProjects([...projects, newProject]);
    };
    

    const handleRemoveProject = (id) => {
      const updatedProjects = projects.filter(project => project.id !== id);
      setProjects(updatedProjects);
    };
    

    const handleSaveChanges = async (e) => {
      setActionLoad(true)
      e.preventDefault();
      let { password, ...newUser } = updatedUser;

      if(pass != user.password && pass.length < 8){
          alert('Password must be 8 characters long !')
          return;
      }
      else if(pass.length == 8){
        newUser = {...newUser, password : pass}
      }
      else if(pass === ''){
        
      }
      setPass('')
      

      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dqcqijw3c/image/upload';
      const uploadPreset = 'sample-img' 
  
      let uploadResult;

      if(dp.name != user.dp){
        const imageData = new FormData();
        imageData.append('file', dp); 
        imageData.append('upload_preset', uploadPreset);
        imageData.append('cloud_name', 'dqcqijw3c');
    
        const response = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: imageData,
        });
    
        uploadResult = await response.json();
      }

      if (dp.name != user.dp && !uploadResult.secure_url) {
        throw new Error('Image upload failed ');
      }
      console.log(uploadResult)

      const projectsMap = projects.reduce((acc, { name, url }) => {
        acc[name] = url; 
        return acc;
      }, {});
    
      newUser = { ...newUser, projects: projectsMap };
      if(dp.name != user.dp){
        newUser = { ...newUser, dp: uploadResult.secure_url}
      }


      console.log(newUser)
      try {
        const response = await fetch(`https://firebase-api-hrly.onrender.com/update-user/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 

           },
          body: JSON.stringify(newUser),
        });
        if (!response.ok) throw new Error('Update failed');
        alert('Profile updated successfully!');
        setIsModalOpen(false);
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));

      } catch (error) {
        console.error(error);
        alert('Failed to update profile. Please try again.');
      }finally{setActionLoad(false)}
    };
    
    const handleProfilePicture = (e) => {
      const dp = e.target.files;
      if(dp){
        setDp(dp[0])
      }
    }

    const handleEdit = ()=>{
      //ye bna lena, bs div ki agah inputs le lena, aur ek state me values rakh lena
      setIsModalOpen(!isModalOpen)
    }

  return (
    <>
      {pageload && <Ripple />}

<div className="bg-[#ECECEC] h-full w-full p-4 md:p-10 md:mb-5 mb-20">
  {!pageload && (
    <>
      <div className="flex md:flex-row w-full justify-between items-center">
        <div className="text-2xl md:text-4xl font-semibold">Profile</div>
        <div
          className="flex gap-3 p-2 items-center border-2 border-primary text-primary px-4 py-1 rounded-lg cursor-pointer"
          onClick={handleEdit}
        >
          <img src={PencilB} className="w-5 h-5 md:w-7 md:h-7" alt="pencil" />
          <button className="font-semibold">Edit Profile</button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-4 mt-6">
        
        <div className="w-full md:w-[25%] bg-white flex flex-col rounded-md shadow-lg gap-6 items-center p-4">
          <img
            src={user.dp}
            className="w-32 h-32 md:w-[12vw]  md:h-[12vw] border-4 md:border-8 border-double border-spacing-3 border-zinc-500 mt-7 rounded-full"
            alt=""
          />
          <div className="flex gap-4">
            {user.git && (
              <a href={user.git}>
                <img className="w-6 md:w-10" src={git} alt="" />
              </a>
            )}
            {user.link && (
              <a href={user.link}>
                <img className="w-6 md:w-10" src={link} alt="" />
              </a>
            )}
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h4 className="text-lg md:text-xl font-semibold">{user.name}</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center">
                <img className="mr-2" src={loc} alt="" />
                {user.loc}
              </li>
              <li>
                <a className="flex items-center" href={user.port}>
                  <img className="mr-2" src={port} alt="" />
                  {user.port || "No portfolio"}
                </a>
              </li>
              <li>
                <a className="flex items-center" href="#">
                  <img className="mr-2" src={mail} alt="" />
                  {user.email}
                </a>
              </li>
              <li>
                <a className="flex items-center" href="#">
                  <img className="mr-2" src={whats} alt="" />
                  {user.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full md:w-[70%] md:p-5 bg-white shadow-lg rounded-lg">
          <h4 className="text-lg md:text-xl font-semibold m-4">Bio</h4>
          <p className="text-sm md:text-md font-normal m-4 py-2 px-2 rounded-lg">{user.bio}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 m-4 gap-4">
            <ul className="bg-[#ECECEC] py-2 px-4 rounded-lg">
              <h4 className="text-lg md:text-xl font-semibold mb-4">Skills</h4>
              {user.skills && user.skills.length > 0 ? (
                user.skills.map((skill, index) => <li key={index}>{skill}</li>)
              ) : (
                <li>No skills available</li>
              )}
            </ul>

            <ul className="bg-[#ECECEC] py-2 px-4 rounded-lg">
              <h4 className="text-lg md:text-xl font-semibold mb-4">Projects</h4>
              {user.projects && Object.keys(user.projects).length > 0 ? (
                Object.entries(user.projects).map(([name, url], index) => (
                  <li key={index} className="flex items-center justify-between py-2">
                    <span>{name}</span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      <div className="font-semibold border-2 text-center border-[#23B0FF] text-[#23B0FF] px-4 rounded-lg">
                        View
                      </div>
                    </a>
                  </li>
                ))
              ) : (
                <li>No projects available</li>
              )}
            </ul>
          </div>

          <h4 className="text-lg md:text-xl font-semibold m-4">Tasks</h4>
          <ul className=" py-2 px-4 rounded-lg">
            {submissions.length > 0 &&
              submissions.map((submission, index) => (
                <li key={index} className="flex justify-between py-2">
                  {submission.taskName}
                  <div className="text-green-400 border-green-400 border-2 rounded-lg px-2 hidden md:visible">
                    Completed
                  </div>
                  <div className="text-blue-500">
                    <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer">
                      <div className="font-semibold border-2 text-center border-[#23B0FF] text-[#23B0FF] px-4 rounded-lg">
                        View
                      </div>
                    </a>
                  </div>
                </li>
              ))}
            {submissions.length === 0 && (
              <div className="text-orange-400 border-orange-400 w-fit m-auto border-2 rounded-lg px-2">
                No Submissions made yet!
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-hidden">
            <div
              className="bg-white w-11/12 md:w-3/4 max-h-[90vh] p-8 rounded-lg shadow-lg overflow-y-auto"
              style={{ marginTop: "5vh" }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Profile</h2>
              <form onSubmit={!actionload ? handleSaveChanges : null} className="space-y-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Bio</label>
                  <textarea
                    value={updatedUser.bio || ""}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  />
                </div>
      
                    <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Profile Picture
              </label>
              <input  accept=' image/png, image/jpeg, image/jpg' id='file' type='file' className='self-center' name='tfile' onChange={handleProfilePicture} />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Skills</label>
              {updatedUser.skills?.map((skill, index) => (
                <div key={index} className="flex gap-4 mb-3 items-center">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSkill}
                className="text-blue-500 hover:underline"
              >
                + Add Skill
              </button>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Projects</label>
              {projects && projects.length > 0 ? (
              projects.map(({ id, name, url }) => (
                <li key={id} className="flex items-center justify-between py-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleProjectChange(id, "name", e.target.value)}
                    className="flex-1 mr-2 p-3 border border-gray-300 rounded-lg w-[45%] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleProjectChange(id, "url", e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none w-[45%] focus:ring-2 focus:ring-blue-500 mr-2"
                  />
                
                  <button
                    onClick={() => handleRemoveProject(id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <li>No projects available</li>
            )}
              <button
                type="button"
                onClick={handleAddProject}
                className="text-blue-500 hover:underline"
              >
                + Add Project
              </button>
            </div>


            <fieldset className="mt-6">
              <legend className="font-semibold text-lg text-gray-700 pb-4">Social Links</legend>
              {["git", "link", "contact", "why"].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block mb-1 text-sm font-semibold text-gray-700">{field.toUpperCase()}</label>
                  <input
                    type="text"
                    value={updatedUser[field] || ""}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </fieldset>

            
            <div>
                      <label className="block mb-2 font-semibold text-gray-700">Update Password</label>
                      <input
                        type="password"
                        value={pass.length > 8 ? '' : pass}
                        maxLength={8}
                        onChange={(e) => handlePass(e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="New Password"
                      />
                    </div>

                    <div className="flex justify-end mt-8 gap-6">
                      <button
                        type="button"
                        onClick={actionload ? null : () => setIsModalOpen(false)}
                        className={`px-6 border-2 border-black py-3 bg-gray-300 hover:bg-gray-400 rounded-lg cursor-pointer ${actionload && 'cursor-not-allowed opacity-45'}`}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer ${actionload && 'animate-pulse cursor-not-allowed'}`}
                      >
                        Save Changes
                      </button>
                    </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default User; 