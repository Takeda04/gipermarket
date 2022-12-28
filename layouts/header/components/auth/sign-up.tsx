import { Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import Input from 'components/input';
import React, { useState } from 'react';
import * as yup from 'yup';
// @ts-expect-error
import InputMask from "react-input-mask";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useRegisterMutation } from 'graphql/generated.graphql';
import colors from 'config/theme';
import { AuthRoutes, PagePropsWithPhoneNumber } from './auth-sidebar';

interface LoginInput {
  phone: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName?: string;
}

const schema = yup.object({
  phone: yup
    .string()
    .min(15).required('Требуется номер телефона.'),
  password: yup.string().required('Требуется пароля.'),
  confirmPassword: yup.string().required('Требуется подтверждение пароля.'),
  firstName: yup.string().required("Требуется имя"),
  LastName: yup.string()
});

const SignUp: React.FC<PagePropsWithPhoneNumber> = ({ changeRoute, onPhoneChange }) => {
  const [mutate, { data, loading }] = useRegisterMutation();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { control, handleSubmit } = useForm<LoginInput>({
    resolver: yupResolver(schema),
    defaultValues: { phone: '+998' },
  });

  const onSubmit = (data: LoginInput) => {
    data.phone = data.phone.replace("(", "").replace(")", "")

    mutate({
      variables: data,
      onCompleted: (res) => {
        if (res.accountRegister?.errors.length === 0 && res.accountRegister.user?.phone && onPhoneChange) {
          onPhoneChange(res.accountRegister.user?.phone)
          changeRoute(AuthRoutes.CONFIRMACCOUNT)
        }
      },
      onError: (error) => {
        console.log(error)
        setErrorMessage(error.message)
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack margin="2rem" spacing={2}>
        <Typography textAlign="center" variant="h2">
          Войти или создать профиль
        </Typography>
        <Typography>Номер телефона</Typography>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <InputMask mask="+999(99)9999999" value={value} onChange={onChange}>
              {(inputProps: any) => (
                <Input
                  error={
                    !!errors.phone?.type ||
                    data?.accountRegister?.errors.some((e) => e.field === 'phone')
                  }
                  helperText={
                    errors.phone?.message && 'Телефон должен быть не менее 15 символов' ||
                    data?.accountRegister?.errors
                      .filter((e) => e.field === 'phone')
                      .map((e) => e.message)
                      .join(' ')
                  }
                  {...inputProps}
                />
              )}


            </InputMask>

          )}
        />
        <Typography>Имя</Typography>
        <Controller
          control={control}
          name="firstName"
          render={({ field, formState: { errors } }) => (
            <Input
              error={
                !!errors.firstName?.type ||
                data?.accountRegister?.errors.some(
                  (e) => e.field === 'firstName'
                )
              }
              helperText={
                errors.firstName?.message ||
                data?.accountRegister?.errors
                  .filter((e) => e.field === 'firstName')
                  .map((e) => e.message)
                  .join(' ')
              }
              {...field}
            />
          )}
        />
        <Typography>Фамилия</Typography>
        <Controller
          control={control}
          name="lastName"
          render={({ field, formState: { errors } }) => (
            <Input
              error={
                !!errors.lastName?.type ||
                data?.accountRegister?.errors.some(
                  (e) => e.field === 'lastName'
                )
              }
              helperText={
                errors.lastName?.message ||
                data?.accountRegister?.errors
                  .filter((e) => e.field === 'lastName')
                  .map((e) => e.message)
                  .join(' ')
              }
              {...field}
            />
          )}
        />
        <Typography>Пароль</Typography>

        <Controller
          control={control}
          name="password"
          render={({ field, formState: { errors } }) => (
            <Input
              type="password"
              placeholder="*******"
              error={
                !!errors.password?.type ||
                data?.accountRegister?.errors.some(
                  (e) => e.field === 'password'
                )
              }
              helperText={
                errors.password?.message ||
                data?.accountRegister?.errors
                  .filter((e) => e.field === 'password')
                  .map((e) => e.message)
                  .join(' ')
              }
              {...field}
            />
          )}
        />
        <Typography>Подтвердить Пароль</Typography>

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, formState: { errors } }) => (
            <Input
              type="password"
              placeholder="*******"
              error={
                !!errors.confirmPassword?.type ||
                data?.accountRegister?.errors.some(
                  (e) => e.field === 'password'
                )
              }
              helperText={
                errors.confirmPassword?.message ||
                data?.accountRegister?.errors
                  .filter((e) => e.field === 'password')
                  .map((e) => e.message)
                  .join(' ')
              }
              {...field}
            />
          )}
        />

        <Stack direction="row" justifyContent="end">
          <Button
            variant="text"
            type="button"
            sx={{
              maxWidth: 'max-content',
              color: colors.black,
            }}
          >
            Забыли пароль?
          </Button>
        </Stack>
        <Button loading={loading} type="submit" fullWidth variant="contained">
          Зарегистрироваться
        </Button>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          sx={{ color: colors.black }}
          onClick={() => changeRoute(AuthRoutes.LOGIN)}
        >
          Войти
        </Button>
      </Stack>
    </form>
  );
};

export default SignUp;
