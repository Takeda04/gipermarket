import React from 'react';
import * as Yup from 'yup';
import Input from 'components/input/input';
import { useAppDispatch } from 'redux-state/hook';
import { addItemPaymart } from 'redux-state/features/paymart-slice';
// @ts-expect-error
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import { Typography } from '@mui/material';


interface Props {
  setStepActive: React.Dispatch<React.SetStateAction<number>>;
}

interface LoginInput {
  phone: string;
}

const validationSchema = Yup.object().shape({
  phone: Yup
    .string()
    .min(15)
    .required('Phone number required.'),
});

const StepOne: React.FC<Props> = ({ setStepActive }) => {

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { control, handleSubmit, formState } = useForm<LoginInput>({ ...formOptions, defaultValues: { phone: '+998' } });
  const [loder, setLoder] = React.useState(false);
  const { errors } = formState;
  const dispatch = useAppDispatch()
  const onSubmit = (item: LoginInput) => {

    const userPhone = item.phone.replace(/\s/g, '');

    fetch("https://api.gipermart.uz/paymart/send-sms-code/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone: userPhone }),
      redirect: 'follow'
    })
      .then(response => response.json())
      .then((result) => {
        if (result.status === 'success') {
          dispatch(addItemPaymart({ hash: result.hash, phone: userPhone }))
          setStepActive(1)
        }
        if(result.user_status === 5){
          dispatch(addItemPaymart({ hash: result.hash, phone: userPhone }))
          setStepActive(4)
        }
        setLoder(false)
      })
      .catch((error) => {
        console.log(error.message);

      });

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography mb='20px' variant='subtitle2' fontWeight={500}>Номер не найден! Пройдите регистарцию</Typography>
      <Typography mb='12px'>Мобилный номер</Typography>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <InputMask mask="+999 99 999 99 99" value={value} onChange={onChange}>
            {(inputProps: any) => (
              <Input
                fullWidth
                error={!!errors.phone?.type}
                helperText={errors.phone?.message}
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

export default StepOne;