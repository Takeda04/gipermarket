
import { Stack } from '@mui/material';
import colors from 'config/theme';
import styled from 'styled-components';

export const CheckoutMethods = styled.div`
  background-color: ${colors.grey.light};
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  @media (max-width: 433px){
    gap: 8px;
    width: 171px;
    h3{
      font-size: 13px;
    }
    p{
      font-size: 11px;
    }
  }
  @media (max-width: 387px){
    width: 143px;
  }
  
`;

