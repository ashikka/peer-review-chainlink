import { useContext, useEffect, useRef, useState } from 'react';
import { ApiContext } from '../../contexts/api';
import { EtherContext } from '../../contexts/ether';
import { ChevronLeftIcon, ChevronRightIcon, LinkIcon } from '@chakra-ui/icons'
import { Flex, Heading, Button, OrderedList, ListItem, FormControl, FormLabel, Input, Progress, Container, Badge } from '@chakra-ui/react';
import logo from '../../assets/logo.png';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function UploadPaperScreen() {
    const [url, setUrl] = useState('');
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const file = useRef(null);
    const [progress, setProgress] = useState(0);
    const [reviewFileScreen, setReviewFileScreen] = useState(false);
    const ether = useContext(EtherContext).ether;
    const api = useContext(ApiContext).api;
    const [loading, setLoading] = useState(true);

    const MySwal = withReactContent(Swal)


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500)
    })

    if (loading) {
        return (
            <LoadingScreen />
        )
    }

    const retrieveFile = async (e: any) => {
        if (ether == null || !e.target.files) return;

        file.current = e.target.files[0];
        setProgress(0);
        e.preventDefault();
    }

    const reviewFile = async () => {
        if (file.current) {
            console.log(file.current)
            setReviewFileScreen(true);
        }
    }

    const uploadFile = async () => {
        if (ether == null) return;

        if (!file.current) return;

        const url = await ether.add(file.current, (progress) => setProgress(progress));
        console.log(url);
        setUrl(url);

        MySwal.fire({
            icon: 'success',
            title: <p>Good Job!</p>,
            html: (<div>Your paper has been uploaded successfully to <a href={url}>{url}</a></div>),
        });
    }

    const documentLoadSuccess = async (pdf: any) => {
        setNumPages(pdf.numPages);
        setPageNumber(1);
    };

    if (reviewFileScreen) {
        return (
            <>
                <Heading as='h2' mt={4} ml={12}>Review your Paper</Heading>
                <Flex direction="column" alignItems="center">
                    <Badge fontSize="1rem">{pageNumber}/{numPages}</Badge>
                    <Flex direction="row" alignItems="center">
                        <ChevronLeftIcon cursor="pointer" w={12} h={12} mr={12} onClick={() => {
                            if (pageNumber > 1) {
                                setPageNumber(pageNumber - 1);
                            }
                        }} />
                        <Document file={file.current} onLoadSuccess={documentLoadSuccess}>
                            <Page height={window.innerHeight * 0.7} pageNumber={pageNumber} />
                        </Document>
                        <ChevronRightIcon cursor="pointer" w={12} h={12} ml={12} onClick={() => {
                            if (pageNumber < numPages) {
                                setPageNumber(pageNumber + 1);
                            }
                        }} />
                    </Flex>

                    <Button mt={4} mb={4} bg='#6459F5' color="#ffffff" variant='solid' onClick={uploadFile}>
                        Submit
                    </Button>
                </Flex>
            </>
        )
    }

    return (<>

        <Flex justifyContent="center" flexDirection="column" alignItems="center" mt="5rem">
            <Flex flexDirection="row" alignItems="center">
                <img src={logo} alt="logo" width={130} />
                <Heading as='h1' size='3xl' marginLeft="2rem">Peer Review</Heading>
            </Flex>
            <Flex bgColor="#F8F8FB" px={30} py="4rem" mt="4rem" border="2px solid" borderColor="gray.300">
                <Flex flexDirection="column" mx={10}>
                    <FormControl isRequired onChange={retrieveFile}>
                        <FormLabel>Title</FormLabel>
                        <Input id='title' type='text' />
                        <FormLabel mt="0.5rem">Progress</FormLabel>
                        <Progress colorScheme='green' size='md' value={progress} />
                        <FormLabel mt="2rem">Attach your paper <LinkIcon /></FormLabel>

                        <Input type='file' id='formFile' onChange={retrieveFile} />
                        <Button mt={4} bg='#6459F5' color="#ffffff" variant='solid' onClick={reviewFile}>
                            Continue
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