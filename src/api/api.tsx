import Axios from 'axios';
import Cookies from "universal-cookie";

const instance = Axios.create({
    withCredentials: true,
    baseURL: `https://toko.ox-sys.com`
});

export const cookies = new Cookies();
export const cookieOpts: { path: string, sameSite: boolean | 'none' | 'lax' | 'strict' } = {
    path: '/',
    sameSite: 'strict'
};

const setTokenToHeader = () => {
    const token = cookies.get('ox-auth');
    if (token) {
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    }
};

export const auth = {
    login: (username: string, password: string): Promise<{ token: string }> => {
        const form = new FormData();

        form.set('_username', username);
        form.set('_password', password);
        form.set('_subdomain', 'toko');

        return instance
            .post(`/security/auth_check`, form, setTokenToHeader())
            .then((res) => res.data)
            .catch(({response}) => {
                throw response.data;
            });
    },
}