import React, {useEffect, useState} from 'react';
import {authApi, cookieOpts, cookies} from '../api/api';
import {Button, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';

export const Auth = () => {

    const token = cookies.get('ox-auth');

    const isAuth = Boolean(token);

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({username: '', password: ''});

    const login = async () => {

        const {username, password} = loginData;

        const res = await authApi.login(username, password);

        cookies.set('ox-auth', res.token, cookieOpts);

        navigate("/");
    };

    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth]);


    const handleLogin = ({target: {name, value}}: any) => {
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    return (
        <div>
            <TextField
                placeholder="login"
                name="username"
                value={loginData.username}
                onChange={handleLogin}
            />
            <TextField
                placeholder="password"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLogin}
            />
            <Button onClick={login}>click</Button>
        </div>
    );
};
