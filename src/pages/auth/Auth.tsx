import React, {useEffect, useState} from 'react';
import {authApi, cookieOpts, cookies} from '../../api/api';
import {Button, Card, CardActions, CardContent, Container, TextField, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useStyles} from './useStyles';

export const Auth = () => {

    const token = cookies.get('ox-auth');

    const isAuth = Boolean(token);

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({username: '', password: ''});

    const login = async () => {
        try {
            const {username, password} = loginData;

            const res = await authApi.login(username, password);

            cookies.set('ox-auth', res.token, cookieOpts);

            navigate("/");
        } catch (e: any) {
            return alert(`Не верный логин или пароль, код ошибки: ${e.code}`);
        }
    };

    const handleDownEnter = (e: any) => {
        if (e.key === 'Enter') {
            login();
            setLoginData(e.target.value);
        }
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

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography> Login: user_task </Typography>
            <Typography> Password: user_task </Typography>
            <Card variant="outlined" className="card-container">
                <CardContent>
                    <h2>Авторизация</h2>
                    <TextField
                        className="text-input"
                        placeholder="login"
                        name="username"
                        value={loginData.username}
                        onChange={handleLogin}
                        onKeyPress={handleDownEnter}
                    />
                    <TextField
                        className="text-input"
                        placeholder="password"
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleLogin}
                        onKeyPress={handleDownEnter}
                    />
                </CardContent>
                <CardActions>
                    <Button onClick={login} variant="outlined">Войти</Button>
                </CardActions>
            </Card>
        </div>
    );
};
