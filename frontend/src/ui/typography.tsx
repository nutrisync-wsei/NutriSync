import { Rubik } from "next/font/google";

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

const fonts = {
  RubikBlack,
  RubikBold,
  RubikMedium,
};

export default fonts;
