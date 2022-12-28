import React from 'react';
import * as Yup from 'yup';
import { useAppSelector, useAppDispatch } from 'redux-state/hook';
import { addBuyerId } from 'redux-state/features/paymart-slice';
import Input from 'components/input/input';
import { addAcsessToken } from 'redux-state/features/paymart-slice';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import { Typography } from '@mui/material';

interface Props {
  setStepActive: React.Dispatch<React.SetStateAction<number>>;
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

const VerfyCardNumber: React.FC<Props> = ({ setStepActive }) => {

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setError } = useForm<LoginInput>({ ...formOptions });
  const { errors } = formState;
  const { hash, phone, card, buyerId } = useAppSelector((state) => state.paymart);
  const [loder, setLoder] = React.useState(false);

  const dispatch = useAppDispatch();

  const onSubmit = (item: LoginInput) => {

    const { code } = item;

    fetch("https://api.gipermart.uz/paymart/check-add-card/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone, code,
        buyer_id: buyerId, hashedCode: hash,
        card_number: card?.number, card_valid_date: card?.exp
      }),
      redirect: 'follow'
    })
      .then(response => response.json())
      .then((result) => {
        if (result.status === 'error') {
          setError("code",
            {
              type: "focus",
              message: result.response.message[0].text
            },
          );
        }
        else {
          setStepActive(4);
          setLoder(false)
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography mb='12px'>Подтверждение пароля</Typography>
      <Input
        type='text'
        {...register('code')}
        fullWidth
        error={!!errors.code?.type}
        helperText={errors.code?.message}
      />
      <Button loading={loder} onClick={() => setLoder(true)} sx={{ mt: '20px' }} type='submit' fullWidth variant='contained'>Далее</Button>
    </form>
  )
}

export default VerfyCardNumber;