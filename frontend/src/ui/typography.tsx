import { Rubik } from "next/font/google";
import localFont from "next/font/local";

const Monaco = localFont({ src: "../assets/fonts/Monaco.ttf" });

const RubikBlack = Rubik({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
});
const RubikBold = Rubik({ weight: "700", subsets: ["latin"], display: "swap" });
const RubikMedium = Rubik({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});

const RubikLight = Rubik({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const fonts = {
  RubikBlack,
  RubikBold,
  RubikMedium,
  RubikLight,
  Monaco,
};

export default fonts;
