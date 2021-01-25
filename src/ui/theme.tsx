import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";

import { Palette } from "@material-ui/core/styles/createPalette";
import { TypographyOptions } from "@material-ui/core/styles/createTypography";

interface ITypography extends TypographyOptions {
  tab: {
    fontFamily: string;
    textTransform: string;
    fontWeight: number;
    fontSize: string;
  };
  estimate: {
    fontFamily: string;
    fontSize: string;
    textTransform: string;
    color: "white";
  };
  learnButton: any;
}

interface IPalette extends Palette {
  common: {
    blue: string;
    orange: string;
    black: string;
    white: string;
  };
}
// interface ITheme extends Theme {
//   palette: IPalette;
// }
export interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
  typography: ITypography;
  overrides: any;
}

const arcBlue = "#0b72b9";
const arcOrange = "#ffba60";
const arcGrey = "#868686";

export default createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        color: arcBlue,
        fontSize: "1rem",
      },
    },
    MuiInput: {
      root: { color: arcGrey, fontWeight: 300 },
      underline: {
        "&:before": {
          borderBottom: `2px solid ${arcBlue}`,
        },
        "&:hover:not($disabled):not($focused):not(&error):before": {
          borderBottom: `2px solid ${arcBlue}`,
        },
      },
    },
  },

  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange,
    },
    primary: {
      main: arcBlue,
    },
    secondary: {
      main: arcOrange,
    },
  },
  typography: {
    caption: {
      fontSize: "1rem",
      fontWeight: 300,
      color: arcGrey,
    },
    h6: {
      fontWeight: 500,
      fontFamily: "Raleway",
      color: arcBlue,
      lineHeight: 1,
    },

    h3: {
      // fontWeight: 300,
      fontFamily: "Pacifico",
      fontSize: "2.5rem",
      color: arcBlue,
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "1.5rem",
      color: arcBlue,
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2.5rem",
      color: arcBlue,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontFamily: "Raleway",
      fontSize: "1.25rem",
      color: arcGrey,
    },
    subtitle2: {
      fontWeight: 300,
      fontSize: "1.25rem",
      color: "white",
    },
    body1: {
      fontSize: "1.25rem",
      color: arcGrey,
      fontWeight: 300,
    },
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white",
    },
    learnButton: {
      borderColor: arcBlue,
      color: arcBlue,
      borderWidth: 2,
      textTransform: "none",
      borderRadius: 50,
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
  },
} as IThemeOptions);
