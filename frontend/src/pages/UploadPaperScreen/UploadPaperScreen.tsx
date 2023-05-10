import { useContext, useEffect, useRef, useState } from 'react';
import { ApiContext } from '../../contexts/api';
import { EtherContext } from '../../contexts/ether';
import { ChevronLeftIcon, ChevronRightIcon, LinkIcon } from '@chakra-ui/icons'
import { Flex, Heading, Button, OrderedList, ListItem, FormControl, FormLabel, Input, Progress, Badge, Select, Textarea, Text, Box } from '@chakra-ui/react';
import logo from '../../assets/logo.png';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import { IoIosPaper } from 'react-icons/io';
import { BsFilePersonFill } from 'react-icons/bs';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons'
import PaperView from '../../components/PaperView/PaperView';


export default function UploadPaperScreen() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [abstract, setAbstract] = useState("");
    const [url, setUrl] = useState('');
    const file = useRef(null);
    const [progress, setProgress] = useState(0);
    const [reviewFileScreen, setReviewFileScreen] = useState(false);
    const [abstractScreen, setAbstractScreen] = useState(false);
    const ether = useContext(EtherContext).ether;
    const api = useContext(ApiContext).api;
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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

    const showOptions = () => {
        return (
            <Select placeholder='Select from dropdown' value={category} onChange={e => setCategory(e.target.value)}>
                {["Physical, Chemical and Earth Sciences", "Humanities and Creative Arts", "Social Sciences", "Business and Management", "Engineering and Technology", "Education", "Law", "Health and Medicine", "Agriculture and Environment", "Other"].map((category) => <option>{category}</option>)}
            </Select>
        )
    }

    const retrieveFile = async (e: any) => {
        if (ether == null || !e.target.files) return;

        file.current = e.target.files[0];
        setProgress(0);
        e.preventDefault();
    }

    const reviewFile = async () => {
        if (file.current && title && category) {
            console.log(file.current)

            if (ether == null) return;

            if (!file.current) return;

            const url = await ether.add(file.current, (progress) => setProgress(progress));
            setUrl(url);

            setProgress(100);

            setTimeout(() => setAbstractScreen(true), 500);
            if (abstract) {
                setReviewFileScreen(true);
            }
        } else {
            MySwal.fire({
                icon: 'error',
                title: <p>Oops!</p>,
                html: (<div>Required fields are not filled.</div>),
            });
        }
    }

    const uploadFile = async () => {
        MySwal.fire({
            icon: 'success',
            title: <p>Good Job!</p>,
            html: (<div>Your paper has been uploaded successfully <a style={{ color: 'blue' }} href={url}>here</a></div>),
        }).then((val) => {
            if (val.isConfirmed) {
                navigate('/browse');
            }
        });
    }

    if (reviewFileScreen) {
        return (
            <>
                <Flex justifyContent="space-around">
                    <PaperView file={file.current} heading="Review your paper" />
                    <Flex justifyContent="flex-start" flexDirection="column" w="40vw">
                        <Text fontSize='3xl' mt="10vh" mb={4}>How Do Autonomous Cars Work?</Text>
                        <Flex mb="1rem" alignItems="center">
                            <Text>Submitted on 27 April 2022</Text>
                            <Flex mx="2rem" alignItems="center">
                                <Box as={IoIosPaper} size="26px" color="gray.800" mr="0.5rem"  />
                                <Text>5 pages</Text>
                            </Flex>
                        </Flex>
                        <Text color="gray.500">Published in Computer Science and Engineering</Text>
                        <Flex alignItems="center">
                            <Box as={BsFilePersonFill} size="70px" color="gray.800" my="1rem" ml="-0.5rem" />
                            <Box>
                                <Text>Anonymous</Text>
                                <Text>Vellore Institute of Technology, Vellore</Text>
                            </Box>
                        </Flex>
                        <Text fontSize="md" mb="0.5rem">Abstract</Text>
                        <Box maxW="30vw" borderTop="2px solid gray">
                            <Text mt="0.5rem" fontSize="xs">Lorem ipsum dolor sit amet. Nam explicabo sint quo voluptatem dolorem qui molestiae unde At magni incidunt. Cum autem veritatis ea perferendis ipsum quo debitis suscipit! Quo omnis sunt non porro soluta hic dolore consequatur.

                                Est voluptatum voluptate ex neque consequatur ut voluptatem consequuntur. Cum delectus expedita eum repellendus consequatur vel maxime similique. Ut assumenda iure At tempore iusto a beatae rerum et dolorum autem est libero modi ut nobis nulla in cupiditate neque. Aut Quis illo id labore ipsum eos natus laboriosam.

                                Est consectetur consequuntur et dolores voluptatem sit quas exercitationem qui aliquam officia. Est delectus dolor nihil saepe qui magnam temporibus sed officia exercitationem eum voluptas expedita est alias consequuntur et eligendi distinctio. Qui alias animi qui dolorem praesentium ab repudiandae nulla aut voluptate facere!</Text>
                        </Box>

                        <Flex flexDirection="column" w="20%">
                            <Button mt={4} mb={4} bg='#1AAF9E' color="#ffffff" variant='solid' onClick={uploadFile}>
                                <CheckIcon mr={2} />
                                Submit
                            </Button>
                            <Button mt={4} mb={4} bg='#d3455b' color="#ffffff" variant='solid' onClick={uploadFile}>
                                <CloseIcon w={3} h={3} mr={2} />
                                Cancel
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </>
        )
    }

    if (abstractScreen) {
        return (<>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" height="90vh">
                <Flex flexDirection="row" alignItems="center">
                    <img src={logo} alt="logo" width={130} />
                    <Heading as='h1' size='3xl' marginLeft="2rem">Peer Review</Heading>
                </Flex>
                <Flex bgColor="#F8F8FB" py="2rem" px="2rem" mt="2rem" border="2px solid" borderColor="gray.300">
                    <Flex flexDirection="column" mx={10}>
                        <FormControl isRequired onChange={retrieveFile}>
                            <FormLabel>Abstract</FormLabel>
                            <Textarea w="40rem" h="15rem" d="block" placeholder='Write your abstract here' value={abstract} onChange={e => setAbstract(e.target.value)} />
                            <Button mt={4} bg='#6459F5' color="#ffffff" variant='solid' onClick={reviewFile}>
                                Continue
                            </Button>
                        </FormControl>
                    </Flex>
                </Flex>
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
            <Flex bgColor="#F8F8FB" px={30} py="3rem" mt="3rem" border="2px solid" borderColor="gray.300">
                <Flex flexDirection="column" mx={10}>
                    <FormControl isRequired onChange={retrieveFile}>
                        <FormLabel>Title</FormLabel>
                        <Input id='title' type='text' value={title} onChange={e => setTitle(e.target.value)} />
                        <FormLabel mt="1rem">Category</FormLabel>
                        {showOptions()}
                        <FormLabel mt="1rem">Attach your paper <LinkIcon /></FormLabel>

                        <Input type='file' id='formFile' onChange={retrieveFile} />
                        <FormLabel mt="0.5rem">Progress</FormLabel>
                        <Progress colorScheme='green' size='md' value={progress} />
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