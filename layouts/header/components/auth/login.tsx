import { Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import Input from 'components/input';
import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { Paths } from 'config/site-paths';
import { Controller, useForm } from 'react-hook-form';
import { useLoginMutation } from 'graphql/generated.graphql';
import { setSpecialOrder } from 'redux-state/features/rediraction';
import { useAppDispatch, useAppSelector} from 'redux-state/hook';
import { login } from 'redux-state/features/user-slice';
// @ts-expect-error
import InputMask from "react-input-mask";
import colors from 'config/theme';
import { AuthRoutes, PageProps } from './auth-sidebar';

interface LoginInput {
  phone: string;
  password: string;
}

const schema = yup.object({
  phone: yup
    .string()
    .min(15)
    .required('Требуется номер телефона.'),
  password: yup.string().required('Требуется пароль.'),
});

const Login: React.FC<PageProps> = ({ changeRoute }) => {
  const [mutate, { data, loading }] = useLoginMutation();
  const router = useRouter()
  const {userSpecialOrder} = useAppSelector((state)=> state.rediraction)
  const { control, handleSubmit } = useForm<LoginInput>({
    resolver: yupResolver(schema),
    defaultValues: { phone: '+998' },
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  

  const onSubmit = (data: LoginInput) => {
    data.phone = data.phone.replace("(","").replace(")","")
  
    mutate({
      variables: data,
      onCompleted: (res) => {
        // console.log(res?.tokenCreate?.errors[0].message)
        if(res?.tokenCreate?.errors[0]?.message){
            setErrorMessage("Не правильный логин или пароль")
        }
        if (res.tokenCreate?.errors.length === 0 && res.tokenCreate.token) {
          dispatch(
            login({
              token: res.tokenCreate.token,
              refreshToken: res.tokenCreate.refreshToken,
              csrfToken: res.tokenCreate.csrfToken,
              userId: res.tokenCreate.user?.id,
              phone: data.phone,
            })
          );
          // /////////
        }
        if(userSpecialOrder){
          router.push(Paths.SPECIAL_ORDER);
          dispatch(setSpecialOrder({
            userSpecialOrder:false,
            userPhone: '',
            userCode:'',
          }));
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack margin="2rem" spacing={2}>
        <Typography textAlign="center" variant="h2">Войти или создать профиль</Typography>
        <Typography>Номер телефона</Typography>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <InputMask mask="+999(99)9999999" value={value} onChange={onChange}>
              {(inputProps:any) => (
                <Input
                  error={
                    !!errors.phone?.type ||
                    data?.tokenCreate?.errors.some((e) => e.field === 'phone' || !!errorMessage)
                  }
                  helperText={
                    errors.phone?.message ? "Не правильный логин или пароль" : "" ||
                    errorMessage

                    // data?.tokenCreate?.errors
                    //   .filter((e) => e.field === 'phone')
                    //   .map((e) => e.message)
                    //   .join(' ')
                  }
                  {...inputProps}
                />
              )}

            </InputMask>

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
                data?.tokenCreate?.errors.some((e) => e.field === 'password' || !!errorMessage)
              }
              helperText={
                errors.password?.message ||
                data?.tokenCreate?.errors
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
            onClick={() => changeRoute(AuthRoutes.FORGETPASSWORD)}
            sx={{
              maxWidth: 'max-content',
              color: colors.black,
            }}
          >
            Забыли пароль?
          </Button>
        </Stack>
        <Button loading={loading} type="submit" fullWidth variant="contained">
          Войти
        </Button>
        <Button
          onClick={() => changeRoute(AuthRoutes.SIGNUP)}
          type="button"
          fullWidth
          variant="outlined"
          sx={{ color: colors.black }}
        >
          Зарегистрироваться
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
