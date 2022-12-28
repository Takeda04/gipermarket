import {
  Badge,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Cart from 'components/icons/cart';
import Heart from 'components/icons/heart';
import Profile from 'components/icons/profile';
import { Paths } from 'config/site-paths';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch,useAppSelector } from 'redux-state/hook';
import React from 'react';
import { useRouter } from 'next/router';
import LogoImage from 'assets/logo.svg';
import styled from 'styled-components';
import colors from 'config/theme';
import { toggle } from 'redux-state/features/sidebar';
import { Airplane } from 'components/icons/airplane';

const LogoLink = styled.a`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  span {
    display: block;
    max-width: 140px;
    max-height: 51px;
  }
`;
interface HeadeButtonsProps {
  onProfileIconClick: () => void;
  isAuthenticated?: boolean;
}
const RowStack = styled(Stack)`
  display: flex;
  align-items: center;
  height: 70px;
  position: relative;
  padding: 0 10px;
  justify-content: space-between;
  .rowsatck__item {
    width: 51px;
    display: block;
  }

  .special-order {
    animation-name: butonOpacity;
    animation-duration: 1s;
    z-index: 1;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    transition: all 0.3s ease-in-out;
    height: 50px;
    width: 50px;
    border-radius: 0;
    border: 1px solid #feee00;

    @keyframes butonOpacity {
      0% {
        background-color: #feee00;
      }
      50% {
        background-color: #feed004e;
      }
      100% {
        background-color: #feee00;
      }
    }
    &:hover {
      animation: none;
    }
  }
`;

const MobileHeaderButtons: React.FC<HeadeButtonsProps> = ({
  onProfileIconClick,
  isAuthenticated,
}) => {
  const { isOpen: showLoginMenu } = useAppSelector((state) => state.sidebar);
  const { productsCount } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { productsCount: likedProductsCount } = useAppSelector(
    (state) => state.like
  );
  const router = useRouter();
  const specialOrder = () => {
    if (!isAuthenticated) {
      dispatch(toggle(!showLoginMenu));
    }
    router.push(Paths.SPECIAL_ORDER);
  };

  return (
    <RowStack direction="row">
      <Stack p="10px" direction="row">

        <IconButton onClick={onProfileIconClick}>
          <Profile />
        </IconButton>
        <IconButton className="special-order" onClick={specialOrder}>
          <Airplane />
        </IconButton>
      </Stack>

      <Stack direction="row" justifyContent="center">
        <Link href="/">
          <LogoLink>
            <Image layout="fixed" src={LogoImage} alt="logo" />
          </LogoLink>
        </Link>
      </Stack>
      <Stack direction="row" alignItems="center">
      
          <Link href={Paths.LIKES}>
            <Stack p="10px">
              <Badge
                color="secondary"
                overlap="circular"
                badgeContent={likedProductsCount}
                // @ts-expect-error
                invisible={likedProductsCount && likedProductsCount < 1}
                max={99}
              >
                <Heart />
              </Badge>
            </Stack>
            {/* <ListItemText>Избранное</ListItemText> */}
          </Link>
        
        <Link href={Paths.CART}>
          <Stack p="10px">
            <Badge
              color="secondary"
              overlap="circular"
              badgeContent={productsCount}
              // @ts-expect-error
              invisible={productsCount && productsCount < 1}
              max={99}
            >
              <Cart />
            </Badge>
          </Stack>
        </Link>
      </Stack>

      {/* <Divider /> */}
      {/* {isMobile && (
        <List>
          {headerTopLinks.map((top, i) => (
            <ListItem button key={top.label}>
              {i === headerTopLinks.length - 1 && (
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
              )}
              <Link href={top.link}>
                <ListItemText>{top.label}</ListItemText>
              </Link>
            </ListItem>
          ))}
        </List>
      )} */}
    </RowStack>
  );
};

export default MobileHeaderButtons;
