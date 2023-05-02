import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { ListItem, UnorderedList } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import logo from '../../assets/logo.png';


export default function SignUpLoginInScreen() {
    return (
        <Flex justifyContent="center" flexDirection="column" alignItems="center">
            <Flex flexDirection="row" alignItems="center">
                <img src={logo} alt="logo" width={150} height={300} />
                <Heading as='h1' size='3xl' marginLeft="2rem">Peer Review</Heading>
            </Flex>
            <Flex bgColor="#F8F8FB" p={50} mt="2rem">
                <Flex flexDirection="column">
                    <Button bg='#6459F5' color="#ffffff" variant='solid'>
                        Login with Metamask
                    </Button>
                    <Text fontSize="sm" color='gray.500' mt="2rem"> First time here? </Text>
                    <Button color='#6459F5' borderColor="#6459F5" variant='outline' mt="1rem">
                        Sign up with Metamask
                    </Button>
                </Flex>
                <Flex flexDirection="column">
                    <UnorderedList spacing={3} fontSize="sm" mt="2rem" ml="2.5rem">
                        <ListItem>100% transparent paper reviews</ListItem>
                        <ListItem>Completely anonymous</ListItem>
                        <ListItem>Powered by Ethereum Smart Contracts</ListItem>
                    </UnorderedList>
                </Flex>
            </Flex>
        </Flex>
    );
}