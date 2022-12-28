import colors from 'config/theme';
import styled from 'styled-components';

export const CartItemWrapper = styled.div`
  border-bottom: 1px solid ${colors.grey.controller};
  padding: 20px 0;
  display: flex;
`;

export const CartItemImage = styled.div`
    width: 12.5rem;
    padding: 1rem;
    img {
      width: 100%;
      object-fit: contain;
    }
`;

export const ControllerWrapper = styled.div`
  border: 2px solid ${colors.grey.controller};
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 2.25rem;
`;

export const ControllerButton = styled.button`
    border: none;
    outline: none;
    height: 2.25rem;
    cursor: pointer;
    min-width: 3rem;
    width: 100%;
    background-color: ${colors.white};
    display: grid;
    place-items: center;
`;

export const SummaryWrapper = styled.div`
    background-color: #f7f7f7;
    padding-top: 1.5rem;
    width: 100%
`