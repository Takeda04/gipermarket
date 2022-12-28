import React from 'react';
import { Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import { LazyImage } from 'components/image';
import formatter from 'utils/currencyFormatter';
import { InstalmentsProduct } from 'redux-state/features/paymart-cart';
import { useAppSelector } from 'redux-state/hook';

const StyleImg = styled.div`
  width: 78px;
  height: 78px;
  img{
    object-fit: contain;
  }
`

export const InstalmentsCard: React.FC<InstalmentsProduct> = ({ amount, id, name, price, img, priceInstalment }) => {
  const { limit } = useAppSelector((state) => state.paymartCart);
  const { currency } = useAppSelector((state) => state.cart)
  return (
    <Stack direction={{ lg: 'row', md: 'row', xs: 'column' }} gap={{ md: '0', xs: '40px' }} alignItems='center' p='20px 0' borderBottom='1px solid #e0e0e0'>
      <Stack width={{ lg: '50%', sm: '80%', xs: '100%' }} direction='row' gap='50px' alignItems='center'>
        <StyleImg>
          <LazyImage src={img ? img : ""} alt="img" />
        </StyleImg>
        <Typography variant='subtitle2' fontWeight={600}>{name}</Typography>
      </Stack>
      <Stack width={{ lg: '50%', md: '30%', xs: '100%' }} justifyContent={{ lg: 'space-between' }} direction='row' gap='50px' alignItems='center'>
        <Typography variant='subtitle2' fontWeight={600}>x{amount}</Typography>
        <Typography variant='subtitle2' fontWeight={600}>{formatter(priceInstalment)} {currency} x {limit}мес</Typography>
      </Stack>
    </Stack>
  )
}
