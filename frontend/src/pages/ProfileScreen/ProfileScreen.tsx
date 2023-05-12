
import { Box, Flex, Heading, HStack, Tag, TagLabel, Text } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import { ApiContext } from '../../contexts/api';
import { EtherContext } from '../../contexts/ether';

export default function ProfileScreen() {
    const ether = useContext(EtherContext).ether;
    const api = useContext(ApiContext).api

    const getPapers = async () => {
        await ether?.getPapers();
    };

    useEffect(() => {
       getPapers();
    }, []);
    return (
        <>
            <Flex my="2rem" justifyContent="space-around" alignItems="center">
                <img style={{ borderRadius: "50%", height: "25vh", width: "25vh" }} src="https://media-exp1.licdn.com/dms/image/C5603AQGtgn0mDao7LQ/profile-displayphoto-shrink_400_400/0/1649330215887?e=1655942400&v=beta&t=WJi-xD6TDcgs3Bxweischb2BRdmqmnoNVnds-UPdqHc" alt="profile" />
                <Box>
                    <Text><b>Name:</b> John Doe</Text>
                    <Text><b>Designation:</b> Assistant Professor at VIT, Vellore</Text>
                    <Text><b>Email:</b> johndoe@gmail.com</Text>
                </Box>
                <TableContainer>
                    <Table variant='striped'>
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
            <Heading as="h3" size="lg" mx="6vw">Papers Uploaded</Heading>
            <HStack spacing={6} mx="6vw" my="2rem">
                <Box as={FaFilter} size="32px" color="gray.800" />
                <Text>Filters</Text>
                <Tag
                    size="md"
                    variant="solid"
                    colorScheme="gray"
                    padding="0.5rem"
                >
                    <TagLabel>Under Review</TagLabel>
                </Tag>
                <Tag
                    size="md"
                    variant="solid"
                    colorScheme="gray"
                    padding="0.5rem"
                >
                    <TagLabel>Approved</TagLabel>
                </Tag>           <Tag
                    size="md"
                    variant="solid"
                    colorScheme="gray"
                    padding="0.5rem"
                >
                    <TagLabel>Rejected</TagLabel>
                </Tag>
            </HStack>
            <Flex justifyContent="space-around" mx="10vw">
                <div style={{width: "200px", height: "200px", backgroundColor: "#EDF2F6"}}/>
                <div style={{width: "200px", height: "200px", backgroundColor: "#EDF2F6"}}/>
                <div style={{width: "200px", height: "200px", backgroundColor: "#EDF2F6"}}/>
                <div style={{width: "200px", height: "200px", backgroundColor: "#EDF2F6"}}/>
            </Flex>

        </>
    );
}
