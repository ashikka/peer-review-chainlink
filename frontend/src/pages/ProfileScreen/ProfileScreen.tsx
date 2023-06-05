import {
    Box,
    Container,
    Flex,
    Heading,
    HStack,
    Tag,
    TagLabel,
    Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Link as ChakraLink
} from "@chakra-ui/react";
import { ApiContext } from "../../contexts/api";
import { EtherContext } from "../../contexts/ether";
import { ApiPaper } from "../../contexts/api/Api";
import { UserContext } from "../../contexts/user";
import PaperCard from "../../components/PaperCard/PaperCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";


export default function ProfileScreen() {
    const ether = useContext(EtherContext).ether;
    const api = useContext(ApiContext).api;
    const user = useContext(UserContext);
    const [papers, setPapers] = useState<ApiPaper[]>([]);
    const [filteredPapers, setFilteredPapers] = useState<ApiPaper[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [hindex, sethindex] = useState<number>(0);
    const [citations, setCitations] = useState<number>(0);
    const [showFilteredPapers, setShowFilteredPapers] = useState<boolean>(false);
    const [trustRating, setTrustRating] = useState<number>(0);

    const getPapers = async () => {
        const papers = await api?.getUserPapers();
        // console.log(papers?.data);
        if (papers == null) {
            return;
        }

        setPapers(papers?.data);
        console.log(papers.data)
    };

    const getScholarProfile = async () => {
        const profile = await api?.getUserScholarDetails();
        sethindex(profile?.data?.scholarDetails.hindex);
        setCitations(profile?.data?.scholarDetails.citations);
    }

    const getTrustRating = async () => {
        const user = await ether?.getMyUser();
        setTrustRating((await user?.trust_rating())?.toNumber() || 0);
    }

    useEffect(() => {
        if (ether && api && user.token) {
            getPapers();
            getTrustRating();
            getScholarProfile();
        }
    }, [ether, api, user.token]);


    const filterPapers = (filter: string) => {
        if (papers.length > 0) {
            setFilteredPapers(papers?.filter(paper => paper.status.includes(filter)))
        }
    }

    const filteredPapersView = () => {
        return (
            <>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {filteredPapers.map((paper) => (
                        <SwiperSlide>
                            <Link to={`/view/${paper.address}`}>
                                <Box transitionDuration="0.2s" transitionTimingFunction="ease-out" _hover={{ transform: 'scale(1.1)' }} py={10} px={6}>
                                    <PaperCard
                                        title={paper.title}
                                        status={paper.status}
                                        abstract={paper.abstract}
                                        ipfsHash={paper.ipfsHash}
                                        heightPercentage={0.2}
                                        category={paper.category}
                                    />
                                </Box>
                            </Link>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )
    }

    return (
        <>
            <Container maxW='7xl'>
                    <Heading mt={4}>Your Profile</Heading>
                    <Flex my="2rem" justifyContent="space-between" alignItems="center">
                        <Flex alignItems="center">
                            <img
                                style={{ borderRadius: "50%", height: "150px", width: "150px" }}
                                src="https://media-exp1.licdn.com/dms/image/C5603AQGtgn0mDao7LQ/profile-displayphoto-shrink_400_400/0/1649330215887?e=1655942400&v=beta&t=WJi-xD6TDcgs3Bxweischb2BRdmqmnoNVnds-UPdqHc"
                                alt="profile"
                            />
                            <Box ml={8}>
                                <Text>
                                    <b>Name:</b> {user.username}
                                </Text>
                                <Text>
                                    <b>Designation:</b> {user.designation}
                                </Text>
                                <Text>
                                    <b>Email:</b> {user.email}
                                </Text>
                                <Text>
                                    <b>Trust Rating:</b> {trustRating}/100
                                </Text>
                                <Text>
                                    <ChakraLink href={user.scholarUrl} color="teal.500" isExternal>
                                        Google Scholar <ExternalLinkIcon mx='2px' />
                                    </ChakraLink>
                                </Text>
                            </Box>
                        </Flex>
                        <TableContainer>
                            <Table variant="striped">
                                <Thead>
                                    <Tr textAlign="center">
                                        <Th>Researcher Statistics</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Citations</Td>
                                        <Td>h-index</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>{citations}</Td>
                                        <Td>{hindex}</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Flex>
                    <Heading as="h3" size="lg" mt={4}>
                        My Papers
                    </Heading>
                    <HStack spacing={6} mt={6}>
                        <Box as={FaFilter} size="32px" color="gray.800" />
                        <Text>Filters</Text>
                        <Tag onClick={() => {
                            filterPapers("UNDER_REVIEW")
                            setShowFilteredPapers(true)
                        }}
                            size="md" variant="solid" colorScheme="gray" padding="0.5rem">
                            <TagLabel>Under Review</TagLabel>
                        </Tag>
                        <Tag onClick={() => {
                            filterPapers("PUBLISHED")
                            setShowFilteredPapers(true)
                        }} size="md" variant="solid" colorScheme="gray" padding="0.5rem">
                            <TagLabel>Approved</TagLabel>
                        </Tag>{" "}
                        <Tag onClick={() => {
                            filterPapers("REJECTED")
                            setShowFilteredPapers(true)
                        }} size="md" variant="solid" colorScheme="gray" padding="0.5rem">
                            <TagLabel>Rejected</TagLabel>
                        </Tag>
                        <Tag onClick={() => { setShowFilteredPapers(false) }} size="md" variant="solid" colorScheme="gray" padding="0.5rem">
                            <TagLabel>Show All</TagLabel>
                        </Tag>
                    </HStack>
                    {showFilteredPapers ? filteredPapersView() : papers.length > 0 &&
                        (
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                className="mySwiper"
                            >
                                {papers.map((paper) => (
                                    <SwiperSlide>
                                        <Link to={`/view/${paper.address}`}>
                                            <Box transitionDuration="0.2s" transitionTimingFunction="ease-out" _hover={{ transform: 'scale(1.1)' }} py={10} px={6}>
                                                <PaperCard
                                                    title={paper.title}
                                                    status={paper.status}
                                                    abstract={paper.abstract}
                                                    ipfsHash={paper.ipfsHash}
                                                    heightPercentage={0.2}
                                                    category={paper.category}
                                                />
                                            </Box>
                                        </Link>

                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )
                    }
            </Container>
        </>
    );
}

