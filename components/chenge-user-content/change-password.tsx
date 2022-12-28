import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { FormStyle } from './styles';
import Input from 'components/input/input';
import { Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import { useChangePasswordMutation } from 'graphql/generated.graphql';

interface ChengePasswordProp {
  modal: () => void
}


export const ChengePassword: React.FC<ChengePasswordProp> = ({ modal }) => {
  const [changePassword, { loading, error: passwordChangeError }] = useChangePasswordMutation();

  const { t } = useTranslation()

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    lastPassword: Yup.string()
      .required('last Password is required')
      .min(8, 'Password must be at least 8 characters'),

  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, setError, formState } = useForm(formOptions);
  const { errors } = formState;


  function onSubmit(data: any) {
    changePassword(
      {
        variables: {
          oldPassword: data.lastPassword,
          newPassword: data.password,
        },
        onCompleted: (res) => {
          if (res.passwordChange?.errors.length) {
            setError("lastPassword",{
              message:res.passwordChange.errors[0].message || '',
              type:'setValueAs'
            })
          }
          else {
            reset()
            modal()
          }

        },
      }
    )


    return false;
  }
  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography sx={{ color: 'red' }} variant='body1'>{passwordChangeError?.message}</Typography>
        <label>{t('lastPassword')}</label>
        <Input
          type='password'
          {...register('lastPassword')}
          error={!!errors.lastPassword?.type}
          helperText={errors.lastPassword?.message}
        />
        <label>{t("password")}</label>
        <Input
          error={!!errors.password?.type}
          helperText={errors.password?.message}
          type="password" {...register('password')}
        />
        <label>{t("confirmPassword")}</label>
        <Input
          error={!!errors.confirmPassword?.type}
          helperText={errors.confirmPassword?.message}
          type="password"
          {...register('confirmPassword')}
        />
        <Button variant='contained' type="submit">{t('change')}</Button>
      </Stack>
    </FormStyle>
  )
}
