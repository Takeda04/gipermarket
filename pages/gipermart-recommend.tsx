import {
    Container,
    Grid,
    Skeleton,
    Stack,
    Typography,
    IconButton,
    Button,
  } from '@mui/material';
  import { ProductCard } from 'components/cards';
  import { ProductCardLoading } from 'components/cards/loading-cards';
  import { ArrowLeft } from 'components/icons/arrow-left';
  import { ArrowRight } from 'components/icons/arrow-right';
  import { SEO } from 'components/seo';
  import {
    OrderDirection,
    ProductOrderField,
    useAllProductsQuery,
    useCategoryQuery,
  } from 'graphql/generated.graphql';
  import Filter from 'layouts/filter';
  import { useScrollPositsion } from 'hooks/use-scroll-positsion';
  import { Main } from 'layouts/main';
  import { NextPage } from 'next';
  import { useRouter } from 'next/router';
  import Arrow from 'components/icons/arrow';
  import React from 'react';
  import { useAppSelector } from 'redux-state/hook';
  
  const btnTopStyle = {
    position: 'fixed',
    zIndex: '99',
    bottom: '30px',
    left: '30px',
    transform: 'rotate(90deg)',
    bgcolor: 'rgba(0,0,0,0.08)',
    ':hover': { bgcolor: 'rgba(0,0,0,0.04)' },
  };
  
  const GipermartRecommend: NextPage = () => {
    const router = useRouter();
    const { price, sort, attributes } = useAppSelector((state) => state.filter);
    const { scrollPosition } = useScrollPositsion();
  
    const { slug } = router.query;
    const {data, loading, fetchMore} = useAllProductsQuery({variables: {first: 10, isRec: true}})
  
    const goToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    const checkNextPage = () => {
      fetchMore({
        variables: {
          cursor: pageInfo?.endCursor,
        },
        // @ts-expect-error
        updateQuery(previousQueryResult, { fetchMoreResult }) {
          return fetchMoreResult;
        },
      });
      goToTop();
    };

    const checkPreviousPage = () => {
      fetchMore({
        variables: {
          before: pageInfo?.startCursor,
          last: 20,
          first: 0,
        },
        // @ts-expect-error
        updateQuery(previousQueryResult, { fetchMoreResult }) {
          return fetchMoreResult;
        },
      });
      goToTop();
    };
  
    const nodes = data?.products?.edges.map((edge) => edge.node);
    const pageInfo = data?.products?.pageInfo;
  
    const loadingIndicator = () => (
      <Stack spacing={2}>
        <Skeleton variant="text" height={50} width={250} />
        <Stack direction="row" flexWrap="wrap" gap="2rem">
          <ProductCardLoading />
          <ProductCardLoading />
          <ProductCardLoading />
          <ProductCardLoading />
        </Stack>
      </Stack>
    );
  
    return (
      <Main>
        <Container maxWidth="xl"> 
        {loading ? (
            loadingIndicator()
          ) : (
            <>
                <Stack mb="70px" spacing={2}>
                  <Grid rowGap="3rem" direction="row" container>
                    {nodes && nodes.length > 0 ? (
                      nodes?.map((product) => (
                        <Grid item xs={12} md={4} lg={3} sm={6} key={product.id}>
                          <ProductCard
                            category={
                              product.name
                            }
                            instalmentsPrice={
                              product.defaultVariant?.getPriceWithInstallment
                            }
                            infoProduct={product.isAvailableForPurchase || null}
                            name={product.name}
                            media={product?.media}
                            thumbnail={product.thumbnail?.url}
                            discount={
                              product.defaultVariant?.pricing?.discount?.gross
                            }
                            slug={product.slug}
                            startPrice={
                              product.defaultVariant?.pricing?.price?.gross
                            }
                            id={product.defaultVariant?.id}
                            variant={`${product?.defaultVariant?.attributes
                              .map((val) => val?.attribute.name)
                              .join(' ')}:${product?.defaultVariant?.name}`}
                            inDiscount={product?.inDiscount}
                          />
                        </Grid>
                      ))
                    ) : (
                      <Grid item xs={12}>
                        <Typography
                          textAlign="center"
                          margin="1.5rem 0"
                          variant="h2"
                        >
                          Ничего не найдено
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                  {/* <InfiniteLoader
                  hasMore={pageInfo?.hasNextPage || false}
                  loadMore={() =>
                    fetchMore({
                      variables: {
                        cursor: pageInfo?.endCursor,
                      },
                    })
                  }
                  loading={loading}
                >
                  
                </InfiniteLoader> */}
                </Stack>
                <Stack direction="row" gap="10px" justifyContent="center">
                <Button
                  {...(pageInfo?.hasPreviousPage && {
                    variant: 'contained',
                    onClick: checkPreviousPage,
                  })}
                  sx={{ border: '1px solid #e5e5e5' }}
                >
                  <ArrowLeft />
                </Button>
                <Button
                  {...(pageInfo?.hasNextPage && {
                    variant: 'contained',
                    onClick: checkNextPage,
                  })}
                  sx={{ border: '1px solid #e5e5e5' }}
                > 
                  <ArrowRight />
                </Button>
              </Stack>
              </>
          )}
          {scrollPosition > 600 && (
            <IconButton onClick={goToTop} sx={{ ...btnTopStyle }}>
              <Arrow />
            </IconButton>
          )}
        </Container>
      </Main>
    );
  };
  
  export default GipermartRecommend;


  