import { Stack, Typography } from '@mui/material';
import React from 'react';
import * as yup from 'yup';
import { Button } from 'components/button';
import Input from 'components/input';
import { useForgetPasswordMutation } from 'graphql/generated.graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { setPhone } from 'redux-state/features/rediraction';
import { Controller, useForm } from 'react-hook-form';
// @ts-expect-error
import InputMask from 'react-input-mask';
import { AuthRoutes, PageProps } from '../auth-sidebar';
import { useAppDispatch } from 'redux-state/hook';

interface LoginInput {
  phone: string;
}
const schema = yup.object({
  phone: yup.string().min(15).required('Phone number required.'),
});

export const ForgetPassword: React.FC<PageProps> = ({ changeRoute }) => {
  const dispatch = useAppDispatch();
  
  const [mutate] = useForgetPasswordMutation();

  const { control, handleSubmit, setError } = useForm<LoginInput>({
    resolver: yupResolver(schema),
    defaultValues: { phone: '+998' },
  });

  const onSubmit = (data: LoginInput) => {
    
    data.phone = data.phone.replace('(', '').replace(')', '');
    // @ts-expect-error
    dispatch(setPhone({userPhone:data.phone}));
    mutate({
      variables: {
        phone: data.phone,
        url: 'https://gipermart.uz/',
      },
      onCompleted: (res) => {
        const err = res.requestPasswordReset?.errors;
        if (err && err.length) {
          setError('phone', {
            message: err[0].message ? 'Этот номер недоступен' : '',
          });
        }
        else{
           changeRoute(AuthRoutes.CONFIRMCODE)
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack margin="2rem" spacing={2}>
        <Typography width={{ sm: '300px' }}>Номер телефона</Typography>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <InputMask mask="+999(99)9999999" value={value} onChange={onChange}>
              {(inputProps: any) => (
                <Input
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  {...inputProps}
                />
              )}
            </InputMask>
          )}
        />
        <Button type="submit" fullWidth variant="contained">
          Войти
        </Button>
      </Stack>
    </form>
  );
};
