import React, { createContext, useEffect } from 'react';
import Ether from './Ether';

export type EtherContextProps = {
    ether: Ether | null;
}

export const EtherContext = createContext<EtherContextProps>({
    ether: null,
});

export const EtherContextProvider = ({ children }: { children: any }) => {
    const [ether, setEther] = React.useState<Ether | null>(null);
    useEffect(() => {
        const ether = new Ether();
        setEther(ether);
    }, []);

    return (
        <EtherContext.Provider value={{
            ether,
        }}>
            {children}
        </EtherContext.Provider>
    );
}