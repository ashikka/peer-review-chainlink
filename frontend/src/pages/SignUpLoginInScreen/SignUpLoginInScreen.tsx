import React, { useContext, useEffect, useState } from 'react';
import { Flex, Text, Button, Box } from '@chakra-ui/react';
import { ListItem, UnorderedList } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import logo from '../../assets/logo.png';
import { UserContext } from '../../contexts/user';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import entryGif from '../../assets/Research paper.gif'
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import { Footer } from '../../components/Footer/Footer';


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
            <Box zIndex={-1} width="35vw" height="35vw" position="absolute" right="-20%" top="-20%" borderRadius="50%" bgColor='#f0effd'></Box>
            <Flex justifyContent="space-evenly" flexDirection="row" alignItems="center" height="80vh">
                <Flex flexDirection="column">
                    <Flex flexDirection="row" alignItems="center">
                        <img src={logo} alt="logo" width={130} />
                        <Heading as='h1' size='3xl' marginLeft="2rem">Peer Review</Heading>
                    </Flex>
                    <Text color='gray.600' mt={6} width={300}>Lorem ipsum dolor sit amet. Eos provident mollitia qui molestias ipsa et quaerat autem. Lorem ipsum dolor sit amet. Eos provident mollitia qui molestias ipsa et quaerat autem.</Text>
                    <Button mt={6} bg='#6459F5' color="#ffffff" variant='solid' width={350} onClick={() => user.signInOrRegister()}>
                        Login with Metamask
                    </Button>
                </Flex>
                <Flex width="50vw">
                    <img src={entryGif} alt="entry" />
                </Flex>

                {/* <Flex bgColor="#F8F8FB" px={30} py="4rem" mt="4rem" border="2px solid" borderColor="gray.300">
                <Flex flexDirection="column" mx={10}>
                    <Button bg='#6459F5' color="#ffffff" variant='solid' width={350} onClick={() => user.signInOrRegister()}>
                        Login with Metamask
                    </Button>
                    <Text fontSize="sm" color='gray.500' mt="3rem"> First time here? </Text>
                    <Button color='#6459F5' borderColor="#6459F5" variant='outline' mt={1} onClick={() => user.signInOrRegister()}>
                        Sign up with Metamask
                    </Button>
                </Flex>
                <Flex flexDirection="column" justifyContent="center">
                    <UnorderedList spacing={6} fontSize="md" ml="2.5rem">
                        <ListItem>100% transparent paper reviews</ListItem>
                        <ListItem>Completely anonymous</ListItem>
                        <ListItem>Powered by Ethereum Smart Contracts</ListItem>
                    </UnorderedList>
                </Flex>
            </Flex> */}
            </Flex>
            <Flex justifyContent="center" flexDirection="column">
                <Heading textAlign="center">Features</Heading>
                <Flex justifyContent="space-around" mt="2rem" px={20}>
                    <FeatureCard title='ok' content='Aut ratione rerum ut aliquid sint et reprehenderit dolorem est suscipit voluptatem sit odit temporibus qui quisquam voluptates aut maxime quibusdam. Et maiores itaque eos quas quos et cupiditate aspernatur et minus totam sit minus exercitationem.' />
                    <FeatureCard title='ok' content='Aut ratione rerum ut aliquid sint et reprehenderit dolorem est suscipit voluptatem sit odit temporibus qui quisquam voluptates aut maxime quibusdam. Et maiores itaque eos quas quos et cupiditate aspernatur et minus totam sit minus exercitationem.' />
                    <FeatureCard title='ok' content='Aut ratione rerum ut aliquid sint et reprehenderit dolorem est suscipit voluptatem sit odit temporibus qui quisquam voluptates aut maxime quibusdam. Et maiores itaque eos quas quos et cupiditate aspernatur et minus totam sit minus exercitationem.' />
                </Flex>
            </Flex>
            <Flex justifyContent="center">
            <Box zIndex={-1} width="45vw" height="30vh"  mt="4rem" alignSelf="center" borderRadius="15px" bg='#A19CEE'></Box>
            </Flex>
            <Footer />
        </>
    );
}