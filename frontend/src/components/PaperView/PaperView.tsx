import { useState } from 'react';
import { Flex, Heading, Badge } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';


export default function PaperView(props: { heading: String, file: any }) {

    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);


    const documentLoadSuccess = async (pdf: any) => {
        setNumPages(pdf.numPages);
        setPageNumber(1);
    };
    return (
        <>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" w="60vw">
                <Heading as='h2' my="2rem">{props.heading}</Heading>
                <Badge fontSize="1rem">{pageNumber}/{numPages}</Badge>
                <Flex direction="row" alignItems="center">
                    <ChevronLeftIcon cursor="pointer" w={12} h={12} mr={12} onClick={() => {
                        if (pageNumber > 1) {
                            setPageNumber(pageNumber - 1);
                        }
                    }} />
                    <Document file={props.file} onLoadSuccess={documentLoadSuccess} >
                        <Page height={window.innerHeight * 0.7} pageNumber={pageNumber} />
                    </Document>
                    <ChevronRightIcon cursor="pointer" w={12} h={12} ml={12} onClick={() => {
                        if (pageNumber < numPages) {
                            setPageNumber(pageNumber + 1);
                        }
                    }} />
                </Flex>
            </Flex>
        </>
    )



}