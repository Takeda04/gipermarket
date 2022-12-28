import React from 'react';
import Input from 'components/input/input';
import { Button } from 'components/button';
import { Typography, Stack, } from '@mui/material';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useUserAddressCreateMutation } from 'graphql/generated.graphql';
import { CountryCode } from 'graphql/generated.graphql';
import { useUserAddressUpdateMutation } from 'graphql/generated.graphql';
import { AddressFormStyle } from './address-create-style';
import { useAppSelector } from 'redux-state/hook';


interface AddressProp {
  modalClose: () => void
  backdrop?: {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }
  data?: {
    id: string;
    firstName: string;
    lastName: string;
    phone?: string | null | undefined;
    streetAddress1: string;
    streetAddress2: string;
    postalCode: string;
    country: {
      _typename?: "CountryDisplay" | undefined;
      code: string;
      country: string;
    };
  } | null

}

export const AddressCreate: React.FC<AddressProp> = ({ modalClose, backdrop, data }) => {
  const [createAddres] = useUserAddressCreateMutation();
  const { user } = useAppSelector((state) => state.user);
  const [updeteAdderss, dataUpdateAddress] = useUserAddressUpdateMutation();

  const { t } = useTranslation()
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .max(60),
    phone: Yup.string()
      .matches(/(?:\+\998(9[012345789]|6[125679]|7[01234569])[0-9]{7})$/, 'Phone number is invalid')
      .required('Phone number required.'),
    address: Yup.string()
      .required('Address is required'),
    city: Yup.string()
      .required('City is required')
      .max(60),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data: any) => {
   

    if (user.userId) {
      reset();
      backdrop?.open()
      createAddres({
        variables:{
          input:{
            city:data.city,
            firstName: data.name,
            phone: data.phone,
            streetAddress1: data.address,
            country: CountryCode.Uz,
          }
        },
        refetchQueries:['AddressList'],
        onCompleted: () => {
          backdrop?.close()
        }
      })
   
      modalClose();
      return false;
    }
  }
  const onEdit = (element: any) => {
    if (data?.id) {
      reset();
      backdrop?.open()
      updeteAdderss({
        variables: {
          id: data?.id,
          input: {
            city: element.city,
            firstName: element.name,
            phone: element.phone,
            streetAddress1: element.address,
            country: CountryCode.Uz,
          }
        },
        refetchQueries: ['AddressList'],
        onCompleted: () => {
          backdrop?.close()
        }
      })
    }
    modalClose();
    return false;
  }
  return (
    <AddressFormStyle onSubmit={data ? handleSubmit(onEdit) : handleSubmit(onSubmit)}>

      <Typography mb={2} variant='h2'>{data ? t('editAddress') : t('createAddress')}</Typography>
      <Stack spacing={1.7}>
        <label>{t('name')}</label>
        <Input
          type='text'
          {...register('name')}
          error={!!errors.name?.type}
          helperText={errors.name?.message}
          defaultValue={data ? data.firstName : ''}
        />
        <label>{t('phone')}</label>
        <Input
          type='text'
          {...register('phone')}
          error={!!errors.phone?.type}
          helperText={errors.phone?.message}
          defaultValue={data?.phone ? data.phone : ''}
        />
        <label>{t('address')}</label>
        <Input
          type='text'
          {...register('address')}
          error={!!errors.address?.type}
          helperText={errors.address?.message}
          defaultValue={data ? data.streetAddress1 : ''}
        />
        <label>{t('city')}</label>
        <Input
          type='text'
          {...register('city')}
          error={!!errors.city?.type}
          helperText={errors.city?.message}
          defaultValue={data ? CountryCode.Uz : ''}
        />
        <Button variant='contained'>{data ? t('update') : t('add')}</Button>
      </Stack>
    </AddressFormStyle>

  )
}
