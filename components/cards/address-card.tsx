import React from 'react';
import Trash from 'components/icons/trash';
import EditIcon from 'components/icons/edit';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useModal } from 'hooks/use-modal';
import { useMediaQuery } from '@mui/material';
import { useDeleteAddressMutation } from 'graphql/generated.graphql';
import { useUserAddressDeleteMutation } from 'graphql/generated.graphql';
import { Typography, Grid, Stack, Dialog } from '@mui/material';
import { AddressCreate } from 'components/address-items';
import colors from 'config/theme';

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string | null | undefined;
  streetAddress1: string;
  streetAddress2: string;
  postalCode: string;
  country: {
    _typename?: 'CountryDisplay' | undefined;
    code: string;
    country: string;
  };
}


interface AddressProps {
  onClick?: () => void;
  isActive?: boolean;
  isCheckoutPage?: boolean;
  data: Address | null
  backdrop: {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }
}

export const AddresCard: React.FC<AddressProps> = ({ data, backdrop, isCheckoutPage, isActive, onClick }) => {
  const [mutation, mutationData] = useUserAddressDeleteMutation();
  const editModal = useModal();
  const { t } = useTranslation();
  const md = useMediaQuery('(max-width:899px)');

  const deleteCard = () => {
    if (data?.id) {
      backdrop.open()
      mutation({
        variables: {
          id: data?.id
        },
        refetchQueries: ['AddressList'],
        onCompleted: () => {
          backdrop.close()
        }
      })
    }

  }

  return (
    <Grid item xs={(isCheckoutPage || md) ? 12 : 6}>
      <Dialog open={editModal.isOpen} onClose={editModal.close}>
        <AddressCreate
          data={data}
          backdrop={backdrop}
          modalClose={editModal.close}
        />
      </Dialog>
      <Stack
        onClick={onClick}
        spacing={2}
        sx={{
          border: `3px solid ${isActive ? colors.primary.hover: '#e5e5e5'}`,
          padding: '20px',
          position: 'relative',
        }}
      >
        <Stack
          alignItems="center"
          direction={'row'}
          sx={{ position: 'absolute', right: '10px', top: '10px' }}
        >
          <IconButton
            onClick={() => editModal.open()}
            sx={{ width: '40px', height: '40px' }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={deleteCard}
            sx={{ width: '45px', height: '45px' }}
          >
            <Trash />
          </IconButton>
        </Stack>
        <Typography
          gap={3}
          alignItems={'center'}
          display={'flex'}
          variant="body1"
        >
          <Typography variant="h6">{t('name')}</Typography>
          {data?.firstName}
        </Typography>
        <Typography
          gap={3}
          alignItems={'center'}
          display={'flex'}
          variant="body1"
        >
          <Typography variant="h6">{t('phone2')}</Typography>
          {data?.phone}
        </Typography>
        <Typography
          gap={3}
          alignItems={'center'}
          display={'flex'}
          variant="body1"
        >
          <Typography variant="h6">{t('address')}</Typography>
          {data?.streetAddress1}
        </Typography>
      </Stack>
    </Grid>
  );
}
