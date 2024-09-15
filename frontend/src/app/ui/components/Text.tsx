'use client';
import styled from 'styled-components';
import fonts from '@/app/ui/typography';

const H1 = styled.h1`
  font-family: ${fonts.RubikBlack};
  letter-spacing: -2%;
  font-size: 64px;
  line-height: 140%;
`;

const H2 = styled.h2`
  font-family: ${fonts.RubikBold};
  letter-spacing: -2%;
  font-size: 40px;
`;

const H3 = styled.h3`
  font-family: ${fonts.RubikBold};
  letter-spacing: -2%;
  font-size: 24px;
`;

const Subtitle = styled.h4`
  font-family: ${fonts.RubikMedium};
  font-size: 24px;
`;

const Body = styled.p`
  font-family: ${fonts.RubikMedium};
  font-size: 16px;
  line-height: 140%;
`;

const Small = styled.small`
  font-family: ${fonts.RubikMedium};
  font-size: 14px;
  line-height: 140%;
`;

const PreTitle = styled.span`
  font-family: ${fonts.RubikBold};
  font-size: 10px;
  letter-spacing: 3%;
`;

const ButtonText = styled.span`
    font-family: ${fonts.RubikBold};
    font-size: 10px;
    letter-spacing: 3%;
`;

const LinkText = styled.a`
    font-family: ${fonts.RubikBold};
    font-size: 16px;
    text-decoration: underline;
`;

const Footer = styled.footer`
    font-family: ${fonts.RubikMedium};
    font-size: 12px;
    line-height: 140%;
`;

const Text = {
  H1,
  H2,
  H3,
  Subtitle,
  Body,
  Small,
  PreTitle,
  ButtonText,
  LinkText,
  Footer
};

export default Text;