import { ethers } from 'ethers';

export default class Ether {
    private provider: ethers.providers.Web3Provider
    constructor() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
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
}