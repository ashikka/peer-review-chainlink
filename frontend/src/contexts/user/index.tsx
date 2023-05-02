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
    user: any,
}

export const UserContext = createContext<UserContextProps>({
    signInOrRegister: () => { },
    register: () => { },
    signIn: () => { },
    signOut: () => { },
    user: null,
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

        console.log(user.data);
    }


    const signIn = async (address: string) => {
        if (ether == null || api == null) return;

        const signature = await ether.signMessage("Click sign below to authenticate with DocPublish :)");

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
            user,
        }}>
            {children}
        </UserContext.Provider>
    );
}
