import { Container, Skeleton, Dialog, Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import { Main } from 'layouts/main';
import { ProfileLayout } from 'layouts/profile';
import { NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import { Paths } from 'config/site-paths';
import { useMeQuery } from 'graphql/generated.graphql';
import { Breadcrumb } from 'components/breadcrumbs';
import { WithAuth } from 'components/private-route';
import { useModal } from 'hooks/use-modal';
import { useTranslation } from 'react-i18next';
import Close from 'components/icons/close';
import { useMediaQuery } from '@mui/material';
import { logout } from 'redux-state/features/user-slice';
import { useDispatch } from 'react-redux';
import { ProfileElements } from 'components/profile-elements';

const ProfilePage: NextPage = () => {
  
  const catalogModal = useModal();
  const {
    close: logoutClose,
    isOpen: logoutIsopen,
    open: logoutOpen,
  } = useModal();
  const router = useRouter();
  const { t } = useTranslation();
  const { data, loading } = useMeQuery();
  
  const dispatch = useDispatch();
  const links = [
    {
      name: 'Личный кабинет',
      link: Paths.PROFILE,
    },
  ];
  const deleteLogin = () => {
    logoutClose();
    dispatch(logout());
    router.replace(Paths.HOME);
  };
  const md = useMediaQuery('(max-width:899px)');

  return (
    <Main>
      <Container maxWidth="xl">
        {!md ? <Breadcrumb data={links} /> :
        <>
          <Typography mt='30px' mb='4px' variant='h2'>{data?.me?.phone}</Typography>
          <Typography mb='24px' variant='body2'>Неподтвержденный профиль</Typography>
        </>
        }
        <ProfileLayout
          main={true}
          loading={!md ? loading : false}
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
          {!md ? (
            <ProfileElements
              catalogModal={catalogModal}
              data={data}
              logoutClose={logoutClose}
              logoutIsopen={logoutIsopen}
              logoutOpen={logoutOpen}
            />
          ):''}
        </ProfileLayout>
        <Dialog open={logoutIsopen} onClose={logoutClose}>
          <Close
            style={{
              right: '10px',
              top: '10px',
              cursor: 'pointer',
              position: 'absolute',
            }}
            onClick={logoutClose}
          />
          <Stack sx={{ padding: '40px' ,width:'300px'}} spacing={4}>
            <Typography variant="h2">Хотите Выйти ?</Typography>
            <Button variant='contained' onClick={deleteLogin} >
              {t('logOut')}
            </Button>
          </Stack>
        </Dialog>

        {md && (
          <Button
            onClick={() => logoutOpen()}
            sx={{ maxWidth: 'max-content', marginRight: '50px' }}
            color="secondary"
          >
            {t('logOut')}
          </Button>
        )}
      </Container>
    </Main>
  );
};

export default WithAuth(ProfilePage);
