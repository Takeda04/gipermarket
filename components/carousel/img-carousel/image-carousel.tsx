import { FC } from 'react';
import React from 'react';
import styled from 'styled-components';
import ArrowRightBold from './ArrowRightBold';
import ArrowLeftBold from './ArrowLeftBold';
import Slider from 'react-slick';
import { Stack } from '@mui/material';
import { LazyImage } from 'components/image';

const Card = styled.div`
    /* max-height: 435px; */
   .slick-slider {
     /* max-height: 300px; */
     /* @media (max-width: 768px) {
       height: 358px;
     } */
   }
   position: relative;
   img {
     width: 100%;
     max-height: auto;
     object-fit: contain;
   }
   .slick-list{
     transition: all .4s ease;
    }
   .slick-slide {
     text-align: center;
   }
 `;
const ImageCarousel: FC<{
  images?: string[];
  initialSlide?: number;
  imgs?: {
    url: string;
    alt: string;
  }[] | null | undefined

  onSlide?: (currenSlide: number) => void;
}> = ({ initialSlide, onSlide, children, imgs }) => {

  const currentImg = imgs?.map((i) => i.url)


  const [nav1, setNav1] = React.useState<any>();
  const [nav2, setNav2] = React.useState<any>();

  const settings1 = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const settings2 = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <ArrowLeftBold />,
    nextArrow: <ArrowRightBold />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Card>
      <Slider className="slider1"
        {...settings1}
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}>
        {children}
      </Slider>
      <Stack sx={{ width: '80%',margin:'0 auto'  }}>
        <Slider
          className="slider2"
          {...settings2}
          asNavFor={nav1}
          ref={(slider2) => setNav2(slider2)}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {currentImg?.map((i) => (
            <>
              {
                currentImg.length > 1 ? <LazyImage src={i} /> : ""
              }

            </>
          ))}
        </Slider>
      </Stack>
    </Card>

  );
};

export default ImageCarousel;
