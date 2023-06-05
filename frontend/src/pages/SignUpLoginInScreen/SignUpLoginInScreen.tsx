import { useContext, useEffect, useState } from 'react';
import { Flex, Text, Button, Box, Container } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react'
import { UserContext } from '../../contexts/user';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import entryGif from '../../assets/Research paper.gif'
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import { Footer } from '../../components/Footer/Footer';
import transparent from '../../assets/transparency.png';
import anonymous from '../../assets/anonymous.png';
import ethereum from '../../assets/ethereum.png';
import { FcDisclaimer } from 'react-icons/fc'



export default function SignUpLoginInScreen() {
    const user = useContext(UserContext);
    const [loading, setLoading] = useState(true);


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

    return (
        <>
            <Box zIndex={-1} width="35vw" height="35vw" position="absolute" right="10%" top="-20%" borderRadius="50%" bgColor='#f0effd'></Box>
            <Box zIndex={-1} width="35vw" height="35vw" position="absolute" right="-10%" borderRadius="50%" bgColor='#f0effd'></Box>
            <Box zIndex={-1} width="40vw" height="40vw" position="absolute" right="-20%" top="-20%" borderRadius="50%" bgColor='#f0effd'></Box>
            <Container maxW='7xl'>
                <Flex justifyContent="space-between" alignItems="center" flexDirection="row" height="90vh">
                    <Flex flexDirection="column" >
                        <Flex flexDirection="row" alignItems="center">
                            <Heading as='h1' size='4xl'>Peer Review</Heading>
                        </Flex>
                        <Box fontSize="lg" my={6}>
                            <Text color='gray.600' width={300}>A new way for <Text color="#6459F5" d="inline" fontWeight="extrabold">academic publishing</Text>.</Text>
                            <Text color='gray.600' width={300}> Say goodbye 👋 to illegitmate and plagiarized research papers.</Text>
                        </Box>
                        <Button mt={6} bg='#6459F5' color="#ffffff" variant='solid' width={350} onClick={() => user.signInOrRegister()}>
                            Login with Metamask
                        </Button>
                    </Flex>
                    <Flex>
                        <img width="650px" src={entryGif} alt="entry" />
                    </Flex>
                </Flex>
                <Flex justifyContent="center" flexDirection="column">
                    <Heading textAlign="center">Features</Heading>
                    <Flex justifyContent="space-around" mt="4rem" px={20}>
                        <FeatureCard image={transparent} title="Transparent" content='We offer a transparent peer review process. Your work is visible to all and reviewed by trusted academics' />
                        <FeatureCard image={anonymous} title='Anonymous' content='The reviews are conducted anonymously. The information of the reviewers is private and safe with us.' />
                        <FeatureCard image={ethereum} title='Smart Contracts' content='We use smart contracts and the Ethereum blockchain to decentralize and automate our system.' />
                    </Flex>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                    <Flex zIndex={-1} width="45vw" flexDirection="column" mt="6rem" p={8} borderRadius="15px" bg="#F6F6FA">
                        <Flex alignItems="center">
                            <Heading textAlign="center">Disclaimer</Heading>
                            <Box ml={2} as={FcDisclaimer} size="3rem" />
                        </Flex>
                        <Text  mt={4}>The data you provide us with does not persist on any server-side databases but is completely stored on the blockchain. We respect your privacy and strive to achieve the most secure system. Your data is safe.</Text>
                    </Flex>
                </Flex>
            </Container>
            <Footer />
        </>
    );
}