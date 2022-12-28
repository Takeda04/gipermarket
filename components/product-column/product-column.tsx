import { Stack, Typography } from '@mui/material';
import ProductCardHorizontal from 'components/cards/product-card-horizontal';
import Spacer from 'components/common/spacer';
import { useRouter } from 'next/router';
import { Paths } from 'config/site-paths';
import { useCategoryQuery } from 'graphql/generated.graphql';
import React from 'react';
import colors from 'config/theme';
import NoImage from "assets/png/no-photo-available.png";

const ProductColumn: React.FC<{ label: string, slug: string, modalOpen?: () => void }> = ({ label, slug, modalOpen }) => {
  const { data, loading, fetchMore } = useCategoryQuery({
    variables: {
      first: 3,
      slug: Array.isArray(slug) ? slug[0] : slug || '',
      cursor: '',
    },
    skip: !slug,
  });

  const products = data?.category?.products?.edges.map(product => product.node);
  const router = useRouter()

  return (
    <Stack width="100%" spacing={2}>
      <Typography
        sx={{
          cursor: 'pointer',
          ':hover': { color: colors.primary.hover },
          height: '2rem',
          overflow: "hidden"
        }}
        onClick={() => router.push(`${Paths.CATEGORY_PRODUCTS}${slug}`)}
        variant="subtitle1"
      >
        {data?.category?.name}
      </Typography>
      <Spacer />
      {products?.slice(0, 3).map((product) => (
        <ProductCardHorizontal
          productInfo={product.isAvailableForPurchase || null}
          name={product.name}
          slug={product.slug}
          instalmentsPrice={JSON.parse(product.defaultVariant?.getPriceWithInstallment)[12]}
          image={
            product?.media && product.media.length > 0
              ? product.media[0].url
              : NoImage.src
          }
          inDiscout={product.inDiscount}
          price={product.defaultVariant?.pricing?.price?.gross}
          discount={product.defaultVariant?.pricing?.discount?.gross}
          modalOpen={modalOpen}
        />
      ))}
    </Stack>
  );
};

export default ProductColumn;
