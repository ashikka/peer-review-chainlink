import { ethers } from 'ethers';
import { create, IPFSHTTPClient } from "ipfs-http-client";

export default class Ether {
    private provider: ethers.providers.Web3Provider
    private client: IPFSHTTPClient;
    constructor() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.client = create({
            url: 'https://ipfs.infura.io:5001/api/v0'
        });
    }

    async connectWallet() {
        await this.provider.send("eth_requestAccounts", []);
        const signer = this.provider.getSigner();
        return await signer.getAddress();
    }

    async signMessage(message: string) {
        const signer = this.provider.getSigner();
        return await signer.signMessage(message);
    }

    async add(file: any, progressFn: (progress: number) => void) {
        const added = await this.client.add(file, {progress: (prog) => console.log(progressFn((prog/file.size)*100))});
        return `https://ipfs.infura.io/ipfs/${added.path}`
    }
}