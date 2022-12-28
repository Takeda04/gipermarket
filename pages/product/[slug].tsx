import {
  Container,
  Grid,
  MenuItem,
  Rating,
  useMediaQuery,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import Spacer from 'components/common/spacer';
import Heart from 'components/icons/heart';
import colors from 'config/theme';
import { Main } from 'layouts/main';
import { GetServerSideProps, NextPage } from 'next';
import React, { useRef, useState } from 'react';
import DataLine from 'components/common/dataline';
import AddtoCardSingle from 'components/add-to-card/add-to-card-single';
import {
  SingleProductDocument,
  SingleProductQuery,
} from 'graphql/generated.graphql';
import { LazyImage, ProductImage } from 'components/image';
import { ImageCarousel } from 'components/carousel/img-carousel';
import { Breadcrumb } from 'components/breadcrumbs';
import { Paths } from 'config/site-paths';
import Select from 'components/select';
import { SEO } from 'components/seo';
import { initializeApollo } from 'lib/apollo';
import { Button } from 'components/button';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';
import { dislike, like } from 'redux-state/features/likes';
import { ProductCarousel } from 'components/carousel/product-carousel';
import { ImageMagnifier } from 'components/image-magnifier';
import { ProductDetailTab } from 'components/product-detali-tab';
import Zoom from 'components/image-magnifier/zoom-image';

type Props = {
  data: SingleProductQuery;
  [key: string]: any;
};
// data?.product?.inDiscount
const SingleProduct: NextPage<Props> = ({ data }) => {
  const [variant, setVariant] = useState<any>();
  const dispatch = useAppDispatch();
  const characteristicsRef = useRef<HTMLDivElement>(null);
  const { likeList } = useAppSelector((state) => state.like);
  const isInLikeList = likeList.some(
    (product) =>
      data.product && product.id === data?.product?.defaultVariant?.id
  );

  const links = [
    {
      name: data?.product?.category?.name,
      link: `${Paths.CATEGORY_PRODUCTS}${data?.product?.category?.slug}`,
    },
    {
      name: data?.product?.name,
    },
  ];

  const handleChange = (event: SelectChangeEvent<any>) => {
    if (data?.product?.variants) {
      const varianttemp = data?.product?.variants.find(
        (product) => product && product.id === event.target.value
      );
      setVariant(varianttemp);
    }
  };

  const getVariantName = () => {
    if (variant) {
      return `${variant.attributes
        .map((val: any) => val?.attribute.name)
        .join(' ')}:${variant.name}`;
    }
    return `${data?.product?.defaultVariant?.attributes
      .map((val) => val?.attribute.name)
      .join(' ')}:${data?.product?.defaultVariant?.name}`;
  };

  const handleLikeDislike = () => {
    if (
      data.product?.defaultVariant?.id &&
      data.product.defaultVariant?.pricing?.price?.gross
    ) {
      if (isInLikeList) {
        return dispatch(dislike(data.product.defaultVariant.id));
      }
      return dispatch(
        like({
          id: data.product.defaultVariant.id,
          image:
            data.product.media && data.product.media.length > 0
              ? data.product.media[0].url
              : '',
          price: data.product.defaultVariant.pricing.price.gross,
          discount: data.product.defaultVariant.pricing.discount?.gross,
          name: data.product.name,
          variant: getVariantName(),
          slug: data.product.slug,
          instalmentsPrice: data.product.defaultVariant.getPriceWithInstallment,
          category: data.product.category?.name,
        })
      );
    }
  };
  

  const executeScroll = () =>
    characteristicsRef.current?.scrollIntoView({ behavior: 'smooth' });

  const idenfy =
    (data.product?.media?.length ? data.product?.media?.length : []) > 1
      ? true
      : false;

  const sliderItems = data.product?.media;

  const dataInfo = data?.product?.isAvailableForPurchase;
  const md = useMediaQuery('(max-width:900px)');
  console.log(md);

  return (
    <Main>
      {data.product && (
        <SEO
          title={`${data?.product.name} | GiperMart`}
          description={data?.product?.seoDescription || ''}
          image={
            data.product.media && data.product.media.length > 0
              ? data.product.media[0].url
              : ''
          }
        />
      )}

      <Container maxWidth="xl">
        {data?.product?.name && <Breadcrumb data={links} />}

        <Typography variant="h2" fontWeight={600} lineHeight="36px">
          {data?.product?.name}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={1}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Rating
              size="small"
              defaultValue={data?.product?.rating || 0}
              precision={0.5}
            />
            <Typography variant="subtitle2" color={colors.green.default}>
              ({data?.product?.rating || 0})
            </Typography>
            <Button
              onClick={handleLikeDislike}
              variant="text"
              sx={{ color: isInLikeList ? colors.red.default : colors.black }}
              startIcon={<Heart />}
            >
              <Typography
                variant="subtitle2"
                sx={(theme) => ({
                  [theme.breakpoints.down('sm')]: {
                    display: 'none',
                  },
                })}
              >
                {isInLikeList ? 'не нравится' : 'В избранное'}
              </Typography>
            </Button>
          </Stack>
        </Stack>
        <Spacer />
        <Grid mt="24px" container>
          <Grid sm={12} xs={12} item md={7} lg={4} position="relative">
            <ImageCarousel imgs={data?.product?.media}>
              {sliderItems?.map((media) => (
                <ProductImage key={media.alt}>
                  <Zoom
                    img={media.url}
                    zoomScale={2}
                    transform
                    width={!md ? 435 : '100%'}
                    height={435}
                    transitionTime={0.3}
                  />
                </ProductImage>
              ))}
            </ImageCarousel>
            {!md ? (
              <Stack
                sx={{
                  p: '30px',
                  position: 'absolute',
                  bottom: '50px',
                  zIndex: '-1',
                }}
                ref={characteristicsRef}
              />
            ) : (
              ''
            )}
          </Grid>
          <Grid item md={5} lg={5}>
            {data?.product?.variants?.length === 1 && variant && (
              <Typography variant="body1" fontWeight={500}>
                {variant.name}
              </Typography>
            )}
            {data?.product?.variants && data?.product?.variants?.length > 1 && (
              <>
                {
                  <Typography
                    sx={
                      idenfy
                        ? { marginTop: { md: '130px', lg: 0 } }
                        : { marginTop: 0 }
                    }
                    variant="body1"
                    fontWeight={500}
                  >
                    {data.product.defaultVariant?.attributes[0].attribute.name}
                  </Typography>
                }

                <Select
                  onChange={handleChange}
                  value={variant?.id}
                  endAdornment={<div />}
                  defaultValue={data.product.defaultVariant?.id}
                  sx={{
                    margin: '10px 0',
                    border: `1px solid ${colors.red.default}`,
                    ['div']: {
                      paddingRight: 0,
                      ['fieldset, svg']: {
                        display: 'none',
                      },
                      ['.MuiOutlinedInput-root .MuiOutlinedInput-input .MuiInputBase-input ']:
                        {
                          paddingRight: 0,
                        },
                    },
                  }}
                >
                  {data.product.variants.map((variant) => (
                    <MenuItem key={variant?.id} value={variant?.id}>
                      {variant?.name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
            <Stack mb="30px" pl={{ lg: 2, xs: 0, md: 2 }} spacing={2}>
              {data.product?.attributes && data.product?.attributes.length > 0 && (
                <>
                  <Typography
                    sx={
                      idenfy
                        ? { marginTop: { xs: '55px', lg: 0, md: 0 } }
                        : { marginTop: 0 }
                    }
                    fontWeight={500}
                    variant="h3"
                  >
                    Характеристики
                  </Typography>
                  {data?.product?.attributes.map((attr) => (
                    <React.Fragment key={attr.attribute.id}>
                      {attr.values.map((val) => val?.name).join(' ') ? (
                        <DataLine
                          field={attr.attribute.name || ''}
                          value={attr.values.map((val) => val?.name).join(' ')}
                          key={attr.attribute.name}
                        />
                      ) : (
                        ''
                      )}
                    </React.Fragment>
                  ))}
                  {data?.product?.characteristics && (
                    <Typography
                      onClick={executeScroll}
                      color={colors.red.default}
                      variant="subtitle2"
                      sx={{ cursor: 'pointer' }}
                    >
                      Все характеристики
                    </Typography>
                  )}
                </>
              )}
            </Stack>
          </Grid>
          <Grid
            sx={
              idenfy ? { marginTop: { md: '150px', lg: 0 } } : { marginTop: 0 }
            }
            xs={12}
            sm={12}
            md={6}
            item
            lg={3}
          >
            {md ? (
              <Stack
                ref={characteristicsRef}
              />
            ) : (
              ''
            )}
            <AddtoCardSingle
              categoryName={
                data.product?.category?.name ? data.product?.category?.name : ''
              }
              instalments={
                data.product?.defaultVariant?.getPriceWithInstallment
              }
              available={dataInfo ? dataInfo : null}
              canBoughtWithInstallment={data?.product?.inDiscount}
              price={
                variant?.pricing?.price?.gross ||
                data?.product?.defaultVariant?.pricing?.price?.gross
              }
              discount={
                variant?.pricing?.discount?.gross ||
                data?.product?.defaultVariant?.pricing?.discount?.gross
              }
              id={data?.product?.defaultVariant?.id}
              image={
                (data?.product?.media && data?.product?.media[0].url) || ''
              }
              name={data?.product?.name || ''}
              variant={getVariantName()}
              slug={data?.product?.slug}
            />
          </Grid>
        </Grid>

        <ProductDetailTab
          des={data?.product?.description ? data?.product?.description : ''}
          charektr={
            data?.product?.characteristics
              ? data?.product?.characteristics
              : null
          }
        />

        <Stack mb="30px">
          {data.product?.category ? (
            <ProductCarousel
              slug={data.product?.category?.slug}
              label="Похожие товары"
            />
          ) : (
            ''
          )}
        </Stack>
      </Container>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: SingleProductDocument,
    variables: {
      slug: params?.slug,
    },
  });
  return {
    props: {
      data,
    },
  };
};

export default SingleProduct;
