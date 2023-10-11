import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(tabsAnatomy.keys)

const baseStyle = definePartsStyle({
    tab: {
        fontWeight: "bold",
    }
});

const sizes = {
    md: definePartsStyle({
        tab: {
            fontSize: "md",
            py: "3",
            px: "5",
        },
        tabpanel: {
            py: "14",
            px: "6",
        }
    })
};

const colorfulVariant = definePartsStyle((props) => {
    const { colorScheme: c } = props
    return {
        tab: {
            bg: `transparent`,
            color: `gray.500`,
            borderTopRadius: '2xl',
            borderBottom: `${c}.200`,
            _selected: {
                bg: `${c}.50`,
            },
        },
        tablist: {
            borderBottom: '3px solid',
            borderColor: `${c}.200`,
        },
        tabpanel: {
            borderTop: "2px solid",
            borderColor: `${c}.200`,
        },
    };
});

export const tabTheme = defineMultiStyleConfig({
    baseStyle,
    sizes,
    variants: {
        colorful: colorfulVariant,
    },
    defaultProps: {
        size: "md",
        variant: "colorful",
        colorScheme: "blue",
    }
});