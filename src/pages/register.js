import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/redux/Actions/userActions';
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

    const dispatch = useDispatch();

    const { message, error, isUserAuthenticated, loading } = useSelector(state => state.userAuth)

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

        dispatch(registerUser(values.name, values.email, values.password, userAgent, ip))

        // axios.post('/api/register', { email, password, userAgent, ip })
        //     .then(response => console.log(response))
        //     .catch(error => console.error(error));
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
    }, [message, error, dispatch, toastOptions, isUserAuthenticated, router])

    useEffect(() => {
        
    }, [])

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
