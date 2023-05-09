import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../stores';
import { setUser } from '../../stores/slices/userSlice';
import { ApiContext } from '../api';
import { EtherContext } from '../ether';
import User from './User';

export type UserContextProps = {
    signInOrRegister: Function,
    register: Function,
    signIn: Function,
    signOut: Function,
    address: string,
    email: string,
    token: string,
    username: string,
}

export function RegisterModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const user = useContext(UserContext);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Register for a new account</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input onChange={(e) => {setEmail(e.target.value)}} id='email' type='email' />
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel htmlFor='username'>Username</FormLabel>
                        <Input onChange={(e) => setUsername(e.target.value)} id='username' type='username' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={async () => {
                        await user.register(username, email);
                        onClose();
                        await user.signInOrRegister();
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
});

export const UserContextProvider = ({ children }: { children: any }) => {
    const ether = useContext(EtherContext).ether;
    const api = useContext(ApiContext).api;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);

    const getUser = async (token: string) => {
        api?.setToken(token);
        const user = await api?.me();
        if (user?.data) {
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

    const register = async (name: string, email: string) => {
        if (ether == null || api == null) return;
        const signature = await ether.signMessage("Click sign below to authenticate with DocPublish :)");

        if (signature == null) return;

        const address = await ether.connectWallet();
        if (address == null) return;

        const user = await api.register(address, name, email, signature);

    }


    const signIn = async (address: string) => {
        if (ether == null || api == null) return;

        const signature = await ether.signMessage("Click sign below to authenticate with DocPublish :)");

        if (signature == null) return;

        const res = await api.login(address, signature);
        localStorage.setItem("token", res.data.token);
        getUser(res.data.token);
        navigate('/paper');
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
        }}>
            <RegisterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            {children}
        </UserContext.Provider>
    );
}
