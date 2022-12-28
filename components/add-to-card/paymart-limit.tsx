import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import { useAppDispatch, useAppSelector } from 'redux-state/hook';
import { checkStatus } from 'redux-state/features/paymart-cart';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const PaymartLimit: React.FC = () => {
  const { limit } = useAppSelector((state) => state.paymartCart);
  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      dispatch(checkStatus({ status: newAlignment }));
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={limit}
      fullWidth
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="6">6 месяц</ToggleButton>
      <ToggleButton value="9">9 месяц</ToggleButton>
      <ToggleButton value="12">12 месяц</ToggleButton>
    </ToggleButtonGroup>
  );
};
