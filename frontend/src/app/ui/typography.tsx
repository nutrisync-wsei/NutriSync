import { Rubik } from 'next/font/google';

const RubikBlack = Rubik({ weight: "900", subsets: ["latin"] });
const RubikBold = Rubik({ weight: "700", subsets: ["latin"] });
const RubikMedium = Rubik({ weight: "500", subsets: ["latin"] });

const fonts = {
    RubikBlack,
    RubikBold,
    RubikMedium,
}

export default fonts;