import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      100: '#6459F5',
      200: 'gray.500'
    }
  },
  fonts: {
    heading: 'Open Sans, sans-serif',
    body: 'Raleway, sans-serif',
  },
})

export default theme
