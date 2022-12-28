import React from 'react';
import styled from 'styled-components';
import { Stack, Typography } from '@mui/material';
import { LazyImage } from 'components/image';
import colors from 'config/theme';
import { imageOptimizer } from 'next/dist/server/image-optimizer';

const CardBlock = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e5e5e5;
  margin-bottom: 30px;
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &:hover{
    color: ${colors.primary.hover};
    box-shadow: 0px -3px 8px rgba(0, 0, 0, 0.18);
    .instalment{
      color: ${colors.black};
    }
  }
`
interface Props {
  des: string;
  img?: string;
  title: string;
  url: string;
}


export const UsaCard: React.FC<Props> = (props) => {
  return (
    <CardBlock>
      <Stack height='200px' p='20px'>
        <LazyImage src={props.img ? props.img : ''} />
      </Stack>
      <Typography mb='20px' textTransform='capitalize' variant='h5'>{props.title}</Typography>
      <Typography boxSizing='border-box' p="0 20px" width='100%'>{props.des.length > 70 ? props.des.slice(0, 70) + '...' : props.des}</Typography>
    </CardBlock>
  )
}
