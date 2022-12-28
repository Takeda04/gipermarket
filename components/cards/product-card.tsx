import { Stack, Typography } from '@mui/material';
import Heart from 'components/icons/heart';
import Image from 'next/image';
import React from 'react';
import {
  ProductCardImageWrapper,
  ProductCardLabel,
  ProductCardWrapper,
  ProductHeartWrapper,
  StyleInstalmentsNot,
} from './card.styles';
import Cart from 'components/icons/cart';
import { useRouter } from 'next/router';
import { addToCart } from 'redux-state/features/cart-slice';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';
import { addInstalments } from 'redux-state/features/paymart-cart';
import { Button } from 'components/button';
import Eye from 'components/icons/eye';
import { LazyImage } from 'components/image';
import { Paths } from 'config/site-paths';
import { dislike, like } from 'redux-state/features/likes';
import formatter from 'utils/currencyFormatter';
import colors from 'config/theme';
import NoImage from 'assets/png/no-photo-available.png';
interface ProductCardProps {
  name: string;
  infoProduct: boolean | null;
  media?:
    | {
        url: string;
        alt: string;
      }[]
    | null;
  thumbnail?: string;
  discount?: {
    currency: string;
    amount: number;
    amountInSum?: number | null;
  };
  slug: string;
  id?: string;
  startPrice?: {
    currency: string;
    amount: number;
    amountInSum?: number | null;
  };
  variant: string;
  modalOpen?: () => void;
  category: string;
  instalmentsPrice: string;
  inDiscount?: boolean | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  media,
  discount,
  slug,
  id,
  startPrice,
  variant,
  modalOpen,
  infoProduct,
  category,
  instalmentsPrice,
  inDiscount,
}) => {
  const navigator = useRouter();
  const dispatch = useAppDispatch();
  const { cartProducts, currency } = useAppSelector((state) => state.cart);
  const { likeList } = useAppSelector((state) => state.like);
  const { limit } = useAppSelector((state) => state.paymartCart);
  const isInCard = cartProducts.some((product) => product.id === id);
  const isInLikeList = likeList.some((product) => product.id === id);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    if (isInCard) return navigator.push(Paths.CART);
    if ((id && startPrice?.amountInSum) || discount?.amountInSum) {
      dispatch(
        addToCart({
          id,
          image: (media && media[0].url) || '',
          price: discount || startPrice,
          is_saved: false,
          name,
          variant,
          slug,
          category,
          instalmentsPrice: JSON.parse(instalmentsPrice)[limit],
          inDiscount,
        })
      );
      if (inDiscount === true) {
        dispatch(
          addInstalments({
            amount: 1,
            category,
            img: (media && media[0].url) || '',
            id,
            instalmentsPrice: JSON.parse(instalmentsPrice),
            name,
            price: startPrice?.amountInSum ? startPrice?.amountInSum : 0,
            priceInstalment: JSON.parse(instalmentsPrice)[limit],
          })
        );
      }
    }
  };

  const handleLikeDislike = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    if (id && startPrice?.amountInSum) {
      if (isInLikeList) {
        return dispatch(dislike(id));
      }
      return dispatch(
        like({
          id,
          image: (media && media[0].url) || '',
          price: startPrice,
          discount,
          name,
          variant,
          slug,
          category,
          instalmentsPrice,
        })
      );
    }
  };

  return (
    <ProductCardWrapper
      onClick={() => {
        navigator.push(`${Paths.PRODUCT_DETAILS}${slug}`);
        modalOpen ? modalOpen() : '';
      }}
    >
      {discount && startPrice && (
        <ProductCardLabel isNew={!!!discount}>
          {discount.amountInSum && startPrice.amountInSum && (
            <Typography color="white" fontSize="15px">
              {discount.amountInSum !== startPrice.amountInSum && '-'}
              {Math.floor(
                (discount.amountInSum / startPrice?.amountInSum) * 100
              )}
              %
            </Typography>
          )}
        </ProductCardLabel>
      )}
      <ProductHeartWrapper isSaved={isInLikeList} onClick={handleLikeDislike}>
        <Heart />
      </ProductHeartWrapper>
      <Stack justifyContent="space-between" height={363} spacing={2}>
        <ProductCardImageWrapper>
          <LazyImage
            src={
              (media && media.length > 0 ? media[0]?.url : NoImage.src) || ''
            }
            alt={
              (media && media.length > 0 && media[0]?.alt) || 'product_image'
            }
          />
        </ProductCardImageWrapper>
        <Typography height="auto" variant="subtitle2">
          {name.length <= 50 ? name : `${name.slice(0, 50)}...`}
        </Typography>
        {inDiscount ? (
          <Typography className="instalment">
            {formatter(JSON.parse(instalmentsPrice)[12])} сум/ 12 мес
          </Typography>
        ) : (
          // <StyleInstalmentsNot>
          //   {formatter(JSON.parse(instalmentsPrice)[12])} сум/ 12 мес
          // </StyleInstalmentsNot>
          ""
        )}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Stack>
            {discount && (
              <Typography
                sx={{ textDecoration: 'line-through' }}
                variant="body2"
              >
                {formatter(startPrice?.amountInSum || 0)} {currency}
              </Typography>
            )}
            <Typography
              variant="h3"
              fontSize={{ sm: '1.125rem', xs: '16px' }}
              fontWeight={600}
              onClick={(e) => e.stopPropagation()}
            >
              {discount?.amountInSum && startPrice?.amountInSum
                ? formatter(startPrice?.amountInSum - discount?.amountInSum)
                : formatter(startPrice?.amountInSum || 0)}{' '}
              {currency}
            </Typography>
          </Stack>
          {infoProduct && (
            <Button
              onClick={handleAddToCart}
              variant="contained"
              sx={{
                '.MuiButtonBase-root': {
                  pl: 0,
                  pr: 0,
                },
                minWidth: { xs: '36px' },
                p: { xs: '9px' },
              }}
            >
              {isInCard ? <Eye /> : <Cart />}
            </Button>
          )}

          {navigator.asPath === '/like-list' && (
            <Button
              onClick={handleAddToCart}
              variant="contained"
              sx={{
                '.MuiButtonBase-root': {
                  pl: 0,
                  pr: 0,
                },
                minWidth: { xs: '36px' },
                p: { xs: '9px' },
              }}
            >
              {isInCard ? <Eye /> : <Cart />}
            </Button>
          )}
        </Stack>
      </Stack>
      {navigator.asPath !== '/like-list' ? (
        <>
          {!infoProduct && (
            <Typography color={colors.primary.hover} variant="body2">
              Временно Недоступно
            </Typography>
          )}
        </>
      ) : (
        ''
      )}
    </ProductCardWrapper>
  );
};

export default ProductCard;
