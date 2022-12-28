import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useAppSelector } from 'redux-state/hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import { useCheckTokensMutation } from 'graphql/generated.graphql';
import { setCode } from 'redux-state/features/rediraction';
import { useSetPasswordsMutation } from 'graphql/generated.graphql';
import { Stack, Typography } from '@mui/material';
import { AuthRoutes, PageProps } from '../auth-sidebar';
import Input from 'components/input';
import { useAppDispatch } from 'redux-state/hook';


interface LoginInput {
  code: string;
  newpass:string;
}
const validationSchema = Yup.object().shape({
  code: Yup.string().min(6).max(6).required('code required.'),
});



export const ConfirmCode: React.FC<PageProps> = ({ changeRoute }) => {
  const {userPhone} = useAppSelector((state)=> state.rediraction)
  const [mutate] = useCheckTokensMutation()
  const dispatch = useAppDispatch();


  const onSubmit = (item: LoginInput) => {
    dispatch(setCode({
      userCode: item.code,
      loginPaths: '',
      userPhone: ''
    }));

    mutate({
      variables:{
        phone:userPhone,
        token:item.code,
      },
      onCompleted: (res) => {
        const err = res.checkToken?.errors
        if (err && err.length) {
          setError('code', {
            message: err[0].message ? 'неверный пароль' : '',
          });
        }
        else{
          changeRoute(AuthRoutes.SETPASSWORD)
        }
      },
    })
    
  };


  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setError } = useForm<LoginInput>({
    ...formOptions,
  });
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack margin="2rem" spacing={2}>
        <Typography width={{ sm: '300px' }} mb="12px">
          Подтверждение пароля
        </Typography>
        <Input
          type="text"
          {...register('code')}
          fullWidth
          error={!!errors.code}
          helperText={errors.code?.message}
        />
        <Button
          fullWidth
          sx={{ mt: '20px' }}
          type="submit"
          variant="contained"
        >
          Далее
        </Button>
      </Stack>
    </form>
  );
};
