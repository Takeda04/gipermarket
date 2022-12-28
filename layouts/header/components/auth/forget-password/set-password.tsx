import React from 'react';
import { AuthRoutes,PageProps } from '../auth-sidebar';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import Input from 'components/input/input';
import { Button, Stack, Typography } from '@mui/material';
import { useSetPasswordsMutation } from 'graphql/generated.graphql';
import { useAppSelector } from 'redux-state/hook';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),

});

interface InputType {
  password: string;
  confirmPassword: string
}

export const SetPassword: React.FC<PageProps> = ({ changeRoute }) => {

  const formOptions = { resolver: yupResolver(validationSchema) };
  const {userCode} = useAppSelector((state)=> state.rediraction)
  const {userPhone} = useAppSelector((state)=> state.rediraction)
  const [mutate] = useSetPasswordsMutation()


  const { register, handleSubmit, reset, setError, formState } = useForm<InputType>(formOptions);
  const { errors } = formState;

  const onSubmit = (item: InputType) => {
    mutate({
      variables:{
        password:item.password,
        phone:userPhone,
        token:userCode,
      },
      onCompleted: (res) => {
        const err = res.setPassword?.errors
        if (err && err.length) {
          setError('password', {
            message: err[0].message ? 'неверный пароль' : '',
          });
        }
        else{
           changeRoute(AuthRoutes.LOGIN)
        }
      },
    })
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack margin='2rem' spacing={2}>
        <Typography width={{ sm: '300px' }}>Пароль</Typography>
        <Input
          error={!!errors.password?.type}
          helperText={errors.password?.message}
          type="password" {...register('password')}
        />
        <Typography>Подтвердить Пароль</Typography>
        <Input
          error={!!errors.confirmPassword?.type}
          helperText={errors.confirmPassword?.message}
          type="password"
          {...register('confirmPassword')}
        />
        <Button variant='contained' type="submit">Войти</Button>
      </Stack>

    </form>
  )
}
