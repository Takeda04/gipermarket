import Image from 'next/image';
import React from 'react';
import {
  HorizontalCardImageWrapper,
  HorizontalCardWrapper,
  StyleInstalmentsNotColmn,
} from './card.styles';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Paths } from 'config/site-paths';
import { LazyImage } from 'components/image';
import colors from 'config/theme';
import { useAppSelector } from 'redux-state/hook';
import { StyleInstalments } from './card.styles';
import formatter from 'utils/currencyFormatter';

interface ProductCardProps {
  name: string;
  productInfo: boolean | null;
  image?: string | null;
  discount?: {
    currency: string;
    amount: number;
    amountInSum?: number | null;
  };
  instalmentsPrice: number;
  slug: string;
  id?: string;
  price?: {
    currency: string;
    amount: number;
    amountInSum?: number | null;
  };
  inDiscout?: boolean | null;
  modalOpen?: () => void;
}

const ProductCardHorizontal: React.FC<ProductCardProps> = ({
  slug,
  price,
  discount,
  image,
  name,
  modalOpen,
  productInfo,
  instalmentsPrice,
  inDiscout,
}) => {
  const { currency } = useAppSelector((state) => state.cart);
  const navigator = useRouter();
  
  return (
    <HorizontalCardWrapper
      onClick={() => {
        navigator.push(`${Paths.PRODUCT_DETAILS}${slug}`);
        modalOpen ? modalOpen() : '';
      }}
    >
      <HorizontalCardImageWrapper>
        <LazyImage src={image || ''} alt="product" />
      </HorizontalCardImageWrapper>
      <Stack justifyContent="space-between" minHeight="100px" flexGrow={1}>
        <Stack>
          <Typography
            sx={{
              textTransform: 'capitalize',
              cursor: 'pointer',
              maxWidth: '289px',
            }}
            component="a"
            variant="h3"
          >
            {name.toLowerCase().length > 50
              ? name.toLowerCase().slice(0, 50) + '...'
              : name.toLowerCase()}
          </Typography>
          {inDiscout ? (
            <StyleInstalments>
              {formatter(instalmentsPrice)} сум/ 12 мес
            </StyleInstalments>
          ) : (
            // <StyleInstalmentsNotColmn>
            //   {formatter(instalmentsPrice)} сум/ 12 мес
            // </StyleInstalmentsNotColmn>
            ""
          )}
        </Stack>
        <Stack spacing={2} direction="row">
          <Typography fontWeight={500} variant="h3">
            {discount?.amountInSum && price?.amountInSum
              ? formatter(price?.amountInSum - discount?.amountInSum)
              : formatter(price?.amountInSum || 0)}{' '}
            {currency}
          </Typography>
          {discount && (
            <>
              <Typography
                sx={{ textDecoration: 'line-through' }}
                variant="body2"
              >
                {formatter(price?.amountInSum)} {currency}
              </Typography>
              {discount.amountInSum && price?.amountInSum ? (
                <Stack
                  sx={{ position: 'absolute', top: '10px', left: '0' }}
                  bgcolor="red"
                  fontSize="15px"
                  p="6px"
                >
                  <Typography color="white">
                    -
                    {Math.floor(
                      (discount.amountInSum / price?.amountInSum) * 100
                    )}
                    %
                  </Typography>
                </Stack>
              ) : (
                ''
              )}
            </>
          )}
        </Stack>
        {!productInfo && (
          <Typography color={colors.primary.hover}>
            Временно Недоступно
          </Typography>
        )}
      </Stack>
    </HorizontalCardWrapper>
  );
};

export default ProductCardHorizontal;
