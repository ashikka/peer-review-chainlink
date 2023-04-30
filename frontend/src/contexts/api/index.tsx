import React, { createContext, useEffect } from 'react';
import Api from './Api';

export type ApiContextProps = {
    api: Api | null;
}

export const ApiContext = createContext<ApiContextProps>({
    api: null,
});

export const ApiContextProvider = ({ children }: { children: any }) => {
    const [api, setApi] = React.useState<Api | null>(null);
    useEffect(() => {
        const api = new Api();
        setApi(api);
    }, []);

    return (
        <ApiContext.Provider value={{
            api,
        }}>
            {children}
        </ApiContext.Provider>
    );
}