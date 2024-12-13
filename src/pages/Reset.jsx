import { React, useState, useEffect } from 'react';
import Heading from '../components/Heading';
import logo from '../assets/logoblk.png';
import Nav from '../components/Nav';
import Input from '../components/Input';
import Loading from '../pages/Loading';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Reset = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        email: '',
        old: '',
        newp: '',
    });

    const [load, setLoad] = useState(1);
    const [pageload, setPageLoad] = useState(0);

    const handleCompletion = async () => {
        if (profile.newp.length < 8) {
            alert('Password must be 8 characters long!');
            return;
        }
        setPageLoad(1);
        try {
            let res = await fetch('https://firebase-api-hrly.onrender.com/api/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });
            res = await res.json();

            if (res.ok) {
                alert(res.message);
                navigate('/login');
            } else {
                alert('Failed!');
            }
        } catch (error) {
            console.log('Operation failed', error);
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
                    <Nav />
                    <div className="flex flex-col gap-9 w-[90%] max-w-md h-full p-6 m-auto mt-[20%] bg-white items-center shadow-xl rounded-md md:mt-20">
                        <img
                            src={logo}
                            alt="logo"
                            className="w-20 h-20 md:w-32 md:h-32 mt-2 rounded-full drop-shadow-md mb-[-10px]"
                        />
                        <Heading label={'Reset Password'} />
                        <div className="flex flex-col gap-4 md:gap-6 w-full items-center">
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
                                value={profile.old}
                                name={'old'}
                            />
                            <Input
                                handleChange={handleChange}
                                label={'New Password'}
                                type={'password'}
                                value={profile.newp}
                                name={'newp'}
                            />

                            <div className="flex flex-row gap-4 w-full items-center justify-center mt-2">
                                <Button
                                    label={'Reset Password'}
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

export default Reset;
