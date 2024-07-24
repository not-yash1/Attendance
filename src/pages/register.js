import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, registerUser } from '@/redux/Actions/userActions';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Register = () => {

    const router = useRouter();

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

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [ipAdd, setIpAdd] = useState({ userAgent: '', ip: '' });

    const dispatch = useDispatch();

    const { message, error, isUserAuthenticated, loading } = useSelector(state => state.registerUser)
    const { isUserAuthenticated: isAuthenticated } = useSelector(state => state.user);
    

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userAgent = navigator.userAgent;
        const ip = await axios.get('https://api.ipify.org?format=json').then(res => res.data.ip);

        if(ip && userAgent){
            setIpAdd({ userAgent, ip });
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            try {
                if(latitude && longitude) {
                    setLocation({ latitude, longitude });
                }
            } catch (error) {
                toast.error(error, toastOptions);
            }
            
            // dispatch(registerUser(values.name, values.email, values.password, userAgent, ip, latitude, longitude))
        })

        // dispatch(registerUser(values.name, values.email, values.password, userAgent, ip))
    };

    useEffect(() => {
        if(message) {
            toast.success(message, toastOptions);
            dispatch({ type: "clearMessage" });
        }
        if(error) {
            toast.error(error, toastOptions);
            dispatch({ type: "clearError" });
        }
        if(isUserAuthenticated) {
            router.push('/');
        }
        if(isAuthenticated) {
            router.push('/');
        }
        
    }, [message, error, dispatch, toastOptions, isUserAuthenticated, router, isAuthenticated])

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch])

    useEffect(() => {
        if(location.latitude && location.longitude) {
            dispatch(registerUser(values.name, values.email, values.password, ipAdd.userAgent, ipAdd.ip, location.latitude, location.longitude));
        }
    }, [location])

    return (
        <>
        {
            !loading && (
                isUserAuthenticated ? (
                    null
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input type="name" name='name' value={values.name} onChange={(e) => handleChange(e)} />
                        <input type="email" name='email' value={values.email} onChange={(e) => handleChange(e)} />
                        <input type="password" name='password' value={values.password} onChange={(e) => handleChange(e)} />
                        <button type="submit">Register</button>
                    </form>
                )
            )
        }
        </>
        
    );
};

export default Register;
