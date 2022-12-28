import { NextPage } from 'next';
import React from 'react';
import { ProfileLayout } from 'layouts/profile';
import { Main } from 'layouts/main';
import { WithAuth } from 'components/private-route';
import { Paths } from 'config/site-paths';
import { Breadcrumb } from 'components/breadcrumbs';
import { Container, Stack, Typography, Skeleton, useMediaQuery, Stepper, Step, StepLabel } from '@mui/material';


const PaymentByInstalments: NextPage = () => {
  const md = useMediaQuery('(max-width:899px)');

  const links = [
    {
      name: 'оплата в рассрочку',
      link: Paths.INSTALMENTS,
    },
  ];

 

  return (
    <Main>
      <Container maxWidth='xl'>
        {!md && <Breadcrumb data={links} />}

        <ProfileLayout loading={false}
          loadingFallBack={
            <Stack gap="1rem">
              <Typography variant="h2">
                <Skeleton variant="text" width="40%" />
              </Typography>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="50%" />
            </Stack>
          }>
          
        </ProfileLayout>
      </Container>
    </Main>

  )
}

export default WithAuth(PaymentByInstalments);