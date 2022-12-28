import { NextPage } from 'next';
import React from 'react';
import { Main } from 'layouts/main';
import { Container, Typography, Stack } from '@mui/material';
import { useMeQuery } from 'graphql/generated.graphql';
import { useModal } from 'hooks/use-modal';
import { useRouter } from 'next/router';
import { WithAuth } from 'components/private-route';
import { ProfileElements } from 'components/profile-elements';
import { BackArrow } from 'components/icons/back-arrow';

const profildata: NextPage = () => {
  const router = useRouter();
  const {
    close: logoutClose,
    isOpen: logoutIsopen,
    open: logoutOpen,
  } = useModal();
  const { data, loading } = useMeQuery();
  const catalogModal = useModal();
  return (
    <Main>
      <Container maxWidth="xl">
        <Stack onClick={()=> router.back()} margin='16px 0' direction={'row'} gap="18px" alignItems="center">
          <BackArrow />
          <Typography variant="h2">Персональные данные</Typography>
        </Stack>
        <ProfileElements
          catalogModal={catalogModal}
          data={data}
          logoutClose={logoutClose}
          logoutIsopen={logoutIsopen}
          logoutOpen={logoutOpen}
        />
      </Container>
    </Main>
  );
};
export default WithAuth(profildata);
