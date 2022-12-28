import React from 'react';
import { NextPage } from 'next';
import { Main } from 'layouts/main';
import { Container, Typography } from '@mui/material';
import Link from 'next/link';

const payment: NextPage = () => {
  return (
    <Main>
      <Container maxWidth='xl'>
        <Typography mb='10px' variant='h2'>СПОСОБЫ ОПЛАТЫ</Typography>
        <Typography mb='10px' variant='body1'>10.1. Произвести оплату Покупатель может следующими способами:
          - оплата наличными средствами;
          - оплата банковской пластиковой картой</Typography>
      </Container>
    </Main>
  )
}

export default payment