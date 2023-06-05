import { useContext } from 'react';
import { Link } from "react-router-dom";

import { Text, Menu, Flex, Button, MenuButton, Avatar, MenuList, MenuItem, Heading, Container } from '@chakra-ui/react';
import logo from '../../assets/logo.png';
import { UserContext } from '../../contexts/user';


function NavLink({ text, href }: { text: string, href: string }) {
    return (
        <Link to={href}>
            <Text color="#6459F5" fontWeight="semibold">{text}</Text>
        </Link>
    )
}

export default function Navbar() {
    const user = useContext(UserContext);

    return (
        <Container maxW='7xl' zIndex={100}>
            <Flex bgColor="transparent" flexDirection="row" justifyContent="space-between" py={5} pr={6}>
                <Flex alignItems="center">
                    <img src={logo} alt="logo" width={40} />
                    <Heading fontSize="2xl" fontWeight="bold" ml={2}><Link to="/">Peer Review</Link></Heading>
                </Flex>
                <Flex>
                    {!user.username && <Button onClick={() => { user.signInOrRegister() }} bg='#6459F5' color="#ffffff" variant='solid'>
                        Login with Metamask
                    </Button>}

                    {user.username &&
                        <Flex alignItems="center" gridGap={6}>
                            <NavLink text="Home" href="/" />
                            <NavLink text="Upload" href="/paper" />
                            <NavLink text="Browse" href="/browse" />

                            <Menu>
                                <MenuButton>
                                    <Avatar size="sm"></Avatar>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>
                                        Signed in as &nbsp;<Text fontWeight="bold">{user.username}</Text>
                                    </MenuItem>
                                    <MenuItem as={Link} to="/profile">
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={() => user.signOut()}>Sign Out</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>}
                </Flex>
            </Flex>
        </Container>
    )
}
