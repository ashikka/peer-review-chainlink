import {
    Box,
    Flex,
    Heading,
    HStack,
    Tag,
    TagLabel,
    Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import { ApiContext } from "../../contexts/api";
import { EtherContext } from "../../contexts/ether";
import { ApiPaper } from "../../contexts/api/Api";
import { UserContext } from "../../contexts/user";
import { Paper } from "../../typechain";
import PaperView from "../../components/PaperView/PaperView";
import PaperCard from "../../components/PaperCard/PaperCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import { Link } from "react-router-dom";


export default function ProfileScreen() {
    const ether = useContext(EtherContext).ether;
    const api = useContext(ApiContext).api;
    const user = useContext(UserContext).token;
    const [papers, setPapers] = useState<ApiPaper[]>([]);
    const [pages, setPages] = useState<number>(0);

    const getPapers = async () => {
        const papers = await api?.getUserPapers();
        // console.log(papers?.data);
        if (papers == null) {
            return;
        }

        setPapers(papers?.data);
        console.log(papers.data.length)
    };

    useEffect(() => {
        if (ether && api && user) {
            getPapers();
        }
    }, [ether, api, user]);


    const paperComps = papers.map((paper) => {
        return (
            <h1>Hello</h1>
        )
    });
    return (
        <>
            <Flex my="2rem" justifyContent="space-around" alignItems="center">
                <img
                    style={{ borderRadius: "50%", height: "25vh", width: "25vh" }}
                    src="https://media-exp1.licdn.com/dms/image/C5603AQGtgn0mDao7LQ/profile-displayphoto-shrink_400_400/0/1649330215887?e=1655942400&v=beta&t=WJi-xD6TDcgs3Bxweischb2BRdmqmnoNVnds-UPdqHc"
                    alt="profile"
                />
                <Box>
                    <Text>
                        <b>Name:</b> John Doe
                    </Text>
                    <Text>
                        <b>Designation:</b> Assistant Professor at VIT, Vellore
                    </Text>
                    <Text>
                        <b>Email:</b> johndoe@gmail.com
                    </Text>
                </Box>
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
                                <Td>134</Td>
                                <Td>12</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
            <Heading as="h3" size="lg" mx="6vw">
                Papers Uploaded
            </Heading>
            <HStack spacing={6} mx="6vw" my="2rem">
                <Box as={FaFilter} size="32px" color="gray.800" />
                <Text>Filters</Text>
                <Tag size="md" variant="solid" colorScheme="gray" padding="0.5rem">
                    <TagLabel>Under Review</TagLabel>
                </Tag>
                <Tag size="md" variant="solid" colorScheme="gray" padding="0.5rem">
                    <TagLabel>Approved</TagLabel>
                </Tag>{" "}
                <Tag size="md" variant="solid" colorScheme="gray" padding="0.5rem">
                    <TagLabel>Rejected</TagLabel>
                </Tag>
            </HStack>

            {papers.length > 0 &&
                (
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {papers.map((paper) => (
                            <SwiperSlide>
                                <Link to={`/view/${paper.address}`}>
                                    <Box py={10} px={6}>
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
        </>
    );
}

