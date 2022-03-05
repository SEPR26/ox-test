import Axios from 'axios';
import Cookies from "universal-cookie";
import {ProductsResultType} from '../types';

const getInstance = (token?: string) => {
    return Axios.create({
        withCredentials: true,
        baseURL: `https://toko.ox-sys.com`,
        headers: token ? {
            'Authorization': `Bearer ${token}`
        } : {}
    });
};

export const cookies = new Cookies();
export const cookieOpts: { path: string, sameSite: boolean | 'none' | 'lax' | 'strict' } = {
    path: '/',
    sameSite: 'strict'
};
const token = cookies.get('ox-auth');

export const authApi = {
    login: (username: string, password: string): Promise<{ token: string }> => {
        const form = new FormData();

        form.set('_username', username);
        form.set('_password', password);
        form.set('_subdomain', 'toko');

        return getInstance()
            .post(`/security/auth_check`, form)
            .then((res) => res.data)
            .catch(({response}) => {
                throw response.data;
            });
    }
};

export const productApi = {
    getProducts: (page: number, size: number): Promise<ProductsResultType> => {
        return getInstance(token)
            .get(`/variations`, {params: {size, page}})
            .then((res) => res.data)
            .catch(({response}) => {
                throw response.data;
            });
    }
};
