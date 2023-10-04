import { extendTheme } from "@chakra-ui/react";

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
        "green": {
            "50": "#F3FCE9",
            "100": "#DCF5C1",
            "200": "#C6EF9A",
            "300": "#B0E972",
            "400": "#9AE34A",
            "500": "#84DD22",
            "600": "#69B01C",
            "700": "#4F8415",
            "800": "#35580E",
            "900": "#1A2C07"
        },
        "blue": {
            "50": "#EBF3FA",
            "100": "#C6DEF0",
            "200": "#A2C8E7",
            "300": "#7DB2DE",
            "400": "#589DD5",
            "500": "#3487CB",
            "600": "#296CA3",
            "700": "#1F517A",
            "800": "#153651",
            "900": "#0A1B29"
          }
    },
    components: {
        Stepper: stepperTheme,
        Progress: progressTheme,
    },
})

export default theme