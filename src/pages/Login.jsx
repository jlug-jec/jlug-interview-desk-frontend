import { React, useState, useEffect } from 'react';
import Heading from '../components/Heading';
import logo from '../assets/logoblk.png';
import Nav from '../components/Nav';
import Input from '../components/Input';
import Loading from '../pages/Loading';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        email: '',
        pass: ''
    });

    const [load, setLoad] = useState(1);
    const [pageload, setPageLoad] = useState(0);

    const handleCompletion = async () => {
        if(profile.pass === '' || profile.email === ''){
            toast.error('All fields are required!')
            return;
        }
        setPageLoad(1);
        try {
            let res = await fetch('https://firebase-api-hrly.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });
            res = await res.json();
            //console.log(res);

            if (res.user) {
                sessionStorage.setItem('user', JSON.stringify(res.user));
                sessionStorage.setItem('userid', JSON.stringify(res.userID));
                toast.success('Login Successfull!')
                //alert(res.message);
                if (res.user.email.includes('admin') || res.user.email.includes('@jlug.club')) {
                    navigate('/admin');
                } else {
                    navigate('/userd');
                }
            } else {
                toast.error('User does not exists!')
                //alert('User does not exists!');
            }
        } catch (error) {
            toast.error('Something Went Wrong!')
            console.log('Login Failed:', error);
        } finally {
            setPageLoad(0);
        }
    };

    useEffect(() => {
        const delay = () => {
            setTimeout(() => {
                setLoad(0);
            }, 3000);
        };
        delay();
    }, []);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            {load === 1 ? (
                <Loading />
            ) : (
                <>
                    <Toaster />
                    <Nav />
                    <div className="flex flex-col gap-9 w-[90%] max-w-md h-full p-6 m-auto mt-[20%] bg-white items-center shadow-xl rounded-md md:mt-20">
                        <img
                            src={logo}
                            alt="logo"
                            className="w-24 h-24 rounded-full drop-shadow-md mb-[-10px] md:w-32 md:h-32"
                        />
                        <Heading label={'Login'} />
                        <div className="flex flex-col gap-6 w-full items-center">
                            <Input
                                handleChange={handleChange}
                                label={'Email'}
                                type={'email'}
                                value={profile.email}
                                name={'email'}
                            />
                            <Input
                                handleChange={handleChange}
                                label={'Password'}
                                type={'password'}
                                value={profile.pass}
                                name={'pass'}
                                support={1}
                                show={0}
                            />
                            <div className="text-sm text-center">
                                Missing Something?
                                <Link to="/register" className="text-primary underline ml-1">
                                    Register
                                </Link>
                            </div>
                            <div className="text-sm text-center">
                                Did your password vanish into the void?
                                <Link to="/reset" className="text-primary underline ml-1">
                                    Reset Password
                                </Link>
                            </div>
                            <div className="flex flex-row gap-4 w-full items-center justify-center mt-2">
                                <Button
                                    label={'Login'}
                                    handler={handleCompletion}
                                    variant={1}
                                    isloading={pageload}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Login;
