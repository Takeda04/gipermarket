import { NextPage } from 'next';
import { Main } from 'layouts/main';
import React from 'react'
import { PaymartLimit } from 'components/add-to-card/paymart-limit';
import styled from 'styled-components';
import { useModal } from 'hooks/use-modal';
import * as Yup from 'yup';
import { VerifyPaymartCode } from 'components/verify-paymart-code/verify-paymart-code';
import { useForm } from "react-hook-form";
import { addContractId } from 'redux-state/features/paymart-slice';
import formatter from 'utils/currencyFormatter';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { clearPaymartCart } from 'redux-state/features/paymart-cart';
import { clearCart } from 'redux-state/features/cart-slice';
import { countrySource } from 'utils/Country-data';
import Select from 'components/select/select';
import { useAppSelector, useAppDispatch } from 'redux-state/hook';
import { InstalmentsCard } from 'components/cards/instalments-card';
import { Button } from 'components/button';
import { priceLimitHandler, totalPriceSeting } from 'redux-state/features/paymart-cart';
import { Container, Typography, Grid, Stack, MenuItem, Dialog } from '@mui/material';
import Input from 'components/input';

const CartBlock = styled.div`
  max-height:400px;
  box-shadow: 0 15px 24px rgb(0 0 0 / 5%), 0 0 9px rgb(0 0 0 / 5%) ;
  border-radius: 8px;
  width: 400px;
  position: absolute;
  right: 50px;
  top: 238px;
  @media (max-width:1326px){
    position: static;
    margin-top: 20px;
  }
`
const FormBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  gap: 20px;
  @media (max-width:899px){
    grid-template-columns: 1fr;
  }
`
interface TypeForm {
  address: string;
  city: string;
  country: string;
}

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Укажите адрес !'),
  city: Yup.string().required('Укажите Город/район !'),
  country: Yup.string().required('Укажите страну !'),
});

const InstalmentsCheckout: NextPage = () => {
  const { totalPrice, limit, products, productCount } = useAppSelector((state) => state.paymartCart);
  const { currency } = useAppSelector((state) => state.cart);
  const { userId } = useAppSelector((state) => state.user.user)
  const { phone } = useAppSelector((state) => state.paymart);
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { close, isOpen, open } = useModal()
  const [errorMes, setErrorMes] = React.useState('');


  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm<TypeForm>(formOptions);
  const { errors } = formState;
  const [region, setRegion] = React.useState<number>(0)

  React.useEffect(() => {
    dispatch(priceLimitHandler());
    dispatch(totalPriceSeting());
    if (!phone) {
      dispatch(clearCart())
      dispatch(clearPaymartCart());
      router.replace('/')
    }
  }, [limit])

  const onSubmit = (item: TypeForm) => {
    const currentAddress = item.address + '/' + item.country + '/' + item.city; 
    fetch("https://api.gipermart.uz/paymart/add-contract/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ buyer_phone: phone, total_price:totalPrice,total_count:productCount,limit, user_id: userId, address: currentAddress, products, payment_date: 10 }),
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          setErrorMes(result.error)
        }
        if (result.status === 1) {
          dispatch(addContractId({ contractId: result.paymart_client.contract_id }))
          open()
        }
      })
      .catch(error => {
        console.log('error', error)
      });

  }

  return (
    <Main>
      <Dialog open={isOpen} onClose={close}>
        <VerifyPaymartCode close={close} />
      </Dialog>
      <Container maxWidth='xl'>
        <Typography variant='h2' mt='15px' mb='20px' fontWeight={600}>Товар</Typography>
        <Grid spacing={2} container>
          <Grid lg={8} md={8} xs={12} item>
            <Stack border='1px solid #e0e0e0' borderRadius='8px' pb='12px'>
              <Stack p='12px 24px 12px 12px'>
                {products.map((item) => (
                  <InstalmentsCard {...item} />
                ))}
              </Stack>
            </Stack>

          </Grid>
          <Grid lg={4} md={4} xs={12} item >

          </Grid>
        </Grid>
        <Typography variant='h2' mb='10px' fontWeight={600} mt='40px'>Срок рассрочки</Typography>
        <Stack maxWidth='400px'>
          <PaymartLimit />
          <Typography sx={{ color: 'red' }}>{errorMes}</Typography>
        </Stack>

        <Stack >
          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '30px' }}>
            <FormBlock>
              <Stack>
                <Typography>Регион/область*</Typography>
                <Select
                  fullWidth
                  {...register('city')}
                  error={!!errors.city?.type}
                  helperText={errors.city?.message}
                >
                  {countrySource.country.map((i) => (
                    <MenuItem onClick={() => setRegion(i.id)} key={i.name} value={i.name}>{i.name}</MenuItem>
                  ))}

                </Select>
                
                <Typography mt='12px'>Адрес*</Typography>
                <Input
                  type='text'
                  {...register('address')}
                  fullWidth
                  error={!!errors.address?.type}
                  helperText={errors.address?.message}
                />
              </Stack>

              <Stack>
                <Typography>Город/район*</Typography>
                <Select
                  fullWidth
                  {...register('country')}
                  error={!!errors.country?.type}
                  helperText={errors.country?.message}

                >
                  {
                    // @ts-expect-error
                    countrySource[region] &&
                    // @ts-expect-error
                    countrySource[region].map((i) => (
                      <MenuItem key={i.name} value={i.name}>{i.name}</MenuItem>
                    ))}

                </Select>
              </Stack>

            </FormBlock>
            <CartBlock >
              <Typography variant='h2' borderBottom='1px solid #e0e0e0' fontWeight={600} p='12px 20px'>Корзина</Typography>
              <Stack p='12px 20px' borderBottom='1px solid #e0e0e0'>
                <Stack mb='30px' direction='row' alignItems='center' justifyContent='space-between'>
                  <Typography variant='subtitle2'>{productCount} товар на сумму</Typography>
                  <Typography variant='subtitle2'>{formatter(totalPrice)} {currency} в месяц</Typography>
                </Stack>
                <Typography mb='10px'>Дотсавка по Ташкенту БЕСПЛАТНO</Typography>
                <Typography>Доставка по облостям в зависимости от габаритов будет стоить от 35 000 сум до 110 000 сум</Typography>
              </Stack>
              <Button type='submit' fullWidth variant='contained'>Подтвердить заказ</Button>
            </CartBlock>
          </form>
        </Stack>
      </Container>
    </Main>
  )
}

export default InstalmentsCheckout;