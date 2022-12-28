import { Badge, Stack, Typography } from '@mui/material';
import Cart from 'components/icons/cart';
import Heart from 'components/icons/heart';
import Profile from 'components/icons/profile';
import { Airplane } from 'components/icons/airplane';
import { Paths } from 'config/site-paths';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { setSpecialOrder } from 'redux-state/features/rediraction';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';
import colors from 'config/theme';

const ButtonStyle = styled(Stack)`
  animation-name: butonOpacity;
  animation-duration: 1s;
  z-index: 1;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  transition: all 0.3s ease-in-out;
  border-radius: 0;
  border: 1px solid #FEEE00;

  @keyframes butonOpacity {
    0%{
      background-color: #FEEE00;
    }
    50%{
      background-color: #feed004e;
    }
    100%{
      background-color: #FEEE00;
    }
  }
  &:hover{
    animation: none;
  }
`

interface HeadeButtonsProps {
  onProfileIconClick: () => void;
  isAuthenticated?: boolean;
}


const HeaderButtons: React.FC<HeadeButtonsProps> = ({
  onProfileIconClick,
  isAuthenticated,
}) => {
  const { productsCount } = useAppSelector((state) => state.cart);
  const { productsCount: likedProductsCount } = useAppSelector(state => state.like);
  const router = useRouter()
  const dispatch = useAppDispatch();

  const specialOrder = () => {
    if (!isAuthenticated) {
      onProfileIconClick()
      dispatch(setSpecialOrder({
        userSpecialOrder:true,
        userPhone: '',
        userCode:''
      }));
    }

    router.push(Paths.SPECIAL_ORDER);

  }

  return (
    <Stack sx={{ flexGrow: 1, width: '100%', justifyContent: 'end' }} direction="row" spacing={4}>
      <ButtonStyle onClick={specialOrder} sx={{ cursor: 'pointer', p: '0 5px', bgcolor: colors.primary.default }} direction='column' alignItems='center'>
        < Airplane />
        <Typography variant="subtitle2">Заказы из США</Typography>
      </ButtonStyle>

      <Stack
        onClick={onProfileIconClick}
        sx={{ cursor: 'pointer' }}
        alignItems="center"
      >
        <Profile />
        <Typography variant="subtitle2">
          {isAuthenticated ? 'Профиль' : 'Войти'}{' '}
        </Typography>
      </Stack>
      <Link href={Paths.LIKES}>
        <Stack sx={{ cursor: 'pointer' }} alignItems="center">
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
          <Typography variant="subtitle2">Избранное</Typography>
        </Stack>
      </Link >
      <Link href={Paths.CART}>
        <Stack sx={{ cursor: 'pointer' }} alignItems="center">
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
          <Typography variant="subtitle2">Корзина</Typography>
        </Stack>
      </Link>
    </Stack >
  );
};

export default HeaderButtons;
