import { PrimaryColorInterface } from "./PrimaryColorInterface";
import { GreyColorInterface } from "./GreyColorInterface";
import { SecondaryColorInterface } from "./SecondaryColorInterface";

export interface ColorTokenInterface {
  grey: GreyColorInterface;
  primary: PrimaryColorInterface;
  secondary: SecondaryColorInterface;
}
