import { FC, } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import React from 'react';
import { SampleNextArrow } from '../product-carousel/SampleNextArrow';
import { SamplePrevArrow } from '../product-carousel/SamplePrevArrow';
import { Stack, Typography, useTheme } from '@mui/material';
import { useUsaBannersQuery } from 'graphql/generated.graphql';
import { ProductCardLoading } from 'components/cards/loading-cards';
import { UsaCard } from './use-card';
import Link from 'next/link';

const Card = styled.div<{ height?: number; fullBorderRadius?: boolean }>`
  max-width: 100%;
  padding-right: 5px;
  position: relative;
  .slick-list{
    margin-right: 2px;
  }
  .brends__link{
    display: block;

  }
`;


const UsaBanners: FC = () => {

  const { data, loading } = useUsaBannersQuery()

  const theme = useTheme();

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
          slidesToShow: 1,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: theme.breakpoints.values.xl,
        settings: {
          slidesToShow: 6,
        },
      },
    ]
  };


  const products = data?.banners?.edges;



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

  return (
    <Card>
      <Stack
        margin="1rem 0"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography></Typography>

      </Stack>
      <Slider
        lazyLoad="progressive"
        {...settings}
      >
        {products?.map((item) => (
          <Link href={item.node.redirectUrl}>
            <a className='brends__link' target='_blank'>
              {item.node.backgroundImage ?
                <UsaCard
                  img={item.node.backgroundImage.url}
                  des={item.node.description}
                  title={item.node.title}
                  url={item.node.redirectUrl} />
                :
                ""
              }
            </a>
          </Link>


        ))}

      </Slider>
    </Card>
  );
};

export default UsaBanners;