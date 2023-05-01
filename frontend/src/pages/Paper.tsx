import react, { useContext, useState } from 'react';
import { ApiContext } from '../contexts/api';
import { EtherContext } from '../contexts/ether';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

export default function Paper() {
    const [url, setUrl] = useState('');
    const ether = useContext(EtherContext).ether;
    const api = useContext(ApiContext).api;

    const retrieveFile = async (e: any) => {
        if (ether == null) return;
        const file = e.target.files[0];

        const url = await ether.add(file);
        setUrl(url);
        e.preventDefault();
    }

    return (<>
        <div className="flex items-center flex-col">
            <div className="mb-3 w-96">
                <label className="form-label inline-block mb-2 text-gray-700">Upload your Paper!</label>
                <input className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" onChange={retrieveFile} />
            </div>

            <button type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Upload</button>

            {url && <div className="mt-2 font-semibold">
                Paper uploaded to <a href={url}>{url}</a>

                <Document file={url}>
                    <Page pageNumber={1} />
                </Document>
            </div>}
        </div>
    </>)
}