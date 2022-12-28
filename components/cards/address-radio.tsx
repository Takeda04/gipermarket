import { Stack, Typography } from '@mui/material';
import React from 'react';

interface PropCard {
  address?: string
}

export const AddressRadio: React.FC<PropCard> = ({ children, address }) => {
  return (
    <Stack mb='12px' p='12px' direction='row' sx={{border:'1px solid #808080'}}>
      <Stack>{children}</Stack>
      <Stack>
        <Typography>23</Typography>
        <Typography>Андижанская область, Андижан город, Islomobod 29</Typography>
      </Stack>
    </Stack>
  )
}
