import axios, { AxiosInstance } from 'axios';

export interface ApiPaper {
    title: string;
    abstract: string;
    category: string;
    address: string;
    ipfsHash: string;
    user: string;
    status: string;
    date: number;
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

    register(address: string, signature: string, scholarUrl: string) {
        return this.instance.post(`/user/register`, {
            address,
            signature,
            scholarUrl,
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

    updateTrustRating() {
        return this.instance.post(`/user/updateTrustRating`);
    }

    getPaper(address: string) {
        return this.instance.get(`/paper/view/${address}`);
    }

    me() {
        return this.instance.get(`/user/me`);
    }

    getUserScholarDetails() {
        return this.instance.get(`/user/scholar`);
    }
}