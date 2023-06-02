import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import {
    Box,
    Text,
    Heading,
    Stack,
    useColorModeValue,
    Flex,
    Badge
} from '@chakra-ui/react';


export default function PaperCard({ title, status, abstract, ipfsHash, heightPercentage, category }: { title: string, status: string, abstract: string, ipfsHash: string, heightPercentage?: number, category: string }) {
    return (


        <Box

            // h="45vh"
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}>
            <Flex
                h={200}
                bg={'gray.100'}
                mt={-6}
                mx={-6}
                mb={6}
                justifyContent="center">
                <Document file={ipfsHash} >
                    <Page height={200} pageNumber={1} />
                </Document>
            </Flex>
            <Stack height={160}>
                <Stack>
                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'l'}
                        fontFamily={'body'}>
                        {title}
                    </Heading>
                    <Text color={'gray.500'} noOfLines={[1, 2]}>
                        {abstract}
                    </Text>
                </Stack>
                <Stack mt={2} direction={'row'} spacing={4} align={'center'}>
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text mb="0.5rem" fontWeight={600}>{category}</Text>
                        {(status === "PUBLISHED") ? <Badge textAlign="center" colorScheme="green" w={120}>{status}</Badge> : ((status === "Rejected") ? <Badge textAlign="center" colorScheme="red" w={120}>{status}</Badge> : <Badge textAlign="center" colorScheme='yellow' w={120}>{status}</Badge>)}

                    </Stack>
                </Stack>
            </Stack>
        </Box>


    )
}