import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { loadUser, loginUser } from '@/redux/Actions/userActions';
import { toast } from 'react-toastify';

const Login = () => {

    const toastOptions = {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [ipAdd, setIpAdd] = useState({ userAgent: '', ip: '' });
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    const dispatch = useDispatch()
    const router = useRouter();
    const { message, loading, error, isUserAuthenticated } = useSelector(state => state.userAuth);
    const { isUserAuthenticated: isAuthenticated } = useSelector(state => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userAgent = navigator.userAgent;
        const ip = await axios.get('https://api.ipify.org?format=json').then(res => res.data.ip);

        if(userAgent && ip) {
            setIpAdd({ userAgent, ip });
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            try {
                if (latitude && longitude) {
                    setLocation({ latitude, longitude });
                }
            } catch (error) {
                toast.error(error, toastOptions);
            }
        });

        // dispatch(loginUser(email, password, userAgent, ip));
    };

    useEffect(() => {
        if (error) {
            toast.error(error, toastOptions);
            dispatch({ type: "clearError" });
        }
        if (message) {
            toast.success(message, toastOptions);
            dispatch({ type: "clearMessage" });
        }
        if (isUserAuthenticated) {
            router.push('/');
        }
        if(isAuthenticated) {
            router.push('/');
        }
    }, [error, message, isUserAuthenticated, loading, dispatch, isAuthenticated]);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch])

    useEffect(() => {
        if(location.latitude && location.longitude) {
            dispatch(loginUser(email, password, ipAdd.userAgent, ipAdd.ip, location.latitude, location.longitude));
        }
    }, [location])

    return (
        <>
            {
                !loading && !isUserAuthenticated && (
                    <form onSubmit={handleSubmit}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Login</button>
                    </form>
                )
            }
        </>
    );
};

export default Login;
