import React from 'react';
import { CartItemImage, CartItemWrapper } from './cart-item.styles';
import Image from 'next/image';
import { Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import Heart from 'components/icons/heart';
import { deleteInstalments } from 'redux-state/features/paymart-cart';
import Trash from 'components/icons/trash';
import colors from 'config/theme';
import CartController from './cart-controller';
import { CartProduct, removeItem } from 'redux-state/features/cart-slice';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';
import Link from 'next/link';
import { Paths } from 'config/site-paths';
import { LazyImage } from 'components/image';
import { dislike, like } from 'redux-state/features/likes';
import formatter from 'utils/currencyFormatter';

const CartItem: React.FC<CartProduct> = ({
  count,
  name,
  price,
  id,
  image,
  variant,
  slug,
  category,
  instalmentsPrice,
  inDiscount,
}) => {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.cart);
  const { likeList } = useAppSelector((state) => state.like);
  // const isInLikeList = likeList.some((product) => product.id === id);

  const handleRemoveItem = () => {
    if (!id) return;
    dispatch(removeItem(id));
    dispatch(
      deleteInstalments({
        id,
        price: price?.amountInSum ? price?.amountInSum : 0,
        priceInstalment: 0,
      })
    );
  };

  // const handleLikeDislike = () => {
  //   if (id && price) {
  //     if (isInLikeList) {
  //       return dispatch(dislike(id));
  //     }
  //     return dispatch(
  //       like({
  //         id,
  //         image,
  //         price,
  //         discount: undefined,
  //         name,
  //         variant,
  //         slug,
  //         category,
  //         instalmentsPrice,

  //       })
  //     );
  //   }
  // };

  return (
    <CartItemWrapper>
      <CartItemImage>
        <LazyImage src={image} alt="product_image" />
      </CartItemImage>
      <Stack width="100%" spacing={1}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          width="100%"
          flexWrap="wrap"
        >
          <Typography
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                fontSize: '1rem',
              },
            })}
            variant="h2"
          >
            <Link href={`${Paths.PRODUCT_DETAILS}${slug}`}>
              <a>{name}</a>
            </Link>
          </Typography>
          <Typography
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                fontSize: '1rem',
              },
            })}
            fontWeight={600}
            variant="h2"
          >
            {formatter(price?.amountInSum)} {currency}
          </Typography>
        </Stack>
        {inDiscount || (
          <Typography color="gray">
            Этот тавар не продается в рассрочку
          </Typography>
        )}
        {/* <Typography variant="subtitle2">{variant}</Typography> */}
        <Stack flexWrap="wrap" direction="row">
          <Stack flexWrap="wrap" marginRight="auto" direction="row">
            {/* <Button
              sx={{ color: isInLikeList ? colors.red.default : colors.grey.default, padding: '0.625em .2em' }}
              size="small"
              startIcon={<Heart />}
              onClick={handleLikeDislike}
            >
              {isInLikeList ? 'не нравится' : 'В избранное'}
            </Button> */}
            <Button
              size="small"
              startIcon={<Trash />}
              sx={{ color: colors.grey.default, padding: '0.625em .2em' }}
              onClick={handleRemoveItem}
            >
              Удалить
            </Button>
          </Stack>

          <CartController
            id={id || ''}
            count={count}
            category={category ? category : ''}
            name={name}
            price={price?.amountInSum ? price?.amountInSum : 0}
            priceInstalment={instalmentsPrice}
            inDiscount={inDiscount}
          />
        </Stack>
      </Stack>
    </CartItemWrapper>
  );
};

export default CartItem;
