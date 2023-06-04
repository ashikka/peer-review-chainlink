import {
    Box,
    Text,
    Heading,
    Stack,
    useColorModeValue,
    Flex,
} from '@chakra-ui/react';


export default function FeatureCard({ title, content }: { title: string, content: string}) {
    return (


        <Box

            // h="45vh"
            w="300px"
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}>
            <Flex
                h={100}
                bg={'gray.100'}
                mt={-6}
                mx={-6}
                mb={6}
                justifyContent="center">
       
            </Flex>
            <Stack height={100}>
                <Stack>
                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'l'}
                        fontFamily={'body'}>
                        {title}
                    </Heading>
                    <Text color={'gray.500'} noOfLines={[1, 2]}>
                        {content}
                    </Text>
                </Stack>
            </Stack>
        </Box>


    )
}