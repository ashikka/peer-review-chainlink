import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'

import { ApiContext } from '../../contexts/api';
import { EtherContext } from '../../contexts/ether';
import { useDispatch } from 'react-redux';
import { setUser } from '../../stores/slices/userSlice';


function RegisterDialog({ isOpen, setIsOpen, register }:
    { isOpen: boolean, setIsOpen: (isOpen: boolean) => void, register: (name: string, email: string) => any }) {
    const api = useContext(ApiContext).api;
    const ether = useContext(EtherContext).ether;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {

        const getAddress = async () => {
            if (ether == null) {
                return;
            }
            setAddress(await ether.connectWallet());
        }

        getAddress();
    }, [ether]);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => setIsOpen(false)}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Register for a new DocPublish Account
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className="col-span-3 sm:col-span-2 mb-2">
                                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                            Metamask Wallet Address
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input
                                                readOnly
                                                type="text"
                                                name="company-website"
                                                id="company-website"
                                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                value={address}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-3 sm:col-span-2 mb-2">
                                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                            Username
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                name="company-website"
                                                id="company-website"
                                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-3 sm:col-span-2 mb-2">
                                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                name="company-website"
                                                id="company-website"
                                                className="flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={async () => {
                                            await register(username, email)
                                            setIsOpen(false)
                                        }}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default function Navbar() {
    const ether = useContext(EtherContext).ether;
    const api = useContext(ApiContext).api;
    const dispatch = useDispatch();
    
    const getUser = async (token: string) => {

        api?.setToken(token);
        const user = await api?.me();
        if(user) {
            dispatch(setUser(user.data));
        }

    }
    useEffect(() => {
        if(api){
            const token = localStorage.getItem("token");
            if (token) {
            getUser(token);
            }
        }
    }, [api]);


    const [isOpen, setIsOpen] = useState(false);

    const signInOrRegister = async () => {
        if (ether == null || api == null) return;

        const address = await ether.connectWallet();
        if (address == null) return;
        // Check if address exists already. If it does, then just request to sign message, and then send sign in request.

        const user = await api.getUser(address);

        if (user.status == 200) {
            return signIn(address)
        }

        setIsOpen(true);
        // If it doesn't, then need to register new account
    }

    const register = async (name: string, email: string) => {
        if (ether == null || api == null) return;

        const signature = await ether.signMessage("Click sign below to authenticate with DocPublish :)");

        if (signature == null) return;

        const address = await ether.connectWallet();
        if (address == null) return;

        const user = await api.register(address, name, email, signature);

        console.log(user.data);
    }

    
    const signIn = async (address: string) => {
        if (ether == null || api == null) return;

        const signature = await ether.signMessage("Click sign below to authenticate with DocPublish :)");

        if (signature == null) return;

        const res = await api.login(address, signature);
        localStorage.setItem("token", res.data.token);
        // This will later set some redux state
        console.log(res.data);
    }

    return (
        <>
            {isOpen && <RegisterDialog isOpen={isOpen} setIsOpen={setIsOpen} register={register} /> }
            <div className="w-screen h-24 border-b-4 border-indigo-500 mb-8 px-8 flex flex-row items-center justify-between">
                <div className="w-32 text-2xl"><span className='font-semibold'>Doc</span>Publish</div>
                <div className="text-xl flex flex-row">
                    <button
                        type="button"
                        className="py-2 px-3 bg-indigo-500 text-white text-lg font-semibold rounded-md shadow focus:outline-none"
                        onClick={signInOrRegister}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </>
    )
}