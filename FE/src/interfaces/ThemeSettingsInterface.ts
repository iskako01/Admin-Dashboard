import { BackgroundInterface } from "./BackgroundInterface";
import { GreyColorInterface } from "./Color/GreyColorInterface";
import { PrimaryColorInterface } from "./Color/PrimaryColorInterface";
import { SecondaryColorInterface } from "./Color/SecondaryColorInterface";

export interface ThemeSettingsInterface {
  palette: {
    mode?: string;
    grey: GreyColorInterface;
    primary: PrimaryColorInterface;
    secondary: SecondaryColorInterface;
	background:BackgroundInterface
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    h1: {
      fontFamily: string;
      fontSize: number;
    };
    h2: {
      fontFamily: string;
      fontSize: number;
    };
    h3: {
      fontFamily: string;
      fontSize: number;
    };
    h4: {
      fontFamily: string;
      fontSize: number;
    };
    h5: {
      fontFamily: string;
      fontSize: number;
    };
    h6: {
      fontFamily: string;
      fontSize: number;
    };
  };
}
