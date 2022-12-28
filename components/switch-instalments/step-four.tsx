import { Typography } from '@mui/material';
import React from 'react';
import * as Yup from 'yup';
// @ts-expect-error
import InputMask from "react-input-mask";
import { useAppSelector, useAppDispatch } from 'redux-state/hook';
import { Button } from 'components/button';
import { addPaymartStatus } from 'redux-state/features/paymart-slice';
import { detailCard } from 'redux-state/features/paymart-slice';
import { addHashCode, addBuyerId } from 'redux-state/features/paymart-slice';
import Input from 'components/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

interface Props {
  setStepActive: React.Dispatch<React.SetStateAction<number>>;
  idf?: boolean;
}

interface LoginInput {
  card: string;
  validty: string;
}

const validationSchema = Yup.object().shape({
  card: Yup
    .string()
    .min(19)
    .required('Phone number required.'),
  validty: Yup
    .string()
    .min(5)
    .required('Срок действия карты не введен'),

});


const StepFour: React.FC<Props> = ({ setStepActive }) => {

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, control, handleSubmit, setError, formState } = useForm<LoginInput>({ ...formOptions });
  const { errors } = formState;
  const [loder, setLoder] = React.useState(false);
  const { phone, step } = useAppSelector((state) => state.paymart);
  const dispatch = useAppDispatch()

  const onSubmit = (item: LoginInput) => {
    const userCard = item.card.replace(/\s/g, '');

    fetch("https://api.gipermart.uz/paymart/add-card/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone, card: userCard, exp: item.validty }),
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 'error') {
          if (result.info === 'error_card_scoring') {
            setError("card",
              {
                type: "focus",
                message: result.info === 'error_card_scoring' ? 'карта не прошла скоринг' : result.info
              },
            );
          }
          if (result.info === 'erro_phone_not_equal') {
            setError("card",
              {
                type: "focus",
                message: 'номер телефона, на который подключена смс инфо карты, не совпадает с номером клиента в системе Paymart'
              },
            );
          }

        }
        if (result.status === 'error_card_scoring') {
          setError("card",
            {
              type: "focus",
              message: result.status
            },
          );
        }
        if (result.status === 'success') {
          dispatch(detailCard({ card: { exp: item.validty, number: userCard } }));
          if (result.hash) {
            dispatch(addHashCode({ hash: result.hash }))
          }
          if (step === 1) {
            dispatch(addPaymartStatus({ step: 0 }))
          }
          setStepActive(3)

        }
        setLoder(false)
      })
      .catch(error => {
        console.log('error', error)
      });

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography mb='12px' variant='h2'>Данные о карте</Typography>
      <Typography mb='12px'>Номер карты</Typography>
      <Controller
        control={control}
        name="card"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <InputMask mask="9999 9999 9999 9999" maskChar={null} value={value} onChange={onChange}>
            {(inputProps: any) => (
              <Input
                fullWidth
                placeholder='0000 0000 0000 0000'
                error={!!errors.card?.type}
                helperText={errors.card?.message}
                {...inputProps}
              />
            )}

          </InputMask>

        )}
      />
      <Typography mt='24px' mb='12px'>Срок действия</Typography>
      <Controller
        control={control}
        name="validty"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <InputMask mask="99/99" maskChar={null} value={value} onChange={onChange}>
            {(inputProps: any) => (
              <Input
                fullWidth
                placeholder='00/00'
                error={!!errors.validty?.type}
                helperText={errors.validty?.message}
                {...inputProps}
              />
            )}

          </InputMask>

        )}
      />
      <Button loading={loder} onClick={() => setLoder(true)} sx={{ mt: '20px' }} type='submit' fullWidth variant='contained'>Далее</Button>

    </form>

  )
}

export default StepFour;