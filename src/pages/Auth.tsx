import React, {FC, useState} from 'react';
import {auth, cookieOpts, cookies} from "../api/api";
import {Button, TextField} from "@mui/material";

export const Auth: FC = () => {
    const [loginData, setLoginData] = useState({username: '', password: ''});

    const login = async () => {
        const {username, password} = loginData;
        const res = await auth.login(username, password);
        cookies.set('ox-auth', res.token, cookieOpts);
        console.log(res)
    }

    const handleLogin = ({target: {name, value}}: any) => {
        setLoginData({
            ...loginData,
            [name]: value
        })
    }
    console.log(loginData)


    return (
        <div>
            <TextField placeholder='login' name='username' value={loginData.username} onChange={handleLogin}/>
            <TextField placeholder='password' name='password' value={loginData.password} onChange={handleLogin}/>

            <Button onClick={login}>click</Button>
        </div>
    );
};