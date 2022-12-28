import { Typography } from '@mui/material';
import { Button } from 'components/button';
import { Paths } from 'config/site-paths';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppSelector } from 'redux-state/hook';
import formatter from 'utils/currencyFormatter';
import { SummaryWrapper } from './cart-item.styles';

const CartSummary = () => {
  const { totalPrice, productsCount, currency } = useAppSelector((state) => state.cart);
  const router = useRouter();

  return (
    <SummaryWrapper>
      <Typography padding="0 1.5rem" variant="h2">
        В корзине
      </Typography>
      <Typography padding="0 1.5rem" variant="subtitle2">
        Товаров: {productsCount}
      </Typography>
      {/* <Button sx={{padding: "0 2rem"}} color="error">
        Введите промокод
      </Button> */}
      <Typography padding="0 1.5rem" variant="subtitle1" fontWeight={600}>
        {formatter(totalPrice)} {currency}
      </Typography>
      <Button
        onClick={() => router.push(Paths.CHECKOUT)}
        variant="contained"
        fullWidth
      >
        Оформить заказ
      </Button>
    </SummaryWrapper>
  );
};
export default CartSummary;
