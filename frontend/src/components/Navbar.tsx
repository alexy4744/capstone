import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Tooltip,
} from "@chakra-ui/react";
import { Link, redirect } from "react-router-dom";
import { useAuth } from "../providers";
import { TbPencilSearch, TbOvalVertical } from "react-icons/tb";
import Logo from "../assets/navLogo.png";

const Navbar = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure()

  const { logout } = useAuth();

  const handleLogout = () => {
    logout().then(() => redirect("/"));
  };

  return (
    <Box position="relative" zIndex="999" px="5" bg="#F5FBFF" overflowX="clip">
      <Flex
        position="relative"
        h="85px"
        alignItems="center"
        justifyContent="space-between"
        zIndex="9999"
        bg="#F5FBFF"
      >
        <HStack spacing={8} alignItems="center">
          <Link to="/">
            <img src={Logo} width="260px" />
          </Link>
        </HStack>
        <Flex alignItems="center">
          <Tooltip
            hasArrow
            label="Answer a random question"
            placement="bottom"
            style={{ zIndex: "9999" }}
          >
            <Button
              as={Link}
              to="/questions/1"
              variant={"outline"}
              colorScheme={"easy"}
              size={"sm"}
              mr={"8%"}
              leftIcon={<TbPencilSearch />}
            >
              Quick Start
            </Button>
          </Tooltip>
          <Menu>
            <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
              <Avatar size={"md"} src={"https://bit.ly/dan-abramov"} />
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="/settings">
                Settings
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Flex w="100%" h="1px" justifyContent="space-between">
        <Flex position="relative" w="200px">
          <Box position="absolute" left="40px" bottom="-40px">
            <TbOvalVertical size="100" color="#F5FBFF" />
          </Box>
          <Box position="absolute" left="-50px" bottom="-60px" style={{ rotate: "-10deg" }}>
            <TbOvalVertical size="150" color="#F5FBFF" />
          </Box>
        </Flex>
        <Flex position="relative" w="200px">
          <Box position="absolute" right="-50px" bottom="-60px" style={{ rotate: "10deg" }}>
            <TbOvalVertical size="150" color="#F5FBFF" />
          </Box>
          <Box position="absolute" right="40px" bottom="-40px">
            <TbOvalVertical size="100" color="#F5FBFF" />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
