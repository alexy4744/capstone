import {
    Box,
    Flex,
    Text,
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
    Tooltip,
} from "@chakra-ui/react";
import { Link, redirect } from "react-router-dom";
import { useAuth } from "../providers";
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbPencilSearch, TbOvalVerticalFilled, TbOvalVertical } from "react-icons/tb";
import Logo from "../assets/navLogo.png";

const Navbar = () => {
    // const { isOpen, onOpen, onClose } = useDisclosure()

    const { logout } = useAuth();

    const handleLogout = () => {
        logout().then(() => redirect("/"));
    };

    return (
        <Box position="relative" zIndex="999" w="100vw" px="5" bg="#F5FBFF" overflowX="clip">
            {/* <Box position="absolute" w="130px" h="10px" bg="#F5FBFF" right="-2vw" bottom="-3vh" style = {{ rotate: "10deg" }} />
            <Box position="absolute" w="130px" h="10px" bg="#F5FBFF" right="-2vw" bottom="-3vh" style = {{ rotate: "20deg" }} />
            <Box position="absolute" w="130px" h="10px" bg="#F5FBFF" right="-2vw" bottom="-3vh" style = {{ rotate: "30deg" }} /> */}
            <Box position="absolute" right="-5vw" bottom="-7vh" style={{ rotate: "10deg" }} >
                <TbOvalVertical size="150" color="#F5FBFF"/>
            </Box>
            <Box position="absolute" right="2vw" bottom="-4vh" >
                <TbOvalVertical size="100" color="#F5FBFF"/>
            </Box>
            <Box position="absolute" left="2vw" bottom="-4vh" >
                <TbOvalVertical size="100" color="#F5FBFF"/>
            </Box>
            <Box position="absolute" left="-5vw" bottom="-7vh" style={{ rotate: "-10deg" }} >
                <TbOvalVertical size="150" color="#F5FBFF"/>
            </Box>
            <Flex position="relative" h="85px" alignItems="center" justifyContent="space-between" zIndex="9999" bg="#F5FBFF">
                {/* <IconButton
                    size={"md"}
                    as={isOpen ? MdClose : GiHamburgerMenu}
                    boxSize={10}
                    p="2"
                    aria-label={"Open Menu"}
                    display={{ md: "none" }}
                    onClick={isOpen ? onClose : onOpen}
                /> */}
                <HStack spacing={8} alignItems="center">
                    <Link to="/">
                        <img src={Logo} width="260px" />
                    </Link>
                    {/* <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
                        <Link to="/">Test</Link>
                        <Link to="/">Test</Link>
                        <Link to="/">Test</Link>
                    </HStack> */}
                </HStack>
                <Flex alignItems="center">
                    <Tooltip hasArrow label="Answer a random question" placement="bottom" style={{ zIndex: "9999" }}>
                        <Button
                            as={Link}
                            to="/questions/1"
                            variant={"outline"}
                            colorScheme={"easy"}
                            size={"sm"}
                            mr={8}
                            leftIcon={<TbPencilSearch />}>
                            Quick Start
                        </Button>
                    </Tooltip>
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
                            <MenuItem as={Link} to="/settings">Settings</MenuItem>
                            <MenuItem>Link 2</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            {/* {isOpen ? (
                <Box pb={4} display={{ md: "none" }}>
                    <Stack as={"nav"} spacing={4}>
                        <Link to="/">Test</Link>
                        <Link to="/">Test</Link>
                        <Link to="/">Test</Link>
                    </Stack>
                </Box>
            ) : null} */}
        </Box>
    );
};

export default Navbar;
