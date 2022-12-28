import { NextPage } from 'next';
import React from 'react';
import { ProfileLayout } from 'layouts/profile';
import {
  Container,
  Typography,
  Stack,
  Skeleton,
  Dialog,
  Grid,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { Paths } from 'config/site-paths';
import { Breadcrumb } from 'components/breadcrumbs';
import { Main } from 'layouts/main';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAddressListQuery } from 'graphql/generated.graphql';
import { AddressCreate } from 'components/address-items';
import { Button } from 'components/button';
import { useRouter } from 'next/router';
import { Drawer } from '@mui/material';
import { WithAuth } from 'components/private-route';
import { useModal } from 'hooks/use-modal';
import { BackArrow } from 'components/icons/back-arrow';
import Close from 'components/icons/close';
import { AddresCard } from 'components/cards';

const Addresses: NextPage = () => {
  const { data, loading, refetch } = useAddressListQuery();
  const { close, open, isOpen } = useModal();
  const backdrop = useModal();
  const { t } = useTranslation();
  const md = useMediaQuery('(max-width:899px)');
  const router = useRouter();
  const links = [
    {
      name: 'Личный кабинет',
      link: Paths.PROFILE,
    },
    {
      name: 'Address',
      link: Paths.ORDERS,
    },
  ];
  return (
    <Main>
      <Container maxWidth="xl">
        {!md && <Breadcrumb data={links} />}
        {!md ? (
          <ProfileLayout
            loading={false}
            loadingFallBack={
              <Stack gap="1rem">
                <Typography variant="h2">
                  <Skeleton variant="text" width="40%" />
                </Typography>
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="50%" />
              </Stack>
            }
          >
            <Stack
              mb={4}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h2">{t('address')}</Typography>
              <Button onClick={open} variant="contained">
                {t('createAddress')}
              </Button>
            </Stack>
            {loading ? (
              <Stack gap="1rem">
                <Typography variant="h2">
                  <Skeleton variant="text" width="40%" />
                </Typography>
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="50%" />
              </Stack>
            ) : (
              <Grid container spacing={2}>
                {data?.me?.addresses?.map((e) => (
                  <AddresCard data={e} backdrop={backdrop} />
                ))}
              </Grid>
            )}

            <Dialog open={isOpen} onClose={close}>
              <Close
                style={{
                  right: '10px',
                  top: '10px',
                  cursor: 'pointer',
                  position: 'absolute',
                }}
                onClick={close}
              />
              <AddressCreate backdrop={backdrop} modalClose={close} />
            </Dialog>
          </ProfileLayout>
        ) : (
          <>
            <Stack mb={4}>
              <Stack
                onClick={() => router.back()}
                margin="16px 0"
                direction={'row'}
                gap="18px"
                alignItems="center"
              >
                <BackArrow />
                <Typography variant="h2">{t('address')}</Typography>
              </Stack>
              {loading ? (
                <Stack gap="1rem">
                  <Typography variant="h2">
                    <Skeleton variant="text" width="40%" />
                  </Typography>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="70%" />
                  <Skeleton variant="text" width="50%" />
                </Stack>
              ) : (
                <Grid marginBottom={{xs:'20px',lg:0}} container spacing={2}>
                  {data?.me?.addresses?.map((e) => (
                    <AddresCard data={e} backdrop={backdrop} />
                  ))}
                </Grid>
              )}
              <Button
                sx={{ marginTop: '20px' }}
                onClick={open}
                variant="contained"
              >
                {t('createAddress')}
              </Button>
            </Stack>
            <Drawer sx={{width:'100vw', msoverflowX:'hidden'}} anchor='bottom' open={isOpen} onClose={close}>
              <Close
                style={{
                  right: '10px',
                  top: '10px',
                  cursor: 'pointer',
                  position: 'absolute',
                }}
                onClick={close}
              />
              <AddressCreate backdrop={backdrop} modalClose={close} />
            </Drawer>
          </>
        )}

        <Backdrop sx={{zIndex:'1000'}} open={backdrop.isOpen}>
          <CircularProgress color="primary" />
        </Backdrop>
      </Container>
    </Main>
  );
};

export default WithAuth(Addresses);
