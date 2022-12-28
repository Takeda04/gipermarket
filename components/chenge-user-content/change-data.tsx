import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormStyle } from './styles';
import Input from 'components/input/input';
import { Stack } from '@mui/material';
import { Button } from 'components/button';
import { useMeQuery } from 'graphql/generated.graphql';
import { useAccountUpdateMutation } from 'graphql/generated.graphql';
import { useTranslation } from 'react-i18next';

interface Props {
  modal?:()=> void;
}

export const ChengeData: React.FC<Props> = ({modal}) => {
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    lastName: Yup.string()
      .max(50)
      .required('Name is required'),
    name: Yup.string()
      .max(50)
      .required('Name is required'),

  });
  const [updateAccount] = useAccountUpdateMutation()
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const { data, loading } = useMeQuery();

  function onSubmit(data: any) {
    updateAccount({
      variables:{
        input:{
          firstName:data.name,
          lastName:data.lastName
        }
      }
    })
    if(modal){
      modal()
    }
  }
  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <label>{t('name')}</label>
        <Input
          error={!!errors.name?.type}
          helperText={errors.name?.message}
          type="text" {...register('name')}
          defaultValue={data?.me?.firstName}
        />
        <label>фамилия</label>
        <Input
          type='text'
          {...register('lastName')}
          error={!!errors.lastName?.type}
          helperText={errors.lastName?.message}
          defaultValue={data?.me?.lastName}
        />
        <Button variant='contained' type="submit">{t('change')}</Button>
      </Stack>
    </FormStyle>
  )
}
