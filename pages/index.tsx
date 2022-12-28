import { Box, Container, Grid, Typography, Backdrop, CircularProgress } from '@mui/material';
import { Action } from 'components/action';
import React from 'react';
import { CategoyrCarousel } from 'components/carousel/category-carousel';
import { BannerCarousel } from 'components/carousel/img-carousel';
import { useAppSelector, useAppDispatch } from 'redux-state/hook';
import { changeUser } from 'redux-state/features/paymart-slice';
import { specialOrdering } from 'redux-state/features/paymart-slice';
import { ProductCarousel } from 'components/carousel/product-carousel';
import { PopularBrands } from 'components/popular-brands';
import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

import { ProductColumn } from 'components/product-column';
import { useAllCategoriesQuery, useAllProductsQuery, useProductListQuery } from 'graphql/generated.graphql';
import { useModal } from 'hooks/use-modal';
import { Main } from 'layouts/main';
import styled from 'styled-components';
import type { NextPage } from 'next';
import ProductRecCarousel from 'components/carousel/product-reccomend-carousel/recommend-carousel';

const GridItem = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 30px;
    @media (max-width:1200px){
      gap: 0;
    }
    @media (max-width: 1126px){
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    @media (max-width: 768px){
      grid-template-columns: 1fr;
    }
  `

const Home: NextPage = () => {
  const { data: categoryData } = useAllCategoriesQuery({ variables: { first: 10, cursor: "" } });
  const nodes = categoryData?.categories?.edges.map((edge) => edge.node);
  const { isOpen: productIsopen, open: productOpen } = useModal();
  const { user:paymartUser } = useAppSelector((state) => state.paymart);
  const { order:orderSpecial } = useAppSelector((state) => state.paymart);
  
  const dispatch = useAppDispatch()
  
  React.useEffect(() => {
    if (paymartUser) {
      toast("Ваш заказ зарегистрирован", {
        type: "success" as TypeOptions
      });
      dispatch(changeUser({user:false}));
    }
    if(orderSpecial){
      toast("Заказ успешно создан", {
        type: "success" as TypeOptions
      });
      dispatch(specialOrdering({order:false}));
    }
  }, [])

  return (
    <Main>
      <ToastContainer position="top-right" newestOnTop />
      <Box maxWidth="2000px" margin="0 auto">
        <BannerCarousel />
      </Box>
      <Container maxWidth="xl">
        <CategoyrCarousel />
        {/* <ProductCarousel
          modalOpen={productOpen}
          slug={'гипермарт-рекомендуеттест'}
          label={'Гипермарт Рекомендует'}
        /> */}
        <ProductRecCarousel label={'Гипермарт Рекомендует'}/>
      </Container>
      <Action />
      <Container maxWidth="xl">
        <GridItem>
          <Box>
            <ProductColumn
              modalOpen={productOpen}
              slug={nodes ? nodes[1].slug : ''}
              label={nodes ? nodes[1].name : ''}
            />
          </Box>
          <Box >
            <ProductColumn
              modalOpen={productOpen}
              slug={nodes ? nodes[2].slug : ''}
              label={nodes ? nodes[2].name : ''}
            />
          </Box>
          <Box >
            <ProductColumn
              modalOpen={productOpen}
              slug={nodes ? nodes[3].slug : ''}
              label={nodes ? nodes[3].name : ''}
            />
          </Box>
        </GridItem>
        <ProductCarousel
          modalOpen={productOpen}
          slug={nodes ? nodes[2].slug : ''}
          label={nodes ? nodes[2].name : ''}
        />
        <ProductCarousel
          modalOpen={productOpen}
          slug={nodes ? nodes[5].slug : ''}
          label={nodes ? nodes[5].name : ''}
        />
        <Typography margin="1rem 0" variant="h2" fontWeight={600}>
          Популярные бренды
        </Typography>
        <PopularBrands />
      </Container>
      <Backdrop
        sx={{ color: '#FEEE00', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={productIsopen}
      >
        <CircularProgress color='primary' />
      </Backdrop>
    </Main>
  );
};

export default Home;
