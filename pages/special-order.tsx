import React from 'react';
import { WithAuth } from 'components/private-route';
import { Button, Container, Stack, Typography, useMediaQuery, Dialog, MenuItem } from '@mui/material';
import Image from 'next/image';
import * as Yup from 'yup';
import { useModal } from 'hooks/use-modal';
import { useForm } from "react-hook-form";
import Input from 'components/input/input';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useAppDispatch } from 'redux-state/hook';
import Select from 'components/select/select';
import { countrySource } from 'utils/Country-data';
import UsaBanners from 'components/carousel/usa-carusel/usa-carusel';
import styled from 'styled-components';
import { Breadcrumb } from 'components/breadcrumbs';
import { useSpecialOrderMutation } from 'graphql/generated.graphql';
import { specialOrdering } from 'redux-state/features/paymart-slice';
import { Main } from 'layouts/main';
import { NextPage } from 'next';
import colors from 'config/theme';
import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/ReactToastify.min.css";


interface InputItems {
  address: string;
  city: string;
  country: string;
  url: string;
}


const specialrder: NextPage = () => {
  const md = useMediaQuery('(max-width:899px)');
  const validationSchema = Yup.object().shape({
    address: Yup.string().required('Укажите адрес !'),
    city: Yup.string().required('Укажите Регион/область !'),
    country: Yup.string().required('Укажите страну !'),
    url: Yup.string().url()
      .required('Укажите ссылку !'),


  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { close, isOpen, open } = useModal()
  const { register, handleSubmit, formState } = useForm<InputItems>(formOptions);
  const { errors } = formState;
  const [orderCreate] = useSpecialOrderMutation();
  const { phone: userPhone } = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch()

  const [region, setRegion] = React.useState<number>(0)

  const onSubmit = (item: InputItems) => {

    const currentAddress = item.address + '/' + item.country + '/' + item.city;
    orderCreate(
      {
        variables: {
          url: item.url,
          address: currentAddress,
          phone: userPhone ? userPhone : '',
        },
        refetchQueries: ['getSpecialOrder'],
      })
      open()
  }
  const links = [
    {
      name: 'Товар из Америки',
    },

  ]
  const router = useRouter()
  const changePath = () => {
    close()
    router.push('/');
    dispatch(specialOrdering({order:true}));
  }
  return (
    <Main>
      <ToastContainer position="top-right" newestOnTop />
      <Dialog open={isOpen} onClose={changePath}>
        <Stack sx={{ bgcolor: '#fff', p: '30px' }}>
          <Typography mb='20px' variant='h4'>Ваш заказ принят</Typography>
          <Button onClick={changePath} variant='contained'>Продолжаем</Button>
        </Stack>
      </Dialog>
      <Container maxWidth='xl'>
        {!md && <Breadcrumb data={links} />}
        <Typography mt='8px' mb='23px' variant='h2'>Популярные бренды</Typography>

        <UsaBanners />
        <FormBlock>
          <Stack>
            <form onSubmit={handleSubmit(onSubmit)}>

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
              <Typography mt='32px'>Ссылка на Товар <span style={{ color: '#33333366' }}>(на бренд, увиденную на других сайтах)</span></Typography>
              <Input
                fullWidth
                type='text'
                {...register('url')}
                error={!!errors.url?.type}
                helperText={errors.url?.message}
              />
              <Stack justifyContent='end' mb='60px' mt='28px' direction='row'>
                <Button type='submit' variant='contained'>Заказaть</Button>
              </Stack>
            </form>
          </Stack>
          <Stack>

          </Stack>
        </FormBlock>
      </Container>
    </Main>
  )
}

export default WithAuth(specialrder);


const BrandBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 10px;
  margin-bottom: 20px;
  @media(max-width:691px){
    grid-template-columns: repeat(3,1fr);
  }
  @media(max-width:691px){
    grid-template-columns: repeat(2,1fr);
  }
  .imgBlosk-special{
    height: 160px;
    padding: 5px;
    border: 3px solid #e5e5e5;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .4s ease;
    &:hover{
      border: 3px solid ${colors.primary.default};
    }
    img{
      width: 100%;
      height: 123px !important;
      object-fit: contain;
    }
  }
`
const FormBlock = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr;
  @media(max-width: 899px){
    grid-template-columns: 1fr;
  }
`