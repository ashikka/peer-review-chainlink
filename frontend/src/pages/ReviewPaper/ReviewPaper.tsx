import { Flex, Heading, Button, Text, Box, Badge, Textarea } from '@chakra-ui/react';
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




export default function ReviewPaper() {
    const api = useContext(ApiContext).api;
    const ether = useContext(EtherContext).ether;
    const user = useContext(UserContext).address;

    const [reviewer, setReviewer] = useState(false);
    const [commentScreen, showCommentScreen] = useState(false);
    const [notReviewer, setNotReviewer] = useState(false);
    const [paper, setPaper] = useState<ApiPaper>();
    const [pages, setPages] = useState(0);

    const { address } = useParams();

    const getPaper = async (address: string) => {
        if (api == null || ether == null) return;

        const paper = await api?.getPaper(address);
        if (paper == null) {
            return;
        }

        const apiPaper = paper.data?.paper;
        console.log(apiPaper);
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

    useEffect(() => {
        if (address && api && ether && user) {
            getPaper(address);
        }
    }, [address, api, ether, user]);

    if (commentScreen) {
        return (
            <>
                <Flex justifyContent="center" paddingTop="3rem">
                    <Flex pl="5rem" flexDirection="column" pt={10}>
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
                                <Text fontSize='s'>Vellore Institute of Technology, Vellore</Text>
                            </Box>
                        </Flex>
                        <a href={paper?.ipfsHash} download>
                            <Button color='#6459F5' variant='outline' borderColor='#6459F5' w="20vw">
                                <DownloadIcon mr="0.5rem" />
                                Download Paper
                            </Button>
                        </a>

                        <Text fontWeight="semibold" fontSize="lg" mt="2rem" mb="1rem">Comments</Text>
                        <Textarea placeholder="Write your comment here" w="30vw" h="20vh" />
                        <Flex flexDirection="column" w="20%">
                            <Button mt={4} mb={4} bg='#1AAF9E' color="#ffffff" variant='solid'>
                                <CheckIcon mr={2} />
                                Accept
                            </Button>
                            <Button mt={4} mb={4} bg='#d3455b' color="#ffffff" variant='solid'>
                                <CloseIcon w={3} h={3} mr={2} />
                                Reject
                            </Button>
                        </Flex>

                    </Flex>

                    <PaperView width="55vw" file={paper?.ipfsHash} heightPercentage={0.8} setPages={(pages) => setPages(pages)} />

                </Flex>

            </>
        )
    }

    if (notReviewer) {

        return (
            <>
                <Flex justifyContent="flex-start" >
                    <Flex pl="5rem" flexDirection="column" width="50vw">
                        <Heading as="h1" mt="10vh" mb={4}>How Do Autonomous Cars Work?</Heading>
                        <Flex mb="1rem" alignItems="center">
                            <Text>Submitted on 27 April 2022</Text>
                            <Flex mx="2rem" alignItems="center">
                                <Box as={IoIosPaper} size="26px" color="gray.800" mr="0.5rem" />
                                <Text>5 pages</Text>
                            </Flex>
                        </Flex>
                        <Text color="gray.500">Published in Computer Science and Engineering</Text>
                        <Flex alignItems="center">
                            <Box as={BsFilePersonFill} size="50px" color="gray.800" my="1rem" ml="-0.5rem" />
                            <Box>
                                <Text fontSize='s'>Anonymous</Text>
                                <Text fontSize='s'>Vellore Institute of Technology, Vellore</Text>
                            </Box>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Button color='#6459F5' variant='outline' borderColor='#6459F5' w="20vw">
                                <DownloadIcon mr="0.5rem" />
                                Download Paper
                            </Button>
                            <Button color='#6459F5' variant='outline' borderColor='#6459F5' w="20vw">
                                <LinkIcon mr="0.5rem" />
                                Copy link to paper
                            </Button>
                        </Flex>
                        <Flex alignItems="center" justifyContent="space-between">
                            <Flex mt="1rem" bg="#f7be68" w="20vw" h="2.5rem" justifyContent="center" alignItems="center" borderRadius="5px">Status: Under Review</Flex>
                            <Button bg='#6459F5' color="#ffffff" variant='solid' w="20vw" mt="1rem">
                                <ChatIcon mr="0.5rem" />
                                Show comments
                            </Button>
                        </Flex>
                        <Box borderTop="2px solid gray" borderX="2px solid gray" mt="2rem" pt="1rem" px="1rem">
                            <Text fontSize="md" mb="0.5rem">Abstract</Text>

                        </Box>
                        <Box maxW="50vw" border="2px solid gray" p="1rem">
                            <Text mt="0.5rem" fontSize="xs">Lorem ipsum dolor sit amet. Nam explicabo sint quo voluptatem dolorem qui molestiae unde At magni incidunt. Cum autem veritatis ea perferendis ipsum quo debitis suscipit! Quo omnis sunt non porro soluta hic dolore consequatur.

                                Est voluptatum voluptate ex neque consequatur ut voluptatem consequuntur. Cum delectus expedita eum repellendus consequatur vel maxime similique. Ut assumenda iure At tempore iusto a beatae rerum et dolorum autem est libero modi ut nobis nulla in cupiditate neque. Aut Quis illo id labore ipsum eos natus laboriosam.

                                Est consectetur consequuntur et dolores voluptatem sit quas exercitationem qui aliquam officia. Est delectus dolor nihil saepe qui magnam temporibus sed officia exercitationem eum voluptas expedita est alias consequuntur et eligendi distinctio. Qui alias animi qui dolorem praesentium ab repudiandae nulla aut voluptate facere!</Text>
                        </Box>
                    </Flex>
                </Flex>

            </>
        )

    }
    if (reviewer) {
        return (
            <>
                <Flex justifyContent="flex-start" >
                    <Flex pl="5rem" flexDirection="column" width="50vw">
                        <Heading as="h1" mt="10vh" mb={4}>How Do Autonomous Cars Work?</Heading>
                        <Flex mb="1rem" alignItems="center">
                            <Text>Submitted on 27 April 2022</Text>
                            <Flex mx="2rem" alignItems="center">
                                <Box as={IoIosPaper} size="26px" color="gray.800" mr="0.5rem" />
                                <Text>5 pages</Text>
                            </Flex>
                        </Flex>
                        <Text color="gray.500">Published in Computer Science and Engineering</Text>
                        <Flex alignItems="center">
                            <Box as={BsFilePersonFill} size="50px" color="gray.800" my="1rem" ml="-0.5rem" />
                            <Box>
                                <Text fontSize='s'>Anonymous</Text>
                                <Text fontSize='s'>Vellore Institute of Technology, Vellore</Text>
                            </Box>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Button color='#6459F5' variant='outline' borderColor='#6459F5' w="20vw">
                                <DownloadIcon mr="0.5rem" />
                                Download Paper
                            </Button>
                            <Button color='#6459F5' variant='outline' borderColor='#6459F5' w="20vw">
                                <LinkIcon mr="0.5rem" />
                                Copy link to paper
                            </Button>
                        </Flex>
                        <Button bg='#6459F5' color="#ffffff" variant='solid' w="20vw" mt="1rem">
                            Review Paper
                        </Button>
                        <Box borderTop="2px solid gray" borderX="2px solid gray" mt="2rem" pt="1rem" px="1rem">
                            <Text fontSize="md" mb="0.5rem">Abstract</Text>

                        </Box>
                        <Box maxW="50vw" border="2px solid gray" p="1rem">
                            <Text mt="0.5rem" fontSize="xs">Lorem ipsum dolor sit amet. Nam explicabo sint quo voluptatem dolorem qui molestiae unde At magni incidunt. Cum autem veritatis ea perferendis ipsum quo debitis suscipit! Quo omnis sunt non porro soluta hic dolore consequatur.

                                Est voluptatum voluptate ex neque consequatur ut voluptatem consequuntur. Cum delectus expedita eum repellendus consequatur vel maxime similique. Ut assumenda iure At tempore iusto a beatae rerum et dolorum autem est libero modi ut nobis nulla in cupiditate neque. Aut Quis illo id labore ipsum eos natus laboriosam.

                                Est consectetur consequuntur et dolores voluptatem sit quas exercitationem qui aliquam officia. Est delectus dolor nihil saepe qui magnam temporibus sed officia exercitationem eum voluptas expedita est alias consequuntur et eligendi distinctio. Qui alias animi qui dolorem praesentium ab repudiandae nulla aut voluptate facere!</Text>
                        </Box>
                    </Flex>
                </Flex>

            </>
        )
    }

    return <></>
}