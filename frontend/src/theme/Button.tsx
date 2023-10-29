import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const badgeSelected = defineStyle((props) => {
    const { colorScheme: c } = props
    return {
        height: "30px",
        px: "2",
        fontSize: "sm",
        bg: `${c}.100`,
        border: "1px solid",
        borderColor: `${c}.300`,
        textTransform: "capitalize",
    }
})
const badge = defineStyle((props) => {
    const { colorScheme: c } = props
    return {
        height: "30px",
        px: "2",
        fontSize: "sm",
        color: `${c}.600`,
        bg: `${c}.50`,
        textTransform: "capitalize",
    }
})
const dropDown = defineStyle({
    bg: "gray.100"
})
const startQuestion = defineStyle({
    bg: "transparent",
    fontWeight: "bold",
    fontSize: "md",
    color: "gray.700",
    _hover: {
        transform: "scale(1.05, 1.05)",
        bg: "transparent",
        color: "gray.500",
    }
})
const link = defineStyle({
    bg: "transparent",
    fontWeight: "semibold",
    color: "blue",
    textDecoration: "underline",
    fontSize: "sm"
})


export const buttonTheme = defineStyleConfig({
    variants: { badge, badgeSelected, dropDown, startQuestion, link }
})