import { Button, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { ProductCard } from 'components/cards';
import { ProductCardLoading } from 'components/cards/loading-cards';
import { ArrowLeft } from 'components/icons/arrow-left';
import { ArrowRight } from 'components/icons/arrow-right';
import {
  useAllProductsQuery,
} from 'graphql/generated.graphql';
import { Main } from 'layouts/main';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const CategoryProducts: NextPage = () => {
  const router = useRouter();
  const { query } = router.query;

  const { data, loading, fetchMore } = useAllProductsQuery({
    variables: {
      first: 24,
      search: Array.isArray(query) ? query.join('&') : query || '',
      cursor: '',
    },
  });
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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

  const checkNextPage = () => {
    fetchMore({
      variables: {
        cursor: pageInfo?.endCursor,
      },
      // @ts-expect-error
      updateQuery(previousQueryResult, { fetchMoreResult }) {
        return fetchMoreResult
      },
    })
    goToTop()
  }
  const checkPreviousPage = () => {
    fetchMore({
      variables: {
        before: pageInfo?.startCursor,
        last: 24,
        first: 0,
      },
      // @ts-expect-error
      updateQuery(previousQueryResult, { fetchMoreResult }) {
        return fetchMoreResult
      },
    })
    goToTop()

  }



  return (
    <Main>
      <Container maxWidth="xl">
        {loading ? (
          loadingIndicator()
        ) : (
          <Stack spacing={2}>
            <Typography margin="1.5rem 0" variant="h2">
              Результаты поиска по запросу "{query}"
            </Typography>

            <Grid rowGap="3rem" direction="row" container>
              {nodes && nodes?.length > 0 ? (
                nodes?.map((product) => (
                  <Grid
                    justifyContent="center"
                    item
                    xs={12}
                    md={3}
                    lg={2}
                    sm={6}
                    key={product.id}
                  >
                    <ProductCard
                      category={product.category?.name ? product.category?.name : ''}
                      instalmentsPrice={product.defaultVariant?.getPriceWithInstallment}
                      infoProduct={product.isAvailableForPurchase || null}
                      name={product.name}
                      media={product?.media}
                      thumbnail={product.thumbnail?.url}
                      discount={
                        product.defaultVariant?.pricing?.discount?.gross
                      }
                      startPrice={
                        product.defaultVariant?.pricing?.price?.gross
                      }
                      slug={product.slug}
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
                  <Typography textAlign="center" variant="h2">
                    Ничего не найдено
                  </Typography>
                </Grid>
              )}
            </Grid>

          </Stack>
        )}
        <Stack direction='row' mt='30px' gap='10px' justifyContent='center'>
          <Button {...(pageInfo?.hasPreviousPage && { variant: 'contained', onClick: checkPreviousPage })} sx={{ border: '1px solid #e5e5e5' }}>
            <ArrowLeft />
          </Button>
          <Button {...(pageInfo?.hasNextPage && { variant: 'contained', onClick: checkNextPage })} sx={{ border: '1px solid #e5e5e5' }}>
            <ArrowRight />
          </Button>

        </Stack>
      </Container>
    </Main>
  );
};

export default CategoryProducts;
