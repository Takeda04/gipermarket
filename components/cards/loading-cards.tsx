import { ProductCardWrapper, ProductCardImageWrapper } from './card.styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

export const ProductCardLoading = () => (
  <ProductCardWrapper loading="true">
    <Stack spacing={2}>
      <ProductCardImageWrapper>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      </ProductCardImageWrapper>
      <Typography variant="subtitle2">
        <Skeleton variant="text" width="80%" />
      </Typography>
        <Stack>
          <Typography sx={{ textDecoration: 'line-through' }} variant="body2">
            <Skeleton variant="text" width="30p%" />
          </Typography>
          <Typography variant="h3" fontWeight={600}>
            <Skeleton variant="text" width="50%" />
          </Typography>
        </Stack>
    </Stack>
  </ProductCardWrapper>
);
