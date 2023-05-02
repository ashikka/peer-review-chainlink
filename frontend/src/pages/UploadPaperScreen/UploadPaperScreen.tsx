import { useContext, useState } from 'react';
import { ApiContext } from '../../contexts/api';
import { EtherContext } from '../../contexts/ether';
import { LinkIcon } from '@chakra-ui/icons'
import { Flex, Heading, Button, OrderedList, ListItem, FormControl, FormLabel, Input, Progress } from '@chakra-ui/react';
import logo from '../../assets/logo.png';


export default function UploadPaperScreen() {
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

        <Flex justifyContent="center" flexDirection="column" alignItems="center" mt="5rem">
            <Flex flexDirection="row" alignItems="center">
                <img src={logo} alt="logo" width={130} />
                <Heading as='h1' size='3xl' marginLeft="2rem">Peer Review</Heading>
            </Flex>
            <Flex bgColor="#F8F8FB" px={30} py="4rem" mt="4rem" border="2px solid" borderColor="gray.300">
                <Flex flexDirection="column" mx={10}>
                    <FormControl isRequired  onChange={retrieveFile}>
                        <FormLabel>Title</FormLabel>
                        <Input id='title' type='text' />
                        <FormLabel mt="0.5rem">Progress</FormLabel>
                        <Progress colorScheme='green' size='md' value={20} />
                        <FormLabel mt="2rem">Attach your paper <LinkIcon/></FormLabel>
                        
                        <Button bg='#6459F5' color="#ffffff" variant='solid'>
                            Upload
                        </Button>
                    </FormControl>
                </Flex>
                <Flex flexDirection="column" justifyContent="center">
                    <Heading>Steps to follow</Heading>
                    <OrderedList spacing={3} fontSize="md" ml="1.5rem" mt="1rem">
                        <ListItem>Enter the title of the paper.</ListItem>
                        <ListItem>Upload your paper.</ListItem>
                        <ListItem>Wait for the peer review process to complete.</ListItem>
                    </OrderedList>
                </Flex>
            </Flex>
        </Flex>
    </>)
}