import { Typography } from '@mui/material';
import colors from 'config/theme';
import Link from 'next/link';
import styled from 'styled-components';

export const FooterTopWrapper = styled.div`
  width: 100%;
  background-color: ${colors.grey.light};
  padding: 40px 0;
`;

export const FooterBottomWrapper = styled.div`
  width: 100%;
  background-color: ${colors.grey.lighter};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
`;

export const Logo = styled.div`
  max-width: 139px;
  max-height: 88px;
  cursor: pointer;
  span{
    max-width: 200px;
    max-height: 50px;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const SocialMediaIcon = styled.div`
  width: 32px;
  height: 32px;
`;

export const FooterLink = styled(Typography)`
  font-size: 14px;
  color: ${colors.black};
  max-width: 700px;
  @media (max-width:559px){
    text-align: center;
  }
`;

export const CartWrapper = styled.div`
  width: 60px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 252px;
  height: 43px;
  @media (max-width:559px){
    flex-direction: column;
  }
  img {
    object-fit: contain;
    width:100%;
    height: 100%;
  }
`