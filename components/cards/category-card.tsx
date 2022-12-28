import Image from 'next/image';
import Typography from '@mui/material/Typography';
import React, { memo } from 'react';
import { Paths } from 'config/site-paths';
import colors from 'config/theme';
import { useRouter } from 'next/router';
import { CategoryCardImageWrapper, CategoryCardWrapper } from './card.styles';
import { Box } from '@mui/material';
import truncate from 'utils/truncate';
import { LazyImage } from 'components/image';

interface CategoryCardProps {
  label?: string;
  image?: { alt?: string | null; url: string } | null;
  slug?: string;
  withMargin?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  label,
  image,
  slug,
  withMargin,
}) => {
  const router = useRouter();
  return (
    <Box sx={{ margin: withMargin ? '0 .5rem' : 0 }}>
      <CategoryCardWrapper onClick={() => router.push(`${Paths.CATEGORY_PRODUCTS}${slug}`)}>
        <CategoryCardImageWrapper>
          {image && (
            <LazyImage 
              src={image?.url || ''}
              alt={image?.alt || ''}
            />
          )}
        </CategoryCardImageWrapper>
        <Typography
          sx={{
            textTransform:'capitalize',
            flexGrow:1,
            textAlign:"center",
          }}
          variant="subtitle2"
        >
          {truncate(label, 25)?.toLowerCase()}
        </Typography>
      </CategoryCardWrapper>
    </Box>
  );
};
export default memo(CategoryCard);
