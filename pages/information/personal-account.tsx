import React from 'react';
import { NextPage } from 'next';
import { Main } from 'layouts/main';
import { Container, Typography } from '@mui/material';
import Link from 'next/link';


const personalAccount: NextPage = () => {
  return (
    <Main>
      <Container maxWidth='xl'>
        <Typography mb='10px' textTransform='uppercase' variant='h2'>Личный кабинет</Typography>
        <Typography mb='10px' variant='body1'>7.2. При регистрации на сайте Интернет-магазина Покупатель обязуется предоставить следующую регистрационную информацию: </Typography>
        <Typography mb='10px' variant='body1'>7.2.1. Фамилия, имя, отчество, возраст Покупателя или указанного им лица (получателя); </Typography>
        <Typography mb='10px' variant='body1'>7.2.2. Адрес, по которому следует доставить Товар (если доставка до адреса Покупателя); </Typography>
        <Typography mb='10px' variant='body1'>7.2.3. Адрес электронной почты; </Typography>
        <Typography mb='10px' variant='body1'>7.2.4. Контактные телефоны. </Typography>
        <Typography mb='10px' variant='body1'>7.3. Наименование, количество, ассортимент, артикул, цена выбранного Покупателем Товара указываются в корзине Покупателя на сайте Интернет-магазина.</Typography> 
      </Container>
    </Main>
  )
}

export default personalAccount