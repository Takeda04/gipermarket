import { Container, Grid, Stack, Typography } from '@mui/material';
import { ProductCard } from 'components/cards';
import { Main } from 'layouts/main';
import { NextPage } from 'next';
import { useAppSelector } from 'redux-state/hook';

const CategoryProducts: NextPage = () => {
  const { likeList = [] } = useAppSelector((state) => state.like);
  
  return (
    <Main>
      <Container maxWidth="xl">
        <Stack spacing={2}>
          <Typography margin="1.5rem 0" variant="h2">
            Избранные товары
          </Typography>
          <Grid rowGap="3rem" direction="row" container>
            {likeList.map((like) => (
              <Grid
                justifyContent="center"
                item
                xs={12}
                md={3}
                lg={2}
                sm={6}
                key={like.id}
              >
                <ProductCard
                  category={like.category ? like.category : ''}
                  instalmentsPrice={like.instalmentsPrice ? like.instalmentsPrice : ""}
                  infoProduct={null}
                  name={like.name}
                  media={[{ url: like.image, alt: 'product_photo' }]}
                  discount={
                    like.discount?.amountInSum ? {
                      amountInSum: like.discount?.amountInSum,
                      currency: 'USD',
                      amount: 1,
                    } : undefined
                  }
                  startPrice={{
                    amountInSum: like.price?.amountInSum,
                    currency: 'USD',
                    amount: 1,
                  }}
                  slug={like.slug || ''}
                  id={like.id}
                  variant={like.variant}
                />
              </Grid>
            ))}
          </Grid>
          {!likeList.length ?
            <Stack>
              <Typography textAlign="center" variant="h2">
                Нет избранных товаров
              </Typography>
            </Stack>
            :
            ""
          }
        </Stack>
      </Container>
    </Main>
  );
};

export default CategoryProducts;
