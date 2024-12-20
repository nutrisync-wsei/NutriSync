'use client';
import styled, { css } from 'styled-components';

import fonts from '@/ui/typography';

const RubikBlack = css`
  font-family: ${fonts.RubikBlack.style.fontFamily};
  font-weight: ${fonts.RubikBlack.style.fontWeight};
`;

const RubikBold = css`
  font-family: ${fonts.RubikBold.style.fontFamily};
  font-weight: ${fonts.RubikBold.style.fontWeight};
`;

const RubikMedium = css`
  font-family: ${fonts.RubikMedium.style.fontFamily};
  font-weight: ${fonts.RubikMedium.style.fontWeight};
`;

const RubikLight = css`
  font-family: ${fonts.RubikLight.style.fontFamily};
  font-weight: ${fonts.RubikLight.style.fontWeight};
`;

const H1 = styled.h1`
  ${RubikBlack}
  letter-spacing: -2%;
  font-size: 64px;
  line-height: 140%;
`;

const H2 = styled.h2`
  ${RubikBold}
  letter-spacing: -2%;
  font-size: 40px;
`;

const H3 = styled.h3`
  ${RubikBold}
  letter-spacing: -2%;
  font-size: 24px;
`;

const H4 = styled.h3`
  ${RubikBold}
  letter-spacing: -2%;
  font-size: 20px;
`;

const Subtitle = styled.h4`
  ${RubikMedium}
  font-size: 24px;
`;

const Body = styled.p`
  ${RubikLight}
  font-size: 16px;
  line-height: 140%;
`;

const BodyBold = styled.p`
  ${RubikBold}
  font-size: 16px;
  line-height: 140%;
`;

const Small = styled.small`
  ${RubikMedium}
  font-size: 14px;
  line-height: 140%;
`;

const SmallMonaco = styled.small`
  font-family: ${fonts.Monaco.style.fontFamily};
  font-size: 14px;
  line-height: 140%;
  font-weight: 400;
`;

const SmallestLight = styled.small`
  ${RubikLight}
  font-size: 12px;
  line-height: 140%;
`;

const TinyLight = styled.small`
  ${RubikLight}
  font-size: 8px;
  line-height: 140%;
`;

const PreTitle = styled.span`
  ${RubikBold}
  font-size: 10px;
  letter-spacing: 3%;
`;

const ButtonText = styled.span`
  ${RubikBold}
  font-size: 10px;
  letter-spacing: 3%;
`;

const LinkText = styled.a`
  ${RubikBold}
  font-size: 16px;
  text-decoration: underline;
`;

const Footer = styled.footer`
  ${RubikMedium}
  font-size: 12px;
  line-height: 140%;
`;

const MenuLink = styled.a`
  ${RubikMedium}
  font-size: 11px;
  line-height: 11px;
`;

const MenuLinkActive = styled.a`
  ${RubikBold}
  font-size: 11px;
  line-height: 11px;
`;

const Text = {
  H1,
  H2,
  H3,
  H4,
  Subtitle,
  Body,
  BodyBold,
  Small,
  SmallestLight,
  TinyLight,
  SmallMonaco,
  PreTitle,
  ButtonText,
  LinkText,
  Footer,
  MenuLink,
  MenuLinkActive,
};

export default Text;
