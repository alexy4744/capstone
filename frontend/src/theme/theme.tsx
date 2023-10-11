import { extendTheme } from "@chakra-ui/react";
import { easy, normal, hard } from "./colors";
import { tabTheme } from "./Tabs";
import { buttonTheme } from "./Button";

const stepperTheme = {
    baseStyle: {
        step: {
            justifyContent: "center",
        },
    },
}
const progressTheme = {
    baseStyle: {
        borderRadius: "xl",
    }
}
const badgeTheme = {
    baseStyle: {
        borderRadius: "md",
        fontSize: "md",
        paddingRight: "5px",
        paddingLeft: "5px",
    }
}

const theme = extendTheme({
    styles: {
        global: {
            "html, body": {
                color: "#565656",
                fontFamily: "Hind Siliguri, sans-serif"
            },
        }
    },
    colors: {
        easy: easy,
        normal: normal,
        hard: hard,
        green: {
            50: "#F3FCE9",
            100: "#DCF5C1",
            200: "#C6EF9A",
            300: "#B0E972",
            400: "#9AE34A",
            500: "#84DD22",
            600: "#69B01C",
            700: "#4F8415",
            800: "#35580E",
            900: "#1A2C07"
        },
        blue: {
            50: "#EBF3FA",
            100: "#C6DEF0",
            200: "#A2C8E7",
            300: "#7DB2DE",
            400: "#589DD5",
            500: "#3487CB",
            600: "#296CA3",
            700: "#1F517A",
            800: "#153651",
            900: "#0A1B29"
        },
        gray: {
            50: "#F2F2F2",
            100: "#DBDBDB",
            200: "#C4C4C4",
            300: "#ADADAD",
            400: "#969696",
            500: "#808080",
            600: "#666666",
            700: "#4D4D4D",
            800: "#333333",
            900: "#1A1A1A"
        }
    },
    components: {
        Stepper: stepperTheme,
        Progress: progressTheme,
        Badge: badgeTheme,
        Tabs: tabTheme,
        Button: buttonTheme,
    },
})

export default theme