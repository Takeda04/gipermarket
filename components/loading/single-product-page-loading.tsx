import { Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import Spacer from 'components/common/spacer';
import colors from 'config/theme';
import { Main } from 'layouts/main';
import React from 'react';

const SingleProductPageLoading = () => (
  <Main>
    <Container maxWidth="xl">
      <Typography variant="h2" fontWeight={600} lineHeight="36px">
        <Skeleton variant="text" width="20%" />
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        margin="1rem 0"
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="subtitle2">
            <Skeleton variant="text" width={200} />
          </Typography>
        </Stack>
        <Typography color={colors.grey.default}>
          <Skeleton variant="text" width={50} />
        </Typography>
      </Stack>
      <Spacer />
      <Grid margin="1rem 0" columnGap="1rem" container>
        <Grid  item sm={12} xs={12} md={6} lg={4}>
          <Skeleton variant="rectangular" width="100%" height={435} />
        </Grid>
        <Grid item sm={12} xs={12} md={6} lg={5}>
          <Typography variant="body1" fontWeight={500}>
            <Skeleton variant="text" width="10%" />
          </Typography>
          <Stack spacing={2}>
            <Typography fontWeight={500} variant="h3">
              <Skeleton variant="text" width="20%" />
            </Typography>
            <Typography variant="subtitle2">
              <Skeleton variant="text" width="50%" />
            </Typography>
            <Typography variant="subtitle2">
              <Skeleton variant="text" width="40%" />
            </Typography>
            <Typography variant="subtitle2">
              <Skeleton variant="text" width="40%" />
            </Typography>
            <Typography variant="subtitle2">
              <Skeleton variant="text" width="30%" />
            </Typography>
            <Typography variant="subtitle2" color={colors.red.default}>
              <Skeleton variant="text" width="20%" />
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  </Main>
);

export default SingleProductPageLoading;
