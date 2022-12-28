import React from 'react';
import { Airplane } from 'components/icons/airplane';
import { Button, Stack, Typography } from '@mui/material';

interface CardProp {
  orderUrl: string;
  status: string;
  userName: string;
}

export const SpecialOrderCard: React.FC<CardProp> = ({ orderUrl, status, userName }) => {

  const [statuss, setStatus] = React.useState('');
  React.useEffect(() => {
    if (status?.toLowerCase() === 'pendding') {
      setStatus('В Ожидании')
    }
    if (status?.toLowerCase() === 'unfulfilled') {
      setStatus('Не Выполнен')
    }
    if (status?.toLowerCase() === 'fulfilled') {
      setStatus('Выполнен')
    }
    if (status?.toLowerCase() === 'canceled') {
      setStatus('Откланен')
    }
    if (status?.toLowerCase() === 'unconfirmed') {
      setStatus('не подтвержденный')
    }
  }, [])
  return (
    <Stack mb='20px' direction='row' alignItems='center' gap='50px' sx={{ border: '3px solid #e5e5e5', p: '20px' }}>
      <Stack>
        <Airplane wi />
        <Typography>{userName}</Typography>
      </Stack>
      <Stack overflow='hidden'>
        <Typography maxWidth='500px' mb="20px"><a target='_blank' href={orderUrl}>{orderUrl}</a></Typography>
        <Button sx={{
          width: '200px',
          ':hover': {
            backgroundColor: '#8E8E8E',
          },
          color: '#000',
          backgroundColor: '#8E8E8E',
        }}>{statuss}</Button>
      </Stack>
    </Stack>
  )
}
