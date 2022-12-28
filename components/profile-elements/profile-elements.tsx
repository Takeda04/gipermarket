import React from 'react';
import { useAppDispatch } from 'redux-state/hook';
import { Paths } from 'config/site-paths';
import { Button } from 'components/button';
import DataLineWithArrow from 'components/common/datalineWithArrow';
import { useRouter } from 'next/router';
import { ChengeData } from 'components/chenge-user-content';
import { ChengePassword } from 'components/chenge-user-content';
import Close from 'components/icons/close';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { logout } from 'redux-state/features/user-slice';
import { Stack, Typography, Dialog } from '@mui/material';
import { ProfileElementMobile } from './profile-element-mobile';
import { ProfileProps } from './profile.type';

export const ProfileElements: React.FC<ProfileProps> = ({
  logoutClose,
  logoutIsopen,
  logoutOpen,
  data,
  catalogModal,
}) => {
  const [modalType, setModalTyupe] = React.useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const md = useMediaQuery('(max-width:899px)');
  const deleteLogin = () => {
    logoutClose();
    dispatch(logout());
    router.replace(Paths.HOME);
  };
  return (
    <>
      {!md ? (
        <>

          {/* DECKTOP VERSION */}
          <Stack gap="1rem">
            <Typography variant="h2">Персональные данные</Typography>
            <DataLineWithArrow field="ID пользователя" value={data?.me?.id} />
            <DataLineWithArrow
              field="Имя и фамилия"
              value={`${data?.me?.firstName} ${data?.me?.lastName}`}
            />
            <DataLineWithArrow field="Номер телефона" value={data?.me?.phone} />
            {/* <DataLineWithArrow field="Электронная почтa" value="" /> */}
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
            <Typography variant="h2">Пароль</Typography>
            <DataLineWithArrow field="Текущий пароль" value="********" />
            <Stack justifyContent="space-between" direction="row">
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
              <Button
                onClick={() => logoutOpen()}
                sx={{ maxWidth: 'max-content', marginRight: '50px' }}
                color="secondary"
              >
                {t('logOut')}
              </Button>
            </Stack>
          </Stack>
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
            <Stack sx={{ padding: '40px' }} spacing={4}>
              <Typography variant="h2">Chiqishni Hohlaysizmi</Typography>
              <Button onClick={deleteLogin} color="secondary">
                {t('logOut')}
              </Button>
            </Stack>
          </Dialog>
          <Dialog
            sx={{ overflow: 'hidden' }}
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
              <ChengeData modal={catalogModal.close}/>
            ) : (
              <ChengePassword modal={catalogModal.close} />
            )}
          </Dialog>
        </>
      ) : (
        <ProfileElementMobile
          catalogModal={catalogModal}
          data={data}
          logoutClose={logoutClose}
          logoutIsopen={logoutIsopen}
          logoutOpen={logoutOpen}
        />
      )}
    </>
  );
};
// ID пользователя
