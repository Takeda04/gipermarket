import React from 'react';
import { ProfilDataStyle } from './profile-elements.style';
import { Typography, Stack, Drawer } from '@mui/material';
import { Button } from 'components/button';
import { useAppDispatch } from 'redux-state/hook';
import { useRouter } from 'next/router';
import { Paths } from 'config/site-paths';
import { ChengePassword } from 'components/chenge-user-content';
import { ChengeData } from 'components/chenge-user-content';
import Close from 'components/icons/close';
import { logout } from 'redux-state/features/user-slice';
import { ProfileProps } from './profile.type';

export const ProfileElementMobile: React.FC<ProfileProps> = ({
  logoutClose,
  logoutIsopen,
  logoutOpen,
  data,
  catalogModal,
}) => {
  const [modalType, setModalTyupe] = React.useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const deleteLogin = () => {
    logoutClose();
    dispatch(logout());
    router.replace(Paths.HOME);
  };
  return (
    <>
      {/* MOBILE VERSION */}
      <ProfilDataStyle>
        <Stack
          sx={{ pb: '12px', borderBottom: '1px solid #CCCCCC' }}
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="body1">ID пользователя</Typography>
          <Typography fontSize="500" variant="body1">
            {data?.me?.id}
          </Typography>
        </Stack>
        <Stack
          sx={{ pb: '12px', pt: '12px', borderBottom: '1px solid #CCCCCC' }}
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="body1">Имя и фамилия</Typography>
          <Typography fontSize="500" variant="body1">
            {data?.me?.firstName} {data?.me?.lastName}
          </Typography>
        </Stack>
        <Stack
          sx={{ pb: '12px', pt: '12px', borderBottom: '1px solid #CCCCCC' }}
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="body1">Номер телефона</Typography>
          <Typography fontSize="500" variant="body1">
            {data?.me?.phone}
          </Typography>
        </Stack>
        <Stack
          sx={{ pt: '12px' }}
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="body1">Электронная почта</Typography>
          <Typography fontSize="500" variant="body1"></Typography>
        </Stack>
      </ProfilDataStyle>
      {/* izminit */}
      <Drawer
        
        anchor={'bottom'}
        sx={{ overflow: 'hidden'}}
        open={catalogModal.isOpen}
        onClose={catalogModal.close}
      >
        <Close
          style={{
            right: '10px',
            top: '10px',
            cursor: 'pointer',
            position: 'absolute',
          }}
          onClick={catalogModal.close}
        />
        {modalType ? (
          <ChengeData />
        ) : (
          <ChengePassword modal={catalogModal.close} />
        )}
      </Drawer>

      <Stack direction="row" justifyContent="end">
        <Button
          onClick={() => {
            catalogModal.open();
            setModalTyupe(true);
          }}
          sx={{ maxWidth: 'max-content' }}
          color="secondary"
        >
          ИЗМЕНИТЬ
        </Button>
      </Stack>

      <ProfilDataStyle>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Typography variant="subtitle2">Пароль</Typography>
          <Typography>********</Typography>
        </Stack>
      </ProfilDataStyle>
      <Stack direction="row" justifyContent="end">
        <Button
          onClick={() => {
            catalogModal.open();
            setModalTyupe(false);
          }}
          sx={{ maxWidth: 'max-content' }}
          color="secondary"
        >
          ИЗМЕНИТЬ
        </Button>
      </Stack>
    </>
  );
};
