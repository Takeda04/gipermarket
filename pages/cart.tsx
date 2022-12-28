import { Container, Grid, Stack, Typography, Dialog, IconButton, Stepper, Step, StepLabel, colors, Modal } from '@mui/material';
import { Button } from 'components/button';
import Input from 'components/input/input';
import React from 'react';
import * as Yup from 'yup';
// @ts-expect-error
import InputMask from "react-input-mask";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useModal } from 'hooks/use-modal';
import { SwitchInstalments } from 'components/switch-instalments';
import Close from 'components/icons/close';
import formatter from 'utils/currencyFormatter';
import { CartItem, CartSummary } from 'components/cart-item';
import { LinkButton } from 'components/common/link';
import { Paths } from 'config/site-paths';
import { useRouter } from 'next/router';
import { changeUser } from 'redux-state/features/paymart-slice';
import { useAppDispatch } from 'redux-state/hook';
import { addPaymartStatus, addPhone, addBuyerId } from 'redux-state/features/paymart-slice';
import { totalPriceSeting, filterProducts } from 'redux-state/features/paymart-cart';
import { Main } from 'layouts/main';
import { NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux-state/hook';

import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const stepLable = [1, 2, 3, 4, 5, 6]
interface LoginInput {
  phone: string;
}
const validationSchema = Yup.object().shape({
  phone: Yup
    .string()
    .min(15)
    .required('Phone number required.'),
});


const Cart: NextPage = () => {
  const { t } = useTranslation();
  const { cartProducts = [], productsCount, currency } = useAppSelector((state) => state.cart);
  const { totalPrice, productCount, limit } = useAppSelector((state) => state.paymartCart)
  // ////////////
  const [stepActive, setStepActive] = React.useState(0)
  const [userIdefy, setUserIdefy] = React.useState(false);
  const { close, isOpen, open } = useModal();
  const {step} = useAppSelector((state)=> state.paymart)
  const { close: numberClose, isOpen: numberisOpen, open: numberOpen } = useModal();

  const [loder, setLoder] = React.useState(false);


  const router = useRouter()
  const dispatch = useAppDispatch();
  const closeModalOption = () => {
    setUserIdefy(false)
    close()
  }
  dispatch(totalPriceSeting())
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { control, handleSubmit, formState } = useForm<LoginInput>({ ...formOptions, defaultValues: { phone: '+998' } });
  const { errors } = formState;
  const { isAuthenticated } = useAppSelector((state) => state.user)


  React.useEffect(() => {
    dispatch(filterProducts())
  }, [productCount])

  const onSubmit = (item: LoginInput) => {

    const userPhone = item.phone.replace(/\s/g, '');
    dispatch(addPhone({ phone: userPhone }))
    fetch("https://api.gipermart.uz/paymart/phone-verify/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone: userPhone }),
      redirect: 'follow'
    })
      .then(response => response.json())
      .then((respons) => {
        if (respons.result === 4) {
          close();
          router.push('/instalments-checkout')
        }
        if(respons.result === 2){
          toast("Ваше зайвлянеие отправлено на проверку", {
            type: "warning" as TypeOptions
          });
          setUserIdefy(false);
          close();
          setLoder(false)
          return
        }
        if(respons.result === 8){
          toast("Ваш номер заблокирован в системе Paymart", {
            type: "error" as TypeOptions
          });
          setUserIdefy(false);
          close();
          setLoder(false)
          return
        }
        if (respons.result) {
          dispatch(addPaymartStatus({ step: respons.result }));
          setUserIdefy(true);
        }
        if(respons.status === 'error'){
          setUserIdefy(false);
        }
        else {
          dispatch(addPaymartStatus({ step: 0 }));
          setUserIdefy(true);
        }
        dispatch(addBuyerId({ buyerId: respons.buyer_id }));
        setLoder(false)
      })
      .catch((error) => {
        console.log(error.message);

      });

  }

  const verificationPaymart = () => {
    numberOpen()
  }

  const openPaymartModal = () => {
    numberClose()
    open()
  }
  return (
    <Main>
      <ToastContainer position="top-right" newestOnTop />
      <Dialog open={numberisOpen} onClose={numberClose}>
        <IconButton onClick={numberClose} sx={{ position: "absolute", top: '10px', right: '10px' }}>
          <Close />
        </IconButton>
        <Stack width={{ sm: '400px', xs: '300px' }} sx={{ bgcolor: '#fff', p: '30px' }}>
          <Typography mb='20px' textAlign='center' textTransform='uppercase' variant='subtitle1'>Добро пожаловать</Typography>
          <Typography mb='20px'>
            Чтобы продолжить оформление рассрочки "Giper-Mart" пожалуеста введите номер телефона с которого регестрировались в сиситеме Paymart. Если вы не регистрировалиь то пожалуеста введите номер телефона к которой привязана ваша банковская карта.
          </Typography>
          <Button onClick={openPaymartModal} variant='contained'>Далее</Button>
        </Stack>
      </Dialog>
      <Container sx={{ height: '100%' }} maxWidth="xl">
        <Typography mt={2} variant="h2">{t('cart')}</Typography>

        <Grid container >
          <Grid paddingRight="1rem" xs={12} sm={12} md={8} item lg={9}>
            {cartProducts.map((products) => (
              <CartItem key={products.id}
                category={products.category}
                count={products.count}
                image={products.image}
                instalmentsPrice={products.instalmentsPrice}
                is_saved={products.is_saved}
                name={products.name}
                variant={products.variant}
                id={products.id}
                price={products.price}
                slug={products.slug}
                inDiscount={products.inDiscount}
              />
            ))}
          </Grid>
          {!productsCount ? ""
            :
            <Grid xs={12} sm={12} md={4} item lg={3}>
              <CartSummary />
              <Stack>
                <Stack bgcolor='#f7f7f7' p='1.5rem'>
                  <Typography mb='5px' variant="h2">
                    {limit} месяц
                  </Typography>
                  <Typography mb='16px' variant="subtitle2">
                    Товаров: {productCount}
                  </Typography>
                  <Typography mb='5px' fontWeight={600} variant='h2'>{formatter(totalPrice)} {currency}</Typography>
                  <Typography variant="subtitle2">
                    Рассрочку можно офромить только до 15 000 000 сум
                  </Typography>
                </Stack>
                {isAuthenticated ?

                  <Button disabled={totalPrice >= 15000000 || productCount === 0} fullWidth variant='contained' onClick={verificationPaymart}>Оформить рассрочку</Button>
                  :
                  <>
                    <Typography>Для оформления Рассрочки вам необходимио зарегистрироваться!</Typography>
                    <Button disabled fullWidth variant='contained' onClick={verificationPaymart}>Оформить рассрочку</Button>
                  </>

                }
              </Stack>

            </Grid>
          }

        </Grid>
        {!productsCount ?
          <Stack spacing={2} justifyContent="center" alignItems="center" height="50vh">
            <Typography variant="h2">Вы не добавили товаров в корзину</Typography>
            <Link href={Paths.HOME}>
              <LinkButton>Добавить товары</LinkButton>
            </Link>
          </Stack>
          :
          ""
        }

      </Container>

      <Dialog sx={{ '.eVgAvr': { maxHeight: 'calc(100% - 30px)' } }} open={isOpen} onClose={close}>
        <IconButton onClick={closeModalOption} sx={{ position: "absolute", top: '10px', right: '10px' }}>
          <Close />
        </IconButton>
        {step !== 8 ? 
        <Stack width={{ lg: '459px', md: '400px', sm: '380px' }} sx={{ bgcolor: "#fff", p: '0 40px 40px' }}>
          {userIdefy ? <>
            <Typography p='20px 0 12px' mb='12px' borderBottom='1px solid #e5e5e5' variant='h2'>Регистрация</Typography>
            <SwitchInstalments close={close} setUserIdefy={setUserIdefy} setStepActive={setStepActive} stepActive={stepActive} />
            <Stack>
              <Stepper
                activeStep={stepActive}
                sx={{ marginTop: '30px' }}
                alternativeLabel
              >
                {stepLable.map((i) => (
                  <Step key={i}>
                    <StepLabel></StepLabel>
                  </Step>
                ))}

              </Stepper>
            </Stack>
          </>
            :
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography mt='27px' mb='12px' variant='h2'>Купить в рассрочку</Typography>
              <Typography mb='12px'>Мобилный номер</Typography>
              <Stack >
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
                <Button onClick={() => setLoder(true)} sx={{ marginTop: '20px' }} loading={loder} fullWidth variant='contained'>Далее</Button>
              </Stack>
            </form>
          }
        </Stack>
        :
        <Stack width={{ lg: '459px', md: '400px', sm: '380px' }} sx={{ bgcolor: "#fff", p: '80px 20px' }}>
            <Typography  textAlign='center'  variant='subtitle1'>пользователь заблокирован</Typography>
        </Stack>
        }
      </Dialog>


    </Main>
  );
};

export default Cart;
