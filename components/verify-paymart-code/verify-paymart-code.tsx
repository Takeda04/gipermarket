import React from 'react';
import * as Yup from 'yup';
import { useAppSelector, useAppDispatch } from 'redux-state/hook';
import { clearCart } from 'redux-state/features/cart-slice';
import { changeUser } from 'redux-state/features/paymart-slice';
import { clearPaymartCart } from 'redux-state/features/paymart-cart';
import Input from 'components/input/input';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import { Typography } from '@mui/material';

interface Props {
  close: () => void;
}

interface LoginInput {
  code: string;
}
const validationSchema = Yup.object().shape({
  code: Yup
    .string()
    .max(15)
    .required('code required.'),
});

export const VerifyPaymartCode: React.FC<Props> = ({ close }) => {
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setError } = useForm<LoginInput>({ ...formOptions });
  const { contractId, phone } = useAppSelector((state) => state.paymart)
  const { errors } = formState;
  const [loder, setLoder] = React.useState(false);
  const router = useRouter()
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (Object.keys(errors).length) {
      setLoder(false)
    }
  }, [])

  const onSubmit = (item: LoginInput) => {
    fetch("https://api.gipermart.uz/paymart/check-user-sms/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ contract_id: contractId, phone, code: item.code }),
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        if (result.result.status === 1) {
          dispatch(clearCart());
          dispatch(clearPaymartCart());
          dispatch(changeUser({user:true}));
          router.replace('/');
          close()
        }
        if (result.error) {
          setError("code",
            {
              type: "focus",
              message: result.error
            },
          );
        }
        setLoder(false)
      })
      .catch(error => {
        console.log(error);

      });

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '20px', width: '300px' }}>
      <Typography mb='12px' variant='h2'>Подтверждение пароля</Typography>
      <Input
        type='text'
        {...register('code')}
        fullWidth
        error={!!errors.code?.type}
        helperText={errors.code?.message}
      />
      <Button loading={loder} onClick={() => setLoder(true)} fullWidth sx={{ mt: '20px' }} type='submit' variant='contained'>Далее</Button>
    </form>
  )
}
