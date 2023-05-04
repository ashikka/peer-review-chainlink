import { Box, Flex, Heading, HStack, Tag, Text } from '@chakra-ui/react';
import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'

export default function ProfileScreen() {
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
            <Heading as="h3" size="lg">Papers Uploaded</Heading>
            <HStack spacing={4}>

                <Tag size="lg" variant='solid' colorScheme='teal'>
                    Teal
                </Tag>
                <Tag size="lg" variant='solid' colorScheme='teal'>
                    Teal
                </Tag>   <Tag size="lg" variant='solid' colorScheme='teal'>
                    Teal
                </Tag>
            </HStack>

        </>
    );
}
