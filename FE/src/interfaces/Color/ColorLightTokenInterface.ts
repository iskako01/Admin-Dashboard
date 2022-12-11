import { PrimaryColorInterface } from "./PrimaryColorInterface";
import { GreyColorInterface } from "./GreyColorInterface";
import { SecondaryColorInterface } from "./SecondaryColorInterface";
import { BackgroundInterface } from "../BackgroundInterface";

export interface ColorLightTokenInterface {
  grey: GreyColorInterface;
  primary: PrimaryColorInterface;
  secondary: SecondaryColorInterface;
  neutral?: GreyColorInterface;
  background?: BackgroundInterface;
}
