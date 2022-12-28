import {
  Checkbox,
  Container,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Modal,
  Paper,
  RadioGroup,
  Stack,
  Typography,
  Accordion,
  AccordionDetails,
  MenuItem,
  AccordionSummary,
} from '@mui/material';
import Select from 'components/select/select';
import { countrySource } from 'utils/Country-data';
import { Button } from 'components/button';
import { CheckoutMethods } from 'components/checkout';
import Input from 'components/input';
import Radio from 'components/radio';
import { Main } from 'layouts/main';
import Image from 'next/image';
import * as yup from 'yup';
import React, { useState } from 'react';
import Payme from 'assets/png/payme.png';
import Click from 'assets/png/click.png';
import { CheckoutInfo } from 'layouts/checkout';
import { clearPaymartCart } from 'redux-state/features/paymart-cart';
import Link from 'next/link';
import { LinkButton } from 'components/common/link';
import { Paths } from 'config/site-paths';
import { useAppSelector, useAppDispatch } from 'redux-state/hook';
import { toggle } from 'redux-state/features/sidebar';
import {
  CountryCode,
  useAddressListQuery,
  useCheckoutCompleteMutation,
  useCheckoutCreateMutation,
  usePaymeTransactionMutation,
} from 'graphql/generated.graphql';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckoutCreateInput } from 'types/checkout.types';
import _ from 'lodash';
// @ts-expect-error
import InputMask from "react-input-mask";
import { AddresCard } from 'components/cards';
import { useModal } from 'hooks/use-modal';
import { Address } from 'components/cards/address-card';
import colors from 'config/theme';
import { clearCart } from 'redux-state/features/cart-slice';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useMediaQuery } from '@mui/material';
import ArrowDow from 'components/icons/arrow-down';
import { PaymeIcon } from 'components/icons/payme-icon';
import formatter from 'utils/currencyFormatter';

const checkoutCreateSchema = yup.object({
  name: yup.string().required('Name is required'),
  phone: yup
  .string()
  .min(15)
  .required('Phone number required.'),
  streetAddress2: yup.string(),
  address: yup.string().required('Укажите адрес !'),
  city: yup.string().required('Укажите город !'),
  country: yup.string().required('Укажите страну !'),
});

const Checkout: NextPage = () => {
  const { productsCount, cartProducts, totalPrice } = useAppSelector(
    (state) => state.cart
  );
  const [paymentGateway, setPaymentGateway] = useState('1');
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const [selectedAddres, setSelectedAddress] = useState('');
  const [checkoutCreate, { data: checkoutCreateData, loading }] =
    useCheckoutCreateMutation();
  const [
    checkoutComplete,
    { data: checkoutCompleteData, loading: checkoutCompleteLoading },
  ] = useCheckoutCompleteMutation();
  const [paymeTransaction, { data: paymeData, loading: paymeLoading }] =
    usePaymeTransactionMutation();
  const router = useRouter();
  const completeModal = useModal();
  const { data: addresses } = useAddressListQuery({ skip: !isAuthenticated });

  const { control, handleSubmit, setValue, formState, register } = useForm<CheckoutCreateInput>({
    resolver: yupResolver(checkoutCreateSchema), defaultValues: { phone: '+998' } 
  });
  const dispatch = useAppDispatch();
  const modalControl = useModal();

  const handleAddressSelect = (address: Address | null) => {
    if (!address) return;
    setSelectedAddress((oldValue) =>
      oldValue === address.id ? '' : address.id
    );
    if (selectedAddres !== address.id) {
      setValue('name', `${address.firstName} ${address.lastName}`);
      setValue('phone', address.phone || '');
      // setValue('streetAddress1', address.streetAddress1);
    }
  };
  const { errors } = formState;
  const [region, setRegion] = React.useState<number>(0)



  const handleCheckout = (data: CheckoutCreateInput) => {
    const [firstName, lastName] = data.name.split(' ');
    const { address, streetAddress2, city, country } = data;
    const currentAddress = data.address + '/' + data.country + '/' + data.city;
    const phone = data.phone.replace(/\s/g, '');
    
    checkoutCreate({
      variables: {
        input: {
          shippingAddress: {
            firstName,
            lastName,
            phone,
            streetAddress1:currentAddress,
            streetAddress2,
            country: CountryCode.Uz,
            city: currentAddress,
          },
          billingAddress: {
            firstName,
            lastName,
            phone,
            streetAddress1:currentAddress,
            streetAddress2,
            country: CountryCode.Uz,
            city:currentAddress,
          },
          phone,
          lines: cartProducts.map((product) => ({
            variantId: product.id || '',
            quantity: product.count,
          })),
          channel: 'default-channel',
        },
      },
      onCompleted: (data) => {
        if (data.checkoutCreate?.errors.length === 0) {
          checkoutComplete({
            variables: {
              checkoutId: data.checkoutCreate.checkout?.id,
              paymentGateway:
                paymentGateway === '2' ? 'mirumee.payments.payme' : undefined,
            },

            onCompleted: (data) => {
              if (data.checkoutComplete?.errors.length === 0) {
                dispatch(clearCart());
                dispatch(clearPaymartCart());
                completeModal.open();
              }
            },
          });
        }
      },
    });
  };

  const handlePayment = () => {
    if (!checkoutCompleteData?.checkoutComplete?.payment) return;
    paymeTransaction({
      variables: {
        input: {
          paymentId: checkoutCompleteData?.checkoutComplete?.payment.id,
          returnUrl: router.basePath,
        },
      },
      onCompleted: (res) => {
        if (
          res.paymeTransactionCreate?.errors.length === 0 &&
          res.paymeTransactionCreate.url
        ) {
          window.open(res.paymeTransactionCreate?.url);
        }
      },
    });
  };
  const [envButton, setEnvButton] = React.useState(false);
  const changeButton = (e: any) => {
    setEnvButton(e.target.checked);
  };
  const mediaquery = useMediaQuery('(max-width:899px)');


  return (
    <Main pb={0}>
      <Container maxWidth="xl">
        <Dialog open={completeModal.isOpen}>
          <Paper sx={{ borderRadius: 0, padding: '40px' }}>
            <Stack sx={{ gap: '1rem' }}>
              <Typography variant="h2">
                Заказ №:{' '}
                <Typography component="span" variant="h2" fontWeight={300}>
                  {checkoutCompleteData?.checkoutComplete?.order?.number}
                </Typography>{' '}
                оформлен
              </Typography>
              <Typography variant="subtitle2">
                Отслеживать статус заказа можно в личном кабинете
              </Typography>
              <Stack justifyContent="space-between" direction="row">
                {paymentGateway !== '1' && (
                  <Button
                    loading={paymeLoading}
                    onClick={handlePayment}
                    variant="contained"
                  >
                    ОПЛАТИТЬ
                  </Button>
                )}
                <Button
                  onClick={() => router.push(Paths.HOME)}
                  variant="text"
                  sx={{ color: colors.black }}
                >
                  ПРОДОЛЖИТЬ ПОКУПКИ
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Dialog>
        {productsCount < 1 && productsCount ? (
          <Stack
            mt={2}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            height="50vh"
          >
            <Typography variant="h2">Your cart is empty</Typography>
            <Link href={Paths.HOME}>
              <LinkButton>Fill it</LinkButton>
            </Link>
          </Stack>
        ) : (
          <Stack direction={{ md: 'row', xs: 'column' }}>
            <Stack paddingRight={{ md: '16px' }} width={{ md: '50%' }}>
              <Typography margin="1.5rem 0" fontWeight={600} variant="h1">
                Оформление заказа
              </Typography>
              {mediaquery && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowDow />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      pr="20px"
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Typography variant="h6">Ваш заказ</Typography>
                      <Typography variant="h2">
                        {formatter(totalPrice)} Сум{' '}
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <CheckoutInfo />
                  </AccordionDetails>
                </Accordion>
              )}
              <form onSubmit={handleSubmit(handleCheckout)}>
                <Stack spacing={2} margin="1rem 0">
                  {!isAuthenticated && (
                    <Button
                      sx={{ maxWidth: 'max-content' }}
                      color="secondary"
                      size="small"
                      type="button"
                      onClick={() => dispatch(toggle(true))}
                    >
                      Уже покупали у нас?
                    </Button>
                  )}

                  {addresses?.me?.addresses?.map((address) => (
                    <AddresCard
                      onClick={() => handleAddressSelect(address)}
                      isActive={selectedAddres === address?.id}
                      isCheckoutPage
                      data={address}
                      backdrop={modalControl}
                    />
                  ))}

                  <Typography variant="h2" fontSize={27}>
                    Контактные данные
                  </Typography>
                  <Typography>Контактное лицо (ФИО)</Typography>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field, formState: { errors } }) => (
                      <Input
                        error={!!errors.name?.type}
                        helperText={errors.name?.message}
                        {...field}
                      />
                    )}
                  />
                  <Typography>Контактный телефон</Typography>

                  {/* <Controller
                    control={control}
                    name="phone"
                    render={({ field, formState: { errors } }) => (
                      <Input
                        error={!!errors.phone?.type}
                        helperText={errors.phone?.message}
                        {...field}
                      />
                    )}
                  /> */}


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

                  <Typography variant="h2" fontSize={27}>
                    Доставка
                  </Typography>
                  <Typography>Адрес</Typography>
                  {/* //////////////////////////////////// */}

                  {/* <Controller
                    control={control}
                    name="streetAddress1"
                    render={({ field, formState: { errors } }) => (
                      <Input
                        multiline
                        error={!!errors.streetAddress1?.type}
                        helperText={errors.streetAddress1?.message}
                        {...field}
                      />
                    )}
                  /> */}
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
                    <Typography mt='12px'>Адрес*</Typography>
                    <Input
                      type='text'
                      {...register('address')}
                      fullWidth
                      error={!!errors.address?.type}
                      helperText={errors.address?.message}
                    />
                  </Stack>

                  {/* ////////////////////////////////////// */}
                  <Typography>Комментарии к заказу</Typography>
                  <Controller
                    control={control}
                    name="streetAddress2"
                    render={({ field, formState: { errors } }) => (
                      <Input
                        multiline
                        error={!!errors.streetAddress2?.type}
                        helperText={errors.streetAddress2?.message}
                        {...field}
                      />
                    )}
                  />
                  <FormControl>
                    <RadioGroup
                      onChange={(_, value) => setPaymentGateway(value)}
                      defaultValue="1"
                    >
                      <Stack direction="row" gap="1rem">
                        <CheckoutMethods>
                          <FormControlLabel
                            label={
                              <Stack padding="1rem 1.5rem">
                                <Stack>
                                  <Typography variant="h3" fontSize="1.25rem">
                                    Наличными курьеру
                                  </Typography>
                                  <Typography variant="body2">
                                    Наличными курьеру
                                  </Typography>
                                </Stack>
                              </Stack>
                            }
                            value="1"
                            control={<Radio sx={{ marginLeft: '1rem' }} />}
                          />
                        </CheckoutMethods>
                        <CheckoutMethods>
                          <FormControlLabel
                            label={
                              <Stack padding="1rem 1.5rem">
                                <PaymeIcon />
                              </Stack>
                            }
                            value="2"
                            control={<Radio sx={{ marginLeft: '1rem' }} />}
                          />
                        </CheckoutMethods>
                      </Stack>
                      <FormControlLabel
                        sx={{ mt: '10px' }}
                        control={<Checkbox onChange={changeButton} />}
                        label="Подтвердить"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    disabled={!envButton}
                    loading={loading || checkoutCompleteLoading}
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Подтвердить заказ
                  </Button>
                </Stack>
              </form>
            </Stack>
            {!mediaquery && (
              <Stack
                borderLeft={{ md: '1px solid #808080' }}
                paddingLeft={{ md: '16px' }}
                width={{ md: '50%' }}
              >
                <CheckoutInfo />
              </Stack>
            )}
          </Stack>
        )}
      </Container>
    </Main>
  );
};

export default Checkout;
