import { Text, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormHelperText, FormLabel, Input, Alert, AlertIcon, Image } from '@chakra-ui/react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../stores';
import { setUser } from '../../stores/slices/userSlice';
import { User } from '../../typechain';
import { ApiContext } from '../api';
import { EtherContext } from '../ether';
import VerifyGif from '../../assets/VerifyScholar.gif';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

export type UserContextProps = {
    signInOrRegister: Function,
    register: Function,
    signIn: Function,
    signOut: Function,
    address: string,
    email: string,
    token: string,
    username: string,
    designation: string,
    scholarUrl: string,
}

export function RegisterModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [scholarUrl, setScholarUrl] = useState("");
    const [address, setAddress] = useState("");
    const ether = useContext(EtherContext).ether;

    const user = useContext(UserContext);

    const MySwal = withReactContent(Swal)

    const getAddress = async () => {
        if (ether) {
            const address = await ether.connectWallet();
            setAddress(address);
        }
    }

    useEffect(() => {
        getAddress();
    }, [ether])

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Register for a new account</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Alert status='info'>
                        <AlertIcon />
                        To signup on Peer Review, you need a google scholar account, and need to verify ownership of that account.
                    </Alert>
                    <FormControl mt={4}>
                        <FormLabel htmlFor='username'>Google Scholar Profile URL</FormLabel>
                        <Input placeholder='https://scholar.google.co.in/citations?user=G30mwMoAAAAJ&hl=en' onChange={(e) => setScholarUrl(e.target.value)} id='designation' type='url' />
                    </FormControl>
                    <Text mt={4}>
                        Navigate to Google Scholar, and add your metamask wallet address to your affiliation:
                        <Badge>{address}</Badge>
                    </Text>

                    <Image mt={4} src={VerifyGif} />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={async () => {
                        const res = await user.register(scholarUrl);
                        console.log(res.success);
                        if (res && res.success === true) {
                            onClose();
                            await user.signInOrRegister();
                        } else {
                            console.log(res);
                            onClose();
                            MySwal.fire({
                                title: <p>Error</p>,
                                html: (<>{res.message}</>),
                                icon: 'error',
                            })
                        }
                    }}>
                        Register
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export const UserContext = createContext<UserContextProps>({
    signInOrRegister: () => { },
    register: () => { },
    signIn: () => { },
    signOut: () => { },
    username: '',
    email: '',
    token: '',
    address: '',
    designation: '',
    scholarUrl: '',
});


export const UserContextProvider = ({ children }: { children: any }) => {
    const ether = useContext(EtherContext).ether;
    const api = useContext(ApiContext).api;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);

    const getUser = async (token: string) => {
        if (ether == null || api == null) {
            return;
        }
        api.setToken(token);
        const user = await api?.me();
        if (user?.data) {
            let userContract = (await ether.getMyUser()) as User;
            if (!userContract) {
                console.log("User contract not found, creating");

                await ether.createUser();
                userContract = (await ether.getMyUser()) as User;

                if (userContract == null) {
                    navigate('/');
                    return;
                }
            }
            
            ether.setMyUser(userContract);
            const trustRatingRes = await api.updateTrustRating();
            console.log("Update Trust Rating Response", trustRatingRes.data);
            user.data.token = token;
            dispatch(setUser(user.data));
        } else {
            navigate('/');
        }

    }
    useEffect(() => {
        if (api) {
            const token = localStorage.getItem("token");
            if (token) {
                getUser(token);
            } else {
                navigate('/');
            }
        }
    }, [api]);

    useEffect(() => {
        console.log(user)
    }, [user.token]);

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

    const register = async (scholarUrl: string) => {
        if (ether == null || api == null) return;
        const signature = await ether.signMessage("Click sign below to authenticate with Peer Review :)");

        if (signature == null) return;

        const address = await ether.connectWallet();
        if (address == null) return;

        const user = await api.register(address, signature, scholarUrl);

        return user.data;
    }


    const signIn = async (address: string) => {
        if (ether == null || api == null) return;

        const signature = await ether.signMessage("Click sign below to authenticate with Peer Review :)");

        if (signature == null) return;

        const res = await api.login(address, signature);
        localStorage.setItem("token", res.data.token);
        getUser(res.data.token);
    }

    const signOut = async () => {
        localStorage.removeItem("token");
        dispatch(setUser({}));
        navigate('/');
    };

    return (
        <UserContext.Provider value={{
            signIn,
            signInOrRegister,
            signOut,
            register,
            username: user.username || "",
            address: user.address || "",
            email: user.email || "",
            token: user.token || "",
            designation: user.designation || "",
            scholarUrl: user.scholarUrl || "",
        }}>
            <RegisterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            {children}
        </UserContext.Provider>
    );
}
