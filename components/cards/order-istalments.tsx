import React from 'react';
import { Button } from 'components/button';
import PaymartIng from 'assets/paymart-logo.png';
import Image from 'next/image';
import colors from 'config/theme';
import { useAppSelector } from 'redux-state/hook';
import styled from 'styled-components';
import formatter from 'utils/currencyFormatter';
import { Typography } from '@mui/material';
import {
  OrderImg,
  OrderBlock,
  OrderImgBlock,
  OrderImgTexts,
} from 'components/orders';
interface Props {
  createdAt: string;
  limit: number;
  status: string;
  totalCount: number;
  totalPrice: number;
}

const OredButtonBlock = styled.div`
  @media (max-width:900px){
    position: relative;
  }

`
const OrderCardStyle = styled.div`
  padding: 32px 64px 20px 31px;
  border: 1px solid ${colors.grey.darc};
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  @media (max-width:900px){
    flex-direction: column;
    gap: 20px;
  }
  @media (max-width:539px){
    padding: 20px

  }

`


export const OrderIstalments: React.FC<Props> = ({ createdAt, limit, status, totalCount, totalPrice }) => {
  const { currency } = useAppSelector((state) => state.cart);

  const [statuss, setStatus] = React.useState('');
  React.useEffect(() => {
    if (status?.toLowerCase() === 'pending') {
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
  console.log(status);


  return (
    <OrderCardStyle>
      <OrderBlock>
        <OrderImgBlock>
          <Image layout="responsive" src={PaymartIng} />
          <OrderImgTexts>
            <Typography variant="body1"></Typography>
            <Typography variant="body2">{createdAt.slice(0, 10)}</Typography>
          </OrderImgTexts>
        </OrderImgBlock>
        <div>
          <Typography mb={1.5} variant="h2" sx={{ fontSize: '16px' }}>
            Limit  {limit} месяц
          </Typography>
          <Typography variant="h3" sx={{ maxWidth: '315px' }}>
            товар x {totalCount} | {formatter(totalPrice)} {currency} месяц
          </Typography>
        </div>
      </OrderBlock>
      <OredButtonBlock>
        <Button
          type="button"
          sx={{
            ':hover': {
              backgroundColor: '#8E8E8E',
            },
            padding: '33px',
            color: '#000',
            backgroundColor: '#8E8E8E',
          }}
        >
          {statuss}
        </Button>
      </OredButtonBlock>
    </OrderCardStyle>
  )
}
