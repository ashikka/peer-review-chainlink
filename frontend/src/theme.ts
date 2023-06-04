import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      100: '#6459F5',
      200: 'gray.500'
    }
  },
  fonts: {
    heading: 'Cabin, sans-serif',
    body: 'Lato, sans-serif',
  },
})

export default theme
