import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/icon.png";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
    return (
        <HStack justifyContent="space-between" padding="12px">
            <Image src={logo} boxSize="60px" />
            <ColorModeSwitch />
        </HStack>
    );
};

export default NavBar;
