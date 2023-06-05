import { useState } from 'react';
import { Flex, Heading, Badge, Box } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';


export default function PaperView({ heading, file, heightPercentage, width, setPages }: { heading?: String, file: any, heightPercentage?: number, width?: number | string, setPages?: (pages: number) => any }) {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    const documentLoadSuccess = async (pdf: any) => {
        setNumPages(pdf.numPages);

        if (setPages) {
            setPages(pdf.numPages);
        }
        setPageNumber(1);
    };
    return (
        <>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" w={width || "60vw"}>
                {heading && <Heading as='h2' mb="2rem">{heading}</Heading>}
                <Badge fontSize="1rem">{pageNumber}/{numPages}</Badge>
                <Flex direction="row" alignItems="center" mt={2}>
                    <ChevronLeftIcon cursor="pointer" w={12} h={12} mr={4} onClick={() => {
                        if (pageNumber > 1) {
                            setPageNumber(pageNumber - 1);
                        }
                    }} />
                    <Box border="2px solid black">
                        <Document file={file} onLoadSuccess={documentLoadSuccess} >
                            <Page height={window.innerHeight * (heightPercentage || 0.7)} pageNumber={pageNumber} />
                        </Document>
                    </Box>
                    <ChevronRightIcon cursor="pointer" w={12} h={12} ml={4} onClick={() => {
                        if (pageNumber < numPages) {
                            setPageNumber(pageNumber + 1);
                        }
                    }} />
                </Flex>
            </Flex>
        </>
    )



}