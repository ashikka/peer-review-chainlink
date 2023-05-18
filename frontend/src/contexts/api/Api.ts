import axios, { AxiosInstance } from 'axios';

export interface ApiPaper {
    title: string;
    abstract: string;
    category: string;
    address: string;
    ipfsHash: string;
    user: string;
    status: string;
}
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

    getUserPapers() {
        return this.instance.get(`/user/papers`);
    }

    getAllPapers() {
        return this.instance.get('/paper/all');
    }

    submitPaper(
        title: string,
        abstract: string,
        category: string,
        ipfsHash: string,
        address: string,
    ) {
        return this.instance.post(`/paper/submit`, {
            title,
            abstract,
            category,
            ipfsHash,
            address,
        });
    }

    getPaper(address: string) {
        return this.instance.get(`/paper/view/${address}`);
    }

    me() {
        return this.instance.get(`/user/me`);
    }
}