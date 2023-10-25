import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    Stack,
} from "@chakra-ui/react";
import { Link, redirect } from "react-router-dom";
import { useAuth, useCurrentUser } from "../providers";
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbPencilSearch } from "react-icons/tb";

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        if (!currentUser) {
            redirect("/");
        } else {
            logout()
                .then(() => redirect("/"))
                .catch((error) => {
                    console.log("logout error: ", error)
                })
        }
    }

    return (
        <Box position="relative" w="100vw" px="5" bg="white" zIndex="9999">
            <Flex h="70px" alignItems={"center"} justifyContent={"space-between"}>
                <IconButton
                    size={"md"}
                    as={isOpen ? MdClose : GiHamburgerMenu}
                    boxSize={10}
                    p="2"
                    aria-label={"Open Menu"}
                    display={{ md: "none" }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={"center"}>
                    <Link to="/">Logo</Link>
                    <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
                        <Box key="link">Test</Box>
                        <Box key="link">Test</Box>
                        <Box key="link">Test</Box>
                    </HStack>
                </HStack>
                <Flex alignItems={"center"}>
                    <Button
                        as={Link}
                        to="/questions/1"
                        variant={"solid"}
                        colorScheme={"teal"}
                        size={"sm"}
                        mr={4}
                        leftIcon={<TbPencilSearch />}>
                        Recommend Me a Question
                    </Button>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={"full"}
                            variant={"link"}
                            cursor={"pointer"}
                            minW={0}>
                            <Avatar
                                size={"md"}
                                src={"https://bit.ly/dan-abramov"}
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Link 1</MenuItem>
                            <MenuItem>Link 2</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: "none" }}>
                    <Stack as={"nav"} spacing={4}>
                        <Box key="link">Test</Box>
                        <Box key="link">Test</Box>
                        <Box key="link">Test</Box>
                    </Stack>
                </Box>
            ) : null}
        </Box>

    )
}

export default Navbar;