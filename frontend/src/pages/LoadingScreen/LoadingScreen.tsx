import React from 'react';
import './LoadingScreen.css';
import { Flex } from '@chakra-ui/react';

export default function LoadingScreen() {

    return (
        <>
            <Flex className='loading' justifyContent="center" alignItems="center">


                <div className="boxes">
                    <div className="box">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="box">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="box">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="box">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </Flex>

        </>);
}
