import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Ripple from '../components/Ripple';
import { Toaster, toast } from 'react-hot-toast';

function Settings() {
  const [pageload, setPageLoad] = useState(false);
  const [user, setUser] = useState();
  const [dp, setDp] = useState(null); 
  const [pass, setPass] = useState(''); 
  const [reload, setReload] = useState(false);
  let id = sessionStorage.getItem('userid')
  id = JSON.parse(id);
  const [fileModal, setFileModal] = useState(false); 
  const [passModal, setPassModal] = useState(false); 
  const [actionLoad, setActionLoad] = useState(false);

  useEffect(() => {
    let user = sessionStorage.getItem('user');
    user = JSON.parse(user);
    setUser(user);
  }, [reload]);

  const handleSaveChanges = async (type) => {
    setActionLoad(true);

    try {
      let updatedUser = { ...user };
      
      if (type === 'password') {
        if (pass.length < 8) {
          toast.error('Password must be at least 8 characters long!');
          return;
        }
        updatedUser.password = pass;
      }else{
        delete updatedUser.password
      }

      if (type === 'profilePic' && dp) {
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dqcqijw3c/image/upload`;
        const uploadPreset = 'sample-img';

        const imageData = new FormData();
        imageData.append('file', dp);
        imageData.append('upload_preset', uploadPreset);

        const response = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: imageData,
        });

        const uploadResult = await response.json();

        if (!uploadResult.secure_url) {
          throw new Error('Image upload failed');
        }

        updatedUser.dp = uploadResult.secure_url;
      }

      
      const response = await fetch(
        `https://firebase-api-hrly.onrender.com/update-user/${id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) throw new Error('Update failed');

      toast.success('Profile updated successfully!');
      setUser(updatedUser);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      setFileModal(false);
      setPassModal(false);
      setReload(!reload)
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setActionLoad(false);
    }
  };

  return (
    <>
    <Toaster />
      {pageload ? (
        <Ripple />
      ) : (
        user && (
          <div className="bg-zinc-100 pb-10 w-100 h-screen">

{fileModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-hidden">
                <div className="bg-white w-11/12 md:w-3/4 max-h-[90vh] p-8 rounded-lg shadow-lg overflow-y-auto mt-[40vh]">
                  <h3 className="text-xl font-bold mb-4">Change Profile Picture</h3>
                  <input
                    type="file"
                    className="mb-4"
                    onChange={(e) => setDp(e.target.files[0])}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      className={`${actionLoad && 'opacity-45 cursor-not-allowed'} px-6 py-3 bg-white text-black border-2 border-black  rounded-lg cursor-pointer`}
                      onClick={() => setFileModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${actionLoad && 'animate-pulse cursor-not-allowed'} px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer`}
                      onClick={() => handleSaveChanges('profilePic')}
                      disabled={actionLoad}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {passModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-hidden">
                <div className="bg-white w-11/12 md:w-3/4 max-h-[90vh] p-8 rounded-lg shadow-lg overflow-y-auto mt-[40vh]">
                  <h3 className="text-xl font-bold mb-4">Change Password</h3>
                  <input
                    type="password"
                    maxLength={8}
                    className="mb-4 w-[90%] flex-1 mr-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                  <button
                      className={`${actionLoad && 'opacity-45 cursor-not-allowed'} px-6 py-3 bg-white text-black border-2 border-black rounded-lg cursor-pointer`}
                      onClick={() => setPassModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${actionLoad && 'animate-pulse cursor-not-allowed'} px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer`}
                      onClick={() => handleSaveChanges('password')}
                      disabled={actionLoad}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}


            <h1 className="font-semibold p-10 text-4xl">Account Settings</h1>
            <div className="flex flex-col w-full gap-2 mt-10 m-auto">
              <div className="w-[80%] bg-white flex flex-col rounded-lg shadow-xl gap-8 items-center justify-center p-7 m-auto">
                <img
                  src={user.dp}
                  className="md:w-[12vw] md:h-[12vw] w-36 h-36 border-8 border-double border-spacing-3 border-zinc-500 mt-7 rounded-full"
                  alt=""
                />
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl text-center font-semibold">{user.name}</h4>
                  <h4 className="text-xl text-center font-semibold">{user.email}</h4>
                </div>
                <div className="flex flex-row gap-5">
                  <div
                    className="font-semibold border-2 text-center border-[#23B0FF] text-[#23B0FF] hover:text-white hover:bg-[#23B0FF] px-4 rounded-lg cursor-pointer"
                    onClick={() => setFileModal(true)}
                  >
                    Change Profile Picture
                  </div>
                  <div
                    className="font-semibold border-2 text-center border-[#23B0FF] text-[#23B0FF] hover:text-white hover:bg-[#23B0FF] px-4 rounded-lg cursor-pointer"
                    onClick={() => setPassModal(true)}
                  >
                    Change Password
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
        )
      )}
    </>
  );
}

export default Settings;
