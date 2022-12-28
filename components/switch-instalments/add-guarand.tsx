import React from 'react';
import * as Yup from 'yup';
import Input from 'components/input/input';
// @ts-expect-error
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form";
import { useAppSelector } from 'redux-state/hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import { Typography } from '@mui/material';

interface Props {
  close: () => void;
  setUserIdefy: React.Dispatch<React.SetStateAction<boolean>>;
  setStepActive: React.Dispatch<React.SetStateAction<number>>;
}

interface LoginInput {
  name: string;
  phone: string;
  name2: string;
  phone2: string;
}
const validationSchema = Yup.object().shape({
  name: Yup
    .string()
    .required('name required.'),
  phone: Yup.string().required('phone is required'),
  name2: Yup
    .string()
    .required('name required.'),
  phone2: Yup.string().required('phone is required'),
});



const AddGuarand: React.FC<Props> = ({ close, setStepActive, setUserIdefy }) => {

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, control, formState } = useForm<LoginInput>({ ...formOptions, defaultValues: { phone: '+998', phone2: '+998' } });
  const { errors } = formState;
  const [loder, setLoder] = React.useState(false);
  const { buyerId } = useAppSelector((state) => state.paymart)
  const onSubmit = (item: LoginInput) => {

    const userPhone = item.phone.replace(/\s/g, '');
    const userPhone2 = item.phone2.replace(/\s/g, '');

    fetch("https://api.gipermart.uz/paymart/add-guarant/", {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone: userPhone, name: item.name, buyer_id: buyerId }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          fetch("https://api.gipermart.uz/paymart/add-guarant/", {
            method: 'POST',
            redirect: 'follow',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone: userPhone2, name: item.name2, buyer_id: buyerId }),
          }).then(response => response.json())
            .then(result => {
              console.log(result);
              setStepActive(0)
              setUserIdefy(false)
              setLoder(false);
              close()
            }).catch(error => {
              console.log('error', error)
            });
        }
      })
      .catch(error => {
        console.log('error', error)
      });

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography mb='12px' variant='subtitle2' fontWeight={600}>Введите дополнительных номера телефонов своих родственников или близких</Typography>
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
      <Typography mt='12px' mb='12px'>Имя</Typography>
      <Input
        type='text'
        {...register('name')}
        fullWidth
        error={!!errors.name?.type}
        helperText={errors.name?.message}
      />
      <Typography mt='12px' mb='12px'>Мобилный номер</Typography>

      <Controller
        control={control}
        name="phone2"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <InputMask mask="+999 99 999 99 99" value={value} onChange={onChange}>
            {(inputProps: any) => (
              <Input
                fullWidth
                error={!!errors.phone2?.type}
                helperText={errors.phone2?.message}
                {...inputProps}
              />
            )}

          </InputMask>

        )}
      />
      <Typography mt='12px' mb='12px'>Имя</Typography>
      <Input
        type='text'
        {...register('name2')}
        fullWidth
        error={!!errors.name2?.type}
        helperText={errors.name2?.message}
      />
      <Button loading={loder} onClick={() => setLoder(true)} sx={{ mt: '20px' }} type='submit' fullWidth variant='contained'>Далее</Button>
    </form>
  )
}

export default AddGuarand;