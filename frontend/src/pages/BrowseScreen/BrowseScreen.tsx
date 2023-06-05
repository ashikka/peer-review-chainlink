import { Box, Container, Flex, Heading, HStack, Tag, TagLabel, Text } from '@chakra-ui/react';
import react, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaFilter } from 'react-icons/fa';
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation } from 'swiper';
import PaperCard from '../../components/PaperCard/PaperCard';
import { ApiContext } from '../../contexts/api';
import { ApiPaper } from '../../contexts/api/Api';
import { EtherContext } from '../../contexts/ether';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BrowseScreen() {
    const api = useContext(ApiContext).api;
    const ether = useContext(EtherContext).ether;

    const [papers, setPapers] = useState<ApiPaper[]>([]);
    const [filteredPapers, setFilteredPapers] = useState<ApiPaper[]>([]);
    const [showFilteredPapers, setShowFilteredPapers] = useState<boolean>(false);

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


    const getAllPapers = async () => {
        const papers = await api?.getAllPapers();
        console.log(papers?.data);
        if (papers == null) {
            return;
        }

        setPapers(papers?.data);
    };
    useEffect(() => {
        if (api && ether) {
            getAllPapers();
        }
    }, [api, ether]);

    return (
        <>
            <Container maxW='8xl'>
                    <Heading mt={4}>Browse the Latest Papers 📃</Heading>
                    <Text mt={4} color="grey">Use the filters below to search through recently published papers on the PeerReview Blockchain!</Text>
                    <HStack spacing={6} mt="2rem">
                        <Box as={FaFilter} size="32px" color="gray.800" />
                        <Text>Filters</Text>
                        <Tag onClick={() => {
                            filterPapers("UNDER_REVIEW")
                            setShowFilteredPapers(true)
                        }}
                            size="md" variant="solid" colorScheme="gray" padding="0.5rem">
                            <TagLabel>Under Review</TagLabel>
                        </Tag>
                        <Tag
                            onClick={() => {
                                filterPapers("PUBLISHED")
                                setShowFilteredPapers(true)
                            }}
                            size="md" variant="solid" colorScheme="gray" padding="0.5rem">
                            <TagLabel>Approved</TagLabel>
                        </Tag>{" "}
                        <Tag
                            onClick={() => {
                                filterPapers("REJECTED")
                                setShowFilteredPapers(true)
                            }}
                            size="md" variant="solid" colorScheme="gray" padding="0.5rem">
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
                    <Heading mt={4}>Recommended 💡</Heading>
                    <Text mt={4} color="grey">These papers are recommended based on your interests!</Text>
                    {papers.length > 0 &&
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
    )
}