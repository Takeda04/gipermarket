import { Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useAppSelector } from 'redux-state/hook';
import formatter from 'utils/currencyFormatter';
import { CheckoutCartItem, CheckoutCartItemImage } from './checkout.styles';

const CheckoutInfo = () => {
  const { cartProducts, totalPrice, currency } = useAppSelector(
    (state) => state.cart
  );
  return (
    <Stack spacing={2} mb={2}>
      {cartProducts.map((product) => (
        <CheckoutCartItem key={product.id}>
          <Stack mt={2} direction="row" spacing={2} alignItems="center">
            <CheckoutCartItemImage>
              <Image
                layout="fixed"
                width={80}
                height={50}
                src={product.image}
                alt={product.name}
              />
            </CheckoutCartItemImage>
            <Typography
              variant="subtitle2"
              sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                  fontSize: 12,
                },
              })}
            >
              {product.name}
            </Typography>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={1}>
            <Typography variant="subtitle2">{product.count}</Typography>
            <Typography variant="subtitle2">x</Typography>
            <Typography
              sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                  fontSize: 14,
                },
              })}
              fontSize="1.25rem"
              fontWeight={600}
            >
              {formatter(product.price?.amountInSum || 0)}
            </Typography>
            <Typography
              sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                  fontSize: 14,
                },
              })}
              fontSize="1.25rem"
              fontWeight={600}
            >
              {currency}
            </Typography>
          </Stack>
        </CheckoutCartItem>
      ))}
      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle2">Сумма по товарам</Typography>
        <Typography fontSize="1.25rem" fontWeight={600}>
          {formatter(totalPrice)} {currency}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2">Стоимость доставки </Typography>
        <Typography fontSize="1.25rem" fontWeight={600}>
          0
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Typography fontSize="1.25rem">Итого: </Typography>
        <Typography fontSize="1.25rem" fontWeight={600}>
          {formatter(totalPrice)} {currency}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CheckoutInfo;
