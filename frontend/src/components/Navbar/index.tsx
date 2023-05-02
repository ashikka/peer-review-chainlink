import React, { Fragment, ReactNode, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { useNavigate, Link } from "react-router-dom";

import { ApiContext } from '../../contexts/api';
import { EtherContext } from '../../contexts/ether';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { setUser } from '../../stores/slices/userSlice';
import { Text, Menu, useColorModeValue, useDisclosure, Box, Flex, IconButton, HStack, Button, MenuButton, Avatar, MenuList, MenuItem, MenuDivider, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import logo from '../../assets/logo.png';
import { UserContext } from '../../contexts/user';


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


function NavLink({ text, href }: { text: string, href: string }) {
    return (
        <Link to={href}>
            <Text color="#6459F5" fontWeight="semibold">{text}</Text>
        </Link>
    )
}

export default function Navbar() {
    const user = useContext(UserContext);

    return (
        <Flex bgColor="#F8F8FB" flexDirection="row" justifyContent="space-between" py={5} px={8} borderBottom="3px solid #6459F5">
            <Flex alignItems="center">
                <img src={logo} alt="logo" width={40} />
                <Text fontSize="2xl" fontWeight="bold" ml={2}><Link to="/">Peer Review</Link></Text>
            </Flex>
            <Flex>
                {!user.user.username && <Button onClick={() => { user.signInOrRegister() }} bg='#6459F5' color="#ffffff" variant='solid'>
                    Login with Metamask
                </Button>}

                {user.user.username &&
                    <Flex alignItems="center" gridGap={6}>
                        <NavLink text="Home" href="/" />
                        <NavLink text="Upload" href="/paper" />
                        <NavLink text="Browse" href="/browse" />

                        <Menu>
                            <MenuButton>
                                <Avatar size="sm"></Avatar>
                            </MenuButton>
                            <MenuList>
                                <MenuItem as={Link} to="/profile">
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={() => user.signOut()}>Sign Out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>}
            </Flex>
        </Flex>
    )
}
