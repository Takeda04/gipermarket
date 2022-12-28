import { FC } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import React from 'react';
import { ProductCard } from 'components/cards';
import { SampleNextArrow } from './SampleNextArrow';
import colors from 'config/theme';
import { Paths } from 'config/site-paths';
import { SamplePrevArrow } from './SamplePrevArrow';
import { Stack, Typography, useTheme } from '@mui/material';
import { useAllProductsQuery, useCategoryQuery } from 'graphql/generated.graphql';
import { ProductCardLoading } from 'components/cards/loading-cards';
import { useRouter } from 'next/router';

const Card = styled.div<{ height?: number; fullBorderRadius?: boolean }>`
  max-width: 100%;
  position: relative;
`;

interface ProductCarouselProps {
  label?: string;
  slug?: string;
  modalOpen?: () => void;
}

const ProductRecCarousel: FC<ProductCarouselProps> = ({
  label,
  slug,
  modalOpen,
}) => {
  const theme = useTheme();
//   const { data, loading } = useCategoryQuery({
//     variables: { first: 30, cursor: '', slug },
//     skip: !slug,
//   });

const {data, loading} = useAllProductsQuery({variables: {first: 10, isRec: true}})
const nodes = data?.products?.edges.map((edge) => edge.node);


  const settings = {
    infinite: false,
    dots: false,
    arrows: true,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    slidesToShow: 6,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: theme.breakpoints.values.xs,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: theme.breakpoints.values.xl,
        settings: {
          slidesToShow: 6,
        },
      },
    ],
  };
 
  
  const products = data?.products?.edges.map((edge) => edge.node);

  if (loading) {
    return (
      <Stack margin="1rem 0" flexWrap="wrap" direction="row" gap="2rem">
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
      </Stack>
    );
  }
  const router = useRouter();
  return (
    <Card>
      <Stack
        margin="1rem 0"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {products?.length ? (
          <Typography
            sx={{
              cursor: 'pointer',
              ':hover': { color: colors.primary.hover },
            }}
            onClick={() => router.push(`${Paths.RECOMMEND}`)}
            variant="subtitle1"
          >
            {label}
          </Typography>
        ) : (
          ''
        )}
      </Stack>
      <Slider lazyLoad="progressive" {...settings}>
        {products?.map((product) => (
          <ProductCard
            category={product.name}
            instalmentsPrice={product.defaultVariant?.getPriceWithInstallment}
            infoProduct={product.isAvailableForPurchase || null}
            modalOpen={modalOpen}
            key={product.id}
            name={product.name}
            media={product?.media}
            thumbnail={product.thumbnail?.url}
            discount={product.defaultVariant?.pricing?.discount?.gross}
            slug={product.slug}
            id={product.defaultVariant?.id}
            startPrice={product.defaultVariant?.pricing?.price?.gross}
            variant={`${product?.defaultVariant?.attributes
              .map((val) => val?.attribute.name)
              .join(' ')}:${product?.defaultVariant?.name}`}
            inDiscount={product?.inDiscount}
          />
        ))}
      </Slider>
    </Card>
  );
};

export default ProductRecCarousel;


