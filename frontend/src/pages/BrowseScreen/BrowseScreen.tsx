import { Heading, Text } from '@chakra-ui/react';
import react, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../contexts/api';
import { ApiPaper } from '../../contexts/api/Api';
import { EtherContext } from '../../contexts/ether';

export default function BrowseScreen() {
    const api = useContext(ApiContext).api;
    const ether = useContext(EtherContext).ether;

    const [papers, setPapers] = useState<ApiPaper[]>([]);

    const getAllPapers = async () => {
        const papers = await api?.getAllPapers();
        console.log(papers?.data);
        if (papers == null) {
            return;
        }

        setPapers(papers?.data);
    };
    useEffect(() => {
        getAllPapers();
    }, []);

    return (
        <>
            <Heading>Browse</Heading>

            <Text>There are {papers?.length} papers on the PeerReview Blockchain</Text>
        </>
    )
}