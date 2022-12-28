import { Stack } from '@mui/material';
import Minus from 'components/icons/minus';
import Plus from 'components/icons/plus';
import colors from 'config/theme';
import {
  addInstalments,
  removeInstalments,
} from 'redux-state/features/paymart-cart';
import React from 'react';
import { removeItem, toggleAmout } from 'redux-state/features/cart-slice';
import { useAppDispatch } from 'redux-state/hook';
import { ControllerButton, ControllerWrapper } from './cart-item.styles';

const CartController: React.FC<{
  count: number;
  id: string;
  name: string;
  price: number;
  category: string;
  priceInstalment: number;
  inDiscount?: boolean | null;
}> = ({ count, name, price, id, category, priceInstalment, inDiscount }) => {
  const dispatch = useAppDispatch();

  const handleDecrement = () => {
    if (count > 1) return dispatch(toggleAmout({ id, type: 'decrement' }));
    dispatch(removeItem(id));
  };
  const addPaymartCard = () => {
    dispatch(toggleAmout({ id, type: 'increment' }));
    if (inDiscount === true) {
      dispatch(
        addInstalments({
          amount: 1,
          id,
          category,
          name,
          price,
          priceInstalment,
        })
      );
    }
  };
  return (
    <ControllerWrapper>
      <ControllerButton
        onClick={() => {
          handleDecrement();
          dispatch(
            removeInstalments({
              amount: 1,
              id,
              name,
              price,
              category,
              priceInstalment,
            })
          );
        }}
      >
        <Minus />
      </ControllerButton>
      <Stack
        sx={{
          backgroundColor: colors.grey.controller,
          height: '100%',
          maxWidth: '8rem',
          minWidth: '3rem',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}
      >
        {count}
      </Stack>
      <ControllerButton onClick={addPaymartCard}>
        <Plus />
      </ControllerButton>
    </ControllerWrapper>
  );
};

export default CartController;
