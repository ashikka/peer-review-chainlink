import axios, { AxiosInstance } from 'axios';

export default class API {
    private instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            validateStatus: () => true,
        })
    }

    setToken(token: string) {
        this.instance.defaults.headers.common['Authorization'] = `${token}`;
    }
    
    getUser(address: string) {
        return this.instance.get(`/user/${address}`);
    }

    register(address: string, name: string, email: string, signature: string) {
        return this.instance.post(`/user/register`, {
            address,
            name,
            email,
            signature,
        });
    }

    login(address: string, signature: string) {
        return this.instance.post(`/user/login`, {
            address,
            signature,
        });
    }

    me() {
        return this.instance.get(`/user/me`);
    }
}