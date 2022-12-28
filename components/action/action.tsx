import { Container, Grid, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { useBannersQuery } from 'graphql/generated.graphql';
import { ActionWrapper, StyleImgBlock } from './action-style';
import { LazyImage } from 'components/image';
import Slider from 'react-slick';
import Link from 'next/link';


const action = () => {

  const { data } = useBannersQuery({
    variables: {
      filter: {
        type: "DISCOUNT"
      },
      first: 3
    }
  })
  const discounts = data?.banners?.edges.map((el) => el.node);

  const settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 898,
        settings: {
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 636,
        settings: {
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };



  return (
    <ActionWrapper>
      <Container maxWidth="xl">
        <Typography variant="h2" mb={1} fontWeight={600}>
          Акции
        </Typography>
        <Slider lazyLoad="progressive" {...settings}>
          {discounts?.map((e) => (
            <StyleImgBlock key={e.id}>
              <Link href={e.redirectUrl}>
                <a>
                  {e.backgroundImage ?
                    <LazyImage src={e.backgroundImage?.url} alt={e.backgroundImage?.alt ? e.backgroundImage?.alt : 'actions'} />
                    :
                    ""
                  }
                </a>
              </Link>

            </StyleImgBlock>
          ))}
        </Slider>
      </Container>
    </ActionWrapper>
  );
};

export default action;

