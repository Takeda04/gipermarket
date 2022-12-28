import { FC } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { CategoryCard } from 'components/cards';
import { useTheme } from '@mui/material';
import Arrow from 'components/icons/arrow';
import { useAllCategoriesQuery } from 'graphql/generated.graphql';
import { CategoryCaruselCard } from '../carusel-style';
import { useRouter } from 'next/router';


const NextArrow = styled(Arrow)`
  transform: rotate(180deg) translate(0, 50%);
`;

const CategoryCarousel: FC = () => {
  const theme = useTheme();
  const { data } = useAllCategoriesQuery({
    variables: { first: 20, cursor: '' },
  });
  const products = data?.categories?.edges.filter((e)=>{
    if(e.node.children?.edges.length){
      return e;
    }
  })
  
  const settings = {
    infinite:true,
    dots: false,
    slidesToShow: 5,
    arrows: true,
    speed: 500,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed:4000,
    prevArrow:<Arrow />,
    nextArrow:<NextArrow />,
    responsive:[
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,

        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.xs,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      
    ]
  }
  
  return (
    <CategoryCaruselCard>
      <Slider
        {...settings}
        lazyLoad="progressive" 
      >
        {products?.map((item) => (
          <div

            key={item.node.id}
          >
            <CategoryCard
              withMargin
              slug={item.node.slug}
              label={item.node.name}
              image={item.node?.backgroundImage}
            />
          </div>
        ))}
      </Slider>
    </CategoryCaruselCard>
  );
};

export default CategoryCarousel;
