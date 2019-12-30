import { deepOrange, deepPurple, green, pink, red } from '@material-ui/core/colors'

/**
 * This theme object provides the default theming for the whole site.
 * It is applied across the app in App.tsx
 */

export const QuakerMapsTheme = {
    palette: {
        primary: deepPurple,
        secondary: pink,
        error: red,
        warning: deepOrange,
        info: deepPurple,
        success: green,
    },
}
