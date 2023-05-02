import React from 'react';
import { Flex, Spacer, Center, Text } from '@chakra-ui/react'
import Navbar from '../../components/Navbar/index';


export default function SignUpLoginInScreen() {
    return (
        <Flex>
            <Navbar/>
            <Center w='100px' bg='green.500'>
    <Text>Box 1</Text>
  </Center>
        </Flex>
    );
}