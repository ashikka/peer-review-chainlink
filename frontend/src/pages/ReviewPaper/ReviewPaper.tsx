import { Flex, Heading, Button, Text, Box, Badge, Textarea, Container } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { IoIosPaper } from 'react-icons/io';
import { BsFilePersonFill } from 'react-icons/bs';
import { ChatIcon, LinkIcon, DownloadIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import PaperView from '../../components/PaperView/PaperView';
import { useParams } from 'react-router-dom';
import { ApiContext } from '../../contexts/api';
import { EtherContext } from '../../contexts/ether';
import { ApiPaper } from '../../contexts/api/Api';
import { UserContext } from '../../contexts/user';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';




export default function ReviewPaper() {
    const api = useContext(ApiContext).api;
    const ether = useContext(EtherContext).ether;
    const user = useContext(UserContext).address;

    const [reviewer, setReviewer] = useState(false);
    const [commentScreen, showCommentScreen] = useState(false);
    const [notReviewer, setNotReviewer] = useState(false);
    const [paper, setPaper] = useState<ApiPaper>();
    const [pages, setPages] = useState(0);
    const [ipfsHash, setIpfsHash] = useState("");
    const [comment, setComment] = useState("");

    const MySwal = withReactContent(Swal)

    const { address } = useParams();

    const getPaper = async (address: string) => {
        if (api == null || ether == null) return;

        const paper = await api?.getPaper(address);
        if (paper == null) {
            return;
        }

        const apiPaper = paper.data?.paper;
        console.log(apiPaper);
        console.log(apiPaper.ipfsHash);

        setIpfsHash(apiPaper.ipfsHash);

        if (apiPaper) {
            setPaper(paper.data.paper);

            if (user === paper.data.paper.user) {
                setNotReviewer(true);
                setReviewer(false);
            } else {
                setReviewer(true);
                setNotReviewer(false);
            }
        }
    }

    const showCommentsPopup = (commentsArray: any) => {
        console.log(commentsArray);
        MySwal.fire({
            title: <p>Comments</p>,
            html: (<>{commentsArray.map((c: any) => <ul>{c.comment}</ul>)}</>),
        })
    }

    const addYourReview = async (status: boolean, comment: string) => {
        if (ether == null) return;

        const review = await ether?.addReview(status, comment, paper?.address as string);
        if (review == null) {
            return;
        }

        MySwal.fire({
            icon: 'success',
            title: <p>Your review was submitted!</p>,
        })
    }

    useEffect(() => {
        if (address && api && ether && user) {
            getPaper(address);
        }
    }, [address, api, ether, user]);

    if (commentScreen) {
        return (
            <>
                <Container maxW='7xl'>
                    <Flex justifyContent="flex-start">
                        <Flex flexDirection="column" pt={10}>
                            <Heading as="h1" mb={4}>{paper?.title}</Heading>
                            <Flex mb="1rem" alignItems="center">
                                <Text>Submitted on {paper?.date && new Date(paper.date).toLocaleString()}</Text>
                                <Flex mx="2rem" alignItems="center">
                                    <Box as={IoIosPaper} size="26px" color="gray.800" mr="0.5rem" />
                                    <Text>{pages} pages</Text>
                                </Flex>
                            </Flex>
                            <Text color="gray.500">Published in {paper?.category}</Text>
                            <Flex alignItems="center">
                                <Box as={BsFilePersonFill} size="40px" color="gray.800" my="1rem" ml="-0.5rem" />
                                <Box>
                                    <Text fontSize='s'>Anonymous</Text>
                                </Box>
                            </Flex>
                            <a href={paper?.ipfsHash} download>
                                <Button color='#6459F5' variant='outline' borderColor='#6459F5' w="20vw">
                                    <DownloadIcon mr="0.5rem" />
                                    Download Paper
                                </Button>
                            </a>

                            <Text fontWeight="semibold" fontSize="lg" mt="2rem" mb="1rem">Comments</Text>
                            <Textarea placeholder="Write your comment here" w="30vw" h="20vh" value={comment} onChange={(e) => setComment(e.target.value)} />
                            <Flex flexDirection="column" w="20%">
                                <Button mt={4} mb={4} bg='#1AAF9E' color="#ffffff" variant='solid' onClick={() => addYourReview(true, comment)}>
                                    <CheckIcon mr={2} />
                                    Accept
                                </Button>
                                <Button mt={4} mb={4} bg='#d3455b' color="#ffffff" variant='solid' onClick={() => addYourReview(false, comment)}>
                                    <CloseIcon w={3} h={3} mr={2} />
                                    Reject
                                </Button>
                            </Flex>

                        </Flex>

                        <PaperView width="55vw" file={paper?.ipfsHash} heightPercentage={0.8} setPages={(pages) => setPages(pages)} />

                    </Flex>
                </Container>

            </>
        )
    }

    if (notReviewer) {

        return (
            <>
                <Container maxW='7xl'>
                    <Flex justifyContent="flex-start" >
                        <Flex flexDirection="column">
                            <Heading as="h1" mt="10vh" mb={2}>{paper?.title}</Heading>
                            <Flex mb={2} alignItems="center">
                                <Text>Submitted on {paper?.date && new Date(paper.date).toLocaleString()}</Text>
                                <Flex mx="2rem" alignItems="center">
                                    <Box as={IoIosPaper} size="26px" color="gray.800" mr="0.5rem" />
                                    <Text>{pages} pages</Text>
                                </Flex>
                            </Flex>
                            <Text color="gray.500">Published in {paper?.category}</Text>
                            <Flex alignItems="center">
                                <Box as={BsFilePersonFill} size="50px" color="gray.800" my="1rem" ml="-0.5rem" />
                                <Box>
                                    <Text fontSize='s'>Anonymous</Text>
                                </Box>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <a href={paper?.ipfsHash} download>
                                    <Button color='#6459F5' variant='outline' borderColor='#6459F5' w="250px">
                                        <DownloadIcon mr="0.5rem" />
                                        Download Paper
                                    </Button>
                                </a>
                                <Button ml={4} color='#6459F5' variant='outline' borderColor='#6459F5' w="250px">
                                    <LinkIcon mr="0.5rem" />
                                    Copy link to paper
                                </Button>
                            </Flex>
                            <Flex alignItems="center" justifyContent="space-between">
                                <Flex mt="1rem" bg="#f7be68" w="250px" h="2.5rem" justifyContent="center" alignItems="center" borderRadius="5px">Status: {paper?.status as string}</Flex>
                                <Button bg='#6459F5' color="#ffffff" variant='solid' w="250px" mt="1rem" onClick={async () => showCommentsPopup(await ether?.getPaperReviews(paper?.address as string))}>
                                    <ChatIcon mr="0.5rem" />
                                    Show comments
                                </Button>
                            </Flex>
                            <Box borderTop="2px solid gray" borderX="2px solid gray" mt="2rem" pt="1rem" px="1rem">
                                <Text fontSize="md" mb="0.5rem">Abstract</Text>

                            </Box>
                            <Box maxW="50vw" border="2px solid gray" p="1rem">
                                <Text mt="0.5rem" fontSize="xs">{paper?.abstract}</Text>
                            </Box>
                        </Flex>
                        <Flex mt="2rem">
                            <PaperView file={ipfsHash} setPages={(pages) => setPages(pages)} />
                        </Flex>
                    </Flex>
                </Container>
            </>
        )

    }
    if (reviewer) {
        return (
            <>
                <Container maxW='7xl'>
                    <Flex justifyContent="flex-start" >
                        <Flex flexDirection="column" width="50vw">
                            <Heading as="h1" mt="10vh" mb={4}>{paper?.title}</Heading>
                            <Flex mb="1rem" alignItems="center">
                                <Text>Submitted on {paper?.date && new Date(paper.date).toLocaleString()}</Text>
                                <Flex mx="2rem" alignItems="center">
                                    <Box as={IoIosPaper} size="26px" color="gray.800" mr="0.5rem" />
                                    <Text>{pages} pages</Text>
                                </Flex>
                            </Flex>
                            <Text color="gray.500">Published in {paper?.category}</Text>
                            <Flex alignItems="center">
                                <Box as={BsFilePersonFill} size="50px" color="gray.800" my="1rem" ml="-0.5rem" />
                                <Box>
                                    <Text fontSize='s'>Anonymous</Text>
                                </Box>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <a href={paper?.ipfsHash} download>

                                    <Button color='#6459F5' variant='outline' borderColor='#6459F5' w="20vw">
                                        <DownloadIcon mr="0.5rem" />
                                        Download Paper
                                    </Button>
                                </a>
                                <Button color='#6459F5' variant='outline' borderColor='#6459F5' w="20vw">
                                    <LinkIcon mr="0.5rem" />
                                    Copy link to paper
                                </Button>
                            </Flex>
                            <Button bg='#6459F5' color="#ffffff" variant='solid' w="20vw" mt="1rem" onClick={() => {
                                showCommentScreen(true);
                                setReviewer(false);
                            }}>
                                Review Paper
                            </Button>
                            <Box borderTop="2px solid gray" borderX="2px solid gray" mt="2rem" pt="1rem" px="1rem">
                                <Text fontSize="md" mb="0.5rem">Abstract</Text>

                            </Box>
                            <Box maxW="50vw" border="2px solid gray" p="1rem">
                                <Text mt="0.5rem" fontSize="xs">{paper?.abstract}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </Container>
            </>
        )
    }

    return <></>
}